import axios from 'axios';
import SERVER_URL from '../../constants/server';

export const getStatus = async () =>
    new Promise((resolve: (value: boolean) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/basketball/ftx/get_status`;
        // console.log('reqUrl:', reqUrl);

        axios
            .get(reqUrl)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });

export const getFtx = async (address: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/basketball/ftx/get/${address}`;
        // console.log('reqUrl:', reqUrl);

        axios
            .get(reqUrl)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });

export const setFtx = (address: string, code: string, token: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: any) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/basketball/ftx/save`;
        // console.log('reqUrl:', reqUrl);

        const body = { wallet: address, code: code };
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
                if (response.data.code === 200) resolve(response.data);
                else resolve('');
            })
            .catch((error) => {
                reject(error.response.data);
            });
    });
