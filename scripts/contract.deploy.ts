import * as fs from 'fs';
import * as path from 'path';
import { Address, contractAddress } from 'ton';
import { NftCollection } from '../wrappers/NftCollection';
import { prepareTactDeployment } from '@tact-lang/deployer';
import { createOffchainContent } from '../helpers';

import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    (async () => {
        // Parameters
        let testnet = true;
        let packageName = 'nft_NftCollection.pkg';
        let owner = Address.parse('EQCeq9GI6bAMqNczehhBDlvNIA0RKalGoRCYzv-IXA0fwxpC');
        let content = createOffchainContent('https://www.anncom.ru/dialer/nft/nft_collection.json');
        let init = await NftCollection.init(owner, content, owner, 100n, 1000n);

        // Load required data
        let address = contractAddress(0, init);
        let data = init.data.toBoc();
        let pkg = fs.readFileSync(path.resolve(__dirname, 'output', packageName));

        // Prepareing
        console.log('Uploading package...');
        let prepare = await prepareTactDeployment({ pkg, data, testnet });

        // Deploying
        console.log('============================================================================================');
        console.log('Contract Address');
        console.log('============================================================================================');
        console.log();
        console.log(address.toString({ testOnly: testnet }));
        console.log();
        console.log('============================================================================================');
        console.log('Please, follow deployment link');
        console.log('============================================================================================');
        console.log();
        console.log(prepare);
        console.log();
        console.log('============================================================================================');
    })();
}
