import axios from 'axios';
import SERVER_URL from '../../constants/server';

export const getUserInfo = (wallet: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/user/get/${wallet}`;
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

export const createUser = (wallet: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/user/create`;
        // console.log('reqUrl:', reqUrl);

        const body = { wallet: wallet };

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios
            .post(reqUrl, body)
            .then((response) => {
                // console.log('result:', response);
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data);
            });
    });

export const userSignIn = (wallet: string, signature: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/auth/signin`;
        // console.log('reqUrl:', reqUrl);

        const body = { wallet: wallet, signature: signature };

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios
            .post(reqUrl, body)
            .then((response) => {
                // console.log('result:', response);
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data);
            });
    });
