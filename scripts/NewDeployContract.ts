import { toNano } from 'ton-core';
import { NftCollection } from '../wrappers/NftCollection';
import { NetworkProvider } from '@ton-community/blueprint';

import { Address } from "ton";
import { createOffchainContent } from '../helpers';

export async function run(provider: NetworkProvider) {
    provider
    let owner = Address.parse('EQA69eNquW-OkwmEftL59QkLAh_RJriDxn7P00AweiJ0AcyD');
    let content = createOffchainContent("https://www.anncom.ru/dialer/nft/nft_iHOLD/nft_collection.json");
    const nftCollection = provider.open(await NftCollection.fromInit(owner, content, owner, 200n, 1000n));

    await nftCollection.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(nftCollection.address);

    // run methods on `nftCollection`
}