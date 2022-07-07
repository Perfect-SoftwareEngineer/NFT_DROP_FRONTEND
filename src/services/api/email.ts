import axios from 'axios';
import SERVER_URL from '../../constants/server';

export const registerEmail = (address: string, email: string, token: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: any) => void) => {
        let reqUrl = `${SERVER_URL}/api/user/register_email`;
        // console.log('reqUrl:', reqUrl);

        const body = { wallet: address, email: email };

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
