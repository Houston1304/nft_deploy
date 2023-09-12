type ItemNft = {
    content: string,
    ch_content: string,
    type: string,
}

export const ITEMS_URL: ItemNft[] = [
];

for(let i = 0; i<13; i++){
    ITEMS_URL.push({
        content:'https://www.anncom.ru/dialer/nft/nft_item.json',
        ch_content: 'https://www.anncom.ru/dialer/nft/nft_iHOLD/nft_item_open_vip.json',
        type: 'vip',
    })
}

for(let i = 0; i<5; i++){
    ITEMS_URL.push({
        content:'https://www.anncom.ru/dialer/nft/nft_item.json',
        ch_content: 'https://www.anncom.ru/dialer/nft/nft_iHOLD/nft_item_open_shirt.json',
        type: 'shirt',
    })
}


for(let i = 0; i<2; i++){
    ITEMS_URL.push({
        content:'https://www.anncom.ru/dialer/nft/nft_item.json',
        ch_content: 'https://www.anncom.ru/dialer/nft/nft_iHOLD/nft_item_open_cap.json',
        type: 'cap',
    })
}


for(let i = 0; i<2; i++){
    ITEMS_URL.push({
        content:'https://www.anncom.ru/dialer/nft/nft_item.json',
        ch_content: 'https://www.anncom.ru/dialer/nft/nft_iHOLD/nft_item_open_dinner.json',
        type: 'dinner',
    })
}

for(let i = 0; i<2; i++){
    ITEMS_URL.push({
        content:'https://www.anncom.ru/dialer/nft/nft_item.json',
        ch_content: 'https://www.anncom.ru/dialer/nft/nft_iHOLD/nft_item_open_film_set.json',
        type: 'film',
    })
}

for(let i = 0; i<2; i++){
    ITEMS_URL.push({
        content:'https://www.anncom.ru/dialer/nft/nft_item.json',
        ch_content: 'https://www.anncom.ru/dialer/nft/nft_iHOLD/nft_item_open_integration.json',
        type: 'integration',
    })
}

for(let i = 0; i<2; i++){
    ITEMS_URL.push({
        content:'https://www.anncom.ru/dialer/nft/nft_item.json',
        ch_content: 'https://www.anncom.ru/dialer/nft/nft_iHOLD/nft_item_open_theater.json',
        type: 'theater',
    })
}