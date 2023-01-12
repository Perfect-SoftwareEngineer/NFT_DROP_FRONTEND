import axios from 'axios';
import SERVER_URL from '../../constants/server';

export const getLocker = async (wallet: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/locker/get/${wallet}`;
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

export const changeBBHName = (name: string, address: string, bbhId: string, token: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: any) => void) => {
        let reqUrl = `${SERVER_URL}/api/metadata/basketballhead/change_name`;
        // console.log('reqUrl:', reqUrl);

        const body = { name: name, tokenId: bbhId, wallet: address };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
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
