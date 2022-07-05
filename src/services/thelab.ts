import axios from 'axios';

export const getBasketballHeadzInfo = async (data: any) => {
    let uri = data['uri'];
    const response: any = await axios({
        method: 'GET',
        url: uri,
    });

    return {
        tokenId: data.tokenId,
        title: response.data.name,
        count: parseInt(data.quantity),
        image: response.data.image,
    };
};

export const getBasketballInfo = async (data: any[]) => {
    let obj = data.find((item) => item['platform'] === 'Basketball');
    if (obj === undefined || obj === null) return { count: 0, image: '' };

    let count = parseInt(obj['quantity']);
    let uri = obj['uri'];
    if (!uri) return { count: count, image: '' };

    const response: any = await axios({
        method: 'GET',
        url: uri,
    });
    let imageUri = response.status === 200 ? response.data.image : '';
    return { count: count, image: imageUri };
};

export const getSerumTokenCount = (data: any[], tokenId: string) => {
    let obj = data.find((item) => item['platform'] === 'Serum' && item['tokenId'] === tokenId);
    return obj === undefined || obj === null ? 0 : parseInt(obj['quantity']);
};

export const getGCFTokenCount = (data: any[], tokenId?: string) => {
    let obj = data.find((item) => item['platform'] === 'Drop1Nft' && item['tokenId'] === tokenId);
    return obj === undefined || obj === null ? 0 : parseInt(obj['quantity']);
};

export const getEcosystemTokenCount = (data: any[], platform: string) => {
    let obj = data.find((item) => item['platform'] === platform);
    return obj === undefined || obj === null ? 0 : parseInt(obj['quantity']);
};

export const getEcosystemTokenURI = (data: any[], platform: string) => {
    let obj = data.find((item) => item['platform'] === platform);
    if (obj === undefined || obj === null) return '';
    else return obj['uri'] !== null ? obj['uri'] : '';
};
