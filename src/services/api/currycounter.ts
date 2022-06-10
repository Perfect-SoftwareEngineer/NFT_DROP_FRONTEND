import axios from 'axios';
import SERVER_URL from '../../constants/server';

export const FETCH_CONFIG_JSON = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

export const getLatestGameInfo = async () =>
    new Promise((resolve: (value: any[]) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/current/match/get`;
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

export const getFreeReserveBasketballs = async (gameID: string, walletAddr: string) =>
    new Promise((resolve: (value: any[]) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/basketball/free/get/${gameID}/${walletAddr}`;
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

export const reserveFreeBasketball = (_id: string, gameId: number, walletAddr: string) =>
    new Promise((resolve: (value: string) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/basketball/free/reserve`;
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

export const getUnclaimedBasketballs = async (walletAddr: string) =>
    new Promise((resolve: (value: any[]) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/basketball/free/get_unclaimed/${walletAddr}`;
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

export const getHexProofForClaim = async (gameID: string, walletAddr: string) =>
    new Promise((resolve: (value: any[]) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/basketball/merkle/hex_proof/${gameID}/${walletAddr}`;
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

export const startClaim = (gameId: number, walletAddr: string) =>
    new Promise((resolve: (value: string) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/basketball/free/claim_started`;
        // console.log('reqUrl:', reqUrl);

        const body = { gameId: gameId, wallet: walletAddr };

        axios
            .post(reqUrl, body)
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

export const claimBasketball = (_id: string) =>
    new Promise((resolve: (value: string) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/basketball/free/claim`;
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
        let reqUrl = `${SERVER_URL}/api/curryv2/basketball/free/get_winner/${gameID}`;
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

export const getCountValues = (gameID: string) =>
    new Promise((resolve: (value: any[]) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/basketball/free/get_count/${gameID}`;
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
