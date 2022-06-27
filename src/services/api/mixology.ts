import axios from 'axios';
import SERVER_URL from '../../constants/server';

export const gen3DCreate = (address: string, serumIds: string[], token: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: any) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/mixology/3d_generate/create`;
        // console.log('reqUrl:', reqUrl);

        const body = { wallet: address, serumIds: serumIds };
        // console.log('body:', body);
        // console.log('token:', token);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        };

        axios
            .post(reqUrl, body, config)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
