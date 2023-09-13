type ItemNft = {
    content: string;
    ch_content: string;
    type: string;
};

function shuffle(array: ItemNft[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export const ITEMS_URL: ItemNft[] = [];

for (let i = 0; i < 1700; i++) {
    ITEMS_URL.push({
        content: 'https://www.anncom.ru/dialer/nft/nft_item.json',
        ch_content: 'https://www.anncom.ru/dialer/nft/nft_iHOLD/nft_item_open_vip.json',
        type: 'vip',
    });
}

for (let i = 0; i < 150; i++) {
    ITEMS_URL.push({
        content: 'https://www.anncom.ru/dialer/nft/nft_item.json',
        ch_content: 'https://www.anncom.ru/dialer/nft/nft_iHOLD/nft_item_open_shirt.json',
        type: 'shirt',
    });
}

for (let i = 0; i < 150; i++) {
    ITEMS_URL.push({
        content: 'https://www.anncom.ru/dialer/nft/nft_item.json',
        ch_content: 'https://www.anncom.ru/dialer/nft/nft_iHOLD/nft_item_open_cap.json',
        type: 'cap',
    });
}

for (let i = 0; i < 20; i++) {
    ITEMS_URL.push({
        content: 'https://www.anncom.ru/dialer/nft/nft_item.json',
        ch_content: 'https://www.anncom.ru/dialer/nft/nft_iHOLD/nft_item_open_integration.json',
        type: 'integration',
    });
}

for (let i = 0; i < 1; i++) {
    ITEMS_URL.push({
        content: 'https://www.anncom.ru/dialer/nft/nft_item.json',
        ch_content: 'https://www.anncom.ru/dialer/nft/nft_iHOLD/nft_item_open_dinner.json',
        type: 'dinner',
    });
}

for (let i = 0; i < 1; i++) {
    ITEMS_URL.push({
        content: 'https://www.anncom.ru/dialer/nft/nft_item.json',
        ch_content: 'https://www.anncom.ru/dialer/nft/nft_iHOLD/nft_item_open_film_set.json',
        type: 'film',
    });
}

for (let i = 0; i < 1; i++) {
    ITEMS_URL.push({
        content: 'https://www.anncom.ru/dialer/nft/nft_item.json',
        ch_content: 'https://www.anncom.ru/dialer/nft/nft_iHOLD/nft_item_open_theater.json',
        type: 'theater',
    });
}

shuffle(ITEMS_URL);
