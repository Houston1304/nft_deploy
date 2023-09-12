import "@stdlib/deploy";
import "@stdlib/ownable";
import "./item";

const min_balance_callection: Int = ton("0.05");
const gas_consumption_callection: Int = ton("0.02");

struct CollectionData {
    next_index: Int;
    content: Cell;
    owner: Address;
}

contract NftCollection with Ownable, Deployable, NftRoyalty {
    owner: Address;
    index: Int as uint256;
    content: Cell;
    royalty_destination: Address;
    numerator: Int as uint16;
    denominator: Int as uint16;

    init(owner: Address, content: Cell, royalty_destination: Address, numerator: Int, denominator: Int) {
        self.owner = owner;
        self.content = content;
        self.royalty_destination = royalty_destination;
        self.numerator = numerator;
        self.denominator = denominator;
        self.index = 0;
    }

    receive(msg: RequestNftDeploy) {
        self.requireOwner();
        //require(msg.index <= self.next_index, "Invalid Index");
        let nft_init: StateInit = initOf NftItem(myAddress(), self.index);
        let nft_address: Address = contractAddress(nft_init);

        let min: Int = min_balance_callection - min(min_balance_callection, myBalance()) + gas_consumption_callection;

        send(SendParameters{
            to: nft_address,
            value: msg.amount - min,
            mode: SendPayGasSeparately,
            bounce: false,
            data: nft_init.data,
            code: nft_init.code,
            body: NftDeploy{
                index: self.index,
                owner: msg.owner,
                content: msg.content,
                ch_content: msg.ch_content,
                royalty_destination: self.royalty_destination,
                numerator: self.numerator,
                denominator: self.denominator
            }.toCell()
        });
        self.index = self.index + 1;
    }

    get fun get_collection_data(): CollectionData {
        return CollectionData{next_index: self.index + 1, content: self.content, owner: self.owner};
    }
    get fun get_nft_address_by_index(index: Int): Address {
        return contractAddress(initOf NftItem(myAddress(), index));
    }
    get fun get_nft_content(index: Int, individual_content: Cell): Cell {
        return individual_content;
    }
}