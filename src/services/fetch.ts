import axios from 'axios';
import SERVER_URL from '../constants/server';

export const FETCH_CONFIG_JSON = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

export const getLatestGameInfo = async () => {
    let reqUrl = `${SERVER_URL}/api/curryv2/current/match/get`;
    // console.log('reqUrl:', reqUrl);

    const data = await fetch(reqUrl, FETCH_CONFIG_JSON);
    const result = await data.json();
    // console.log('result:', result);
    return result;
};

export const getFreeReserveBasketballs = async (gameID: string, walletAddr: string) => {
    let reqUrl = `${SERVER_URL}/api/curryv2/free/basketball/get/${gameID}/${walletAddr}`;
    // console.log('reqUrl:', reqUrl);

    const data = await fetch(reqUrl, FETCH_CONFIG_JSON);
    const result = await data.json();
    // console.log('result:', reqUrl, result);
    return result;
};

export const reserveFreeBasketball = (_id: string, gameId: number, walletAddr: string) =>
    new Promise((resolve: (value: string) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/free/basketball/reserve`;
        // console.log('reqUrl:', reqUrl);

        const body = { _id: _id, gameId: gameId, wallet: walletAddr };

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios
            .post(reqUrl, body /*, config*/)
            .then((response) => {
                // console.log('result:', response);
                if (response.data.code === 200) resolve(response.data);
                else resolve('');
            })
            .catch((error) => {
                // console.log('error data:', error.response.data);
                // console.log('error status:', error.response.status);
                // console.log('error headers:', error.response.headers);
                reject(error.response.data);
            });
    });

export const getUnclaimedBasketballs = async (walletAddr: string) => {
    let reqUrl = `${SERVER_URL}/api/curryv2/free/basketball/get_unclaimed/${walletAddr}`;
    // console.log('reqUrl:', reqUrl);

    const data = await fetch(reqUrl, FETCH_CONFIG_JSON);
    const result = await data.json();
    // console.log('result:', result);
    return result;
};

export const getHexProofForClaim = async (gameID: string, walletAddr: string) => {
    let reqUrl = `${SERVER_URL}/api/curryv2/merkle/hex_proof/${gameID}/${walletAddr}`;
    // console.log('reqUrl:', reqUrl);

    const data = await fetch(reqUrl, FETCH_CONFIG_JSON);
    const result = await data.json();
    // console.log('result:', result);
    return result;
};

export const claimBasketball = (_id: string) =>
    new Promise((resolve: (value: string) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/free/basketball/claim`;
        // console.log('reqUrl:', reqUrl);

        const body = { _id: _id };

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios
            .post(reqUrl, body)
            .then((response) => {
                // console.log('result:', response);
                if (response.data.code === 200) resolve(response.data);
                else resolve('');
            })
            .catch((error) => {
                // console.log('error data:', error.response.data);
                reject(error.response.data);
            });
    });

export const getWinners = (gameID: string) =>
    new Promise((resolve: (value: any[]) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/free/basketball/get_winner/${gameID}`;
        // console.log('reqUrl:', reqUrl);

        axios
            .get(reqUrl)
            .then((response) => {
                // console.log('getWinners result:', response);
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });

export const getCountValues = (gameID: string) =>
    new Promise((resolve: (value: any[]) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/free/basketball/get_count/${gameID}`;
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

export const claimGCF = (wallet: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/merkle/gcf/hex_proof/${wallet}`;
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
