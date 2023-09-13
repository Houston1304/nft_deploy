import { Blockchain, SandboxContract, TreasuryContract } from '@ton-community/sandbox';
import { beginCell, toNano } from 'ton-core';
import { NftCollection } from '../wrappers/NftCollection';
import '@ton-community/test-utils';
import { NftItem } from '../wrappers/NftItem';
import { createOffchainContent } from '../helpers';

describe('NftCollection', () => {
    let blockchain: Blockchain;
    let nftCollection: SandboxContract<NftCollection>;
    let deployer: SandboxContract<TreasuryContract>;
    let content = createOffchainContent("https://raw.githubusercontent.com/Bquaith/ton_token/main/collection_3.json")
    beforeEach(async () => {
        blockchain = await Blockchain.create();

        deployer = await blockchain.treasury('deployer');

        nftCollection = blockchain.openContract(await NftCollection.fromInit(deployer.address, content, deployer.address, 21n, 1000n));

        const deployResult = await nftCollection.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: nftCollection.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and nftCollection are ready to use
    });

    it("should mint nft", async()=>{

        let content_nft = createOffchainContent("https://raw.githubusercontent.com/Bquaith/ton_token/main/item.json")
        let ch_content_nft = createOffchainContent("https://www.anncom.ru/dialer/nft/nft_iHOLD/nft_item_open_vip.json")
        
        const res = await nftCollection.send(deployer.getSender(), {
            value: toNano("0.3")
        },
        {
            $$type: 'RequestNftDeploy',
            content: content_nft,
            ch_content: ch_content_nft,
            amount: toNano("0.1"),
            owner: deployer.address
        }
    );

        console.log(res)

        console.log("deployer - ", deployer.getSender().address)
        console.log("nftCollection - ", nftCollection.address)
        const nftItemAddress = await nftCollection.getGetNftAddressByIndex(0n);
        console.log("nftItemAddress - ", nftItemAddress)
        
        const nftItem: SandboxContract<NftItem> = blockchain.openContract(NftItem.fromAddress(nftItemAddress!))
        
        let nftItemData = await nftItem.getGetNftData();

        console.log("old owner - ", nftItemData.owner)

        const nftCollectionData = await nftCollection.getGetCollectionData()

        console.log(nftCollectionData)

        const user = await blockchain.treasury("user");

        await nftItem.send(deployer.getSender(), {
            value: toNano("0.6")
        }, {
            $$type: 'NftTransfer',
            new_owner: user.address,
            query_id: 0n,
            response_destination: deployer.address,
            forward_amount: toNano("0.5"),
            custom_payload: beginCell().storeUint(0,32).storeStringTail("Hello to Nothing").endCell(),
            forward_payload: beginCell().storeUint(0,32).storeStringTail("Hello to New Owner").endCell()
        })

        nftItemData = await nftItem.getGetNftData();

        console.log("new owner - ", nftItemData.owner)
    })
});