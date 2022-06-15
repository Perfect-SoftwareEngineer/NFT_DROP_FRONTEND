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
