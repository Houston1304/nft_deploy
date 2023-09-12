import { Address, Builder, Cell, Dictionary, Slice, beginCell, fromNano, toNano } from 'ton-core';
import { NftCollection, storeRequestNftDeploy } from '../wrappers/NftCollection';
import { createOffchainContent } from '../helpers';
import { readFileSync } from 'fs';
import { mnemonicToWalletKey } from 'ton-crypto';
import { TonClient4, WalletContractV3R2, WalletContractV4 } from 'ton';
import { ITEMS_URL } from './item_list';

const fs = require('fs');
const delay = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
    for (let i = 0; i < ITEMS_URL.length; i++) {
        try {
            // createNftDeployLink(Address.parse("EQCWywmUzk71ivxC6YrzzWBW0iwUox9hEw_ZXS5JWqWCRwTf"), Address.parse('EQDCWAnbip-FJlr71gJKgAVTznR-J_iDW-djThXp43q5qdXw'), toNano("0.06"), "https://raw.githubusercontent.com/nonam3e/tact-lessons/main/lesson6/nft_data.json", 0n);
            let mnemonics = readFileSync('./secret.txt').toString().split(',');
            let pair = await mnemonicToWalletKey(mnemonics);
            let client4 = new TonClient4({ endpoint: 'https://sandbox-v4.tonhubapi.com' });
            let content_nft = createOffchainContent(String(ITEMS_URL[i].content));
            let ch_content_nft = createOffchainContent(String(ITEMS_URL[i].ch_content));
            let wallet = client4.open(WalletContractV4.create({ workchain: 0, publicKey: pair.publicKey }));
            let collection = client4.open(
                NftCollection.fromAddress(Address.parse('EQCXCitSajErl0_I2Q8uqz6y_JiQ5nfEaaX1qj7FQr41dKJ-'))
            );

            const walletContract = client4.open(wallet);
            const seqno = await walletContract.getSeqno();
            console.log('seqno:', seqno);

            await collection.send(
                wallet.sender(pair.secretKey),
                { value: toNano('0.08') },
                {
                    $$type: 'RequestNftDeploy',
                    amount: toNano('0.03'),
                    content: content_nft,
                    ch_content: ch_content_nft,
                    owner: wallet.address,
                }
            );
            let currentNftAddress = await collection.getGetNftAddressByIndex(BigInt(i));

            console.log(currentNftAddress);

            let currentSeqno = seqno;
            while (currentSeqno == seqno) {
                console.log('waiting for transaction number ' + i + ' to confirm...');
                await delay(1500);
                currentSeqno = await walletContract.getSeqno();
            }

            console.log('transaction confirmed!');

            let rawdata = fs.readFileSync('./send_list.json');

            let parseddata = JSON.parse(rawdata);

            parseddata.push({
                index: i,
                type: ITEMS_URL[i].type,
                address: currentNftAddress.toString(),
            });

            let data = JSON.stringify(parseddata);

            fs.writeFileSync('./send_list.json', data);

            await delay(20000);
        } catch (error: any) {
            console.log('error on step ' + i + ' ' + error.message);

            let rawdata = fs.readFileSync('./error.json');

            let parseddata = JSON.parse(rawdata);

            parseddata.push({
                index: i,
                type: ITEMS_URL[i].type,
                trouble: error.message,
            });

            let data = JSON.stringify(parseddata);

            fs.writeFileSync('./error.json', data);
        }
    }
})();

export function createNftDeployLink(
    collection: Address,
    owner: Address,
    amount: bigint,
    content: string,
    ch_content: string
) {
    let message = createNftDeployMessage(owner, content, ch_content);
    let link = `ton://transfer/${collection.toString()}?amount=${amount}&bin=${message.toBoc().toString('base64url')}`;
    console.log(link);
}

export function createNftDeployMessage(
    owner: Address,
    content: string,
    ch_content: string,
    amount: bigint = toNano('0.03')
) {
    return beginCell()
        .store(
            storeRequestNftDeploy({
                $$type: 'RequestNftDeploy',
                amount,
                content: createOffchainContent(content),
                ch_content: createOffchainContent(ch_content),
                owner,
            })
        )
        .endCell();
}
