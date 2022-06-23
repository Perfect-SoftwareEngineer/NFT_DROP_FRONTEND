import axios from 'axios';

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
