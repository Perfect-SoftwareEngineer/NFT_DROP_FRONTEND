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

export const claimNF3GCF = (wallet: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/basketball/merkle/gcf/hex_proof/${wallet}`;
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

export const confirmClaimNF3GCF = (wallet: string, token: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/basketball/merkle/gcf/claim`;
        // console.log('reqUrl:', reqUrl);

        const body = { wallet: wallet };

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
                reject(error.response.data);
            });
    });

export const claimSerumGCF = (wallet: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/serum/merkle/gcf/hex_proof/${wallet}`;
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

export const confirmClaimSerumGCF = (wallet: string, token: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/serum/merkle/gcf/claim`;
        // console.log('reqUrl:', reqUrl);

        const body = { wallet: wallet };

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
                reject(error.response.data);
            });
    });

export const claimNF3CommunityNFT = (wallet: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/basketball/merkle/community/hex_proof/${wallet}`;
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

export const confirmClaimNF3Community = (wallet: string, token: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/basketball/merkle/community/claim`;
        // console.log('reqUrl:', reqUrl);

        const body = { wallet: wallet };

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
                reject(error.response.data);
            });
    });

export const claimSerumCommunityNFT = (wallet: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/serum/merkle/community/hex_proof/${wallet}`;
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

export const confirmClaimSerumCommunity = (wallet: string, token: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/api/curryv2/serum/merkle/community/claim`;
        // console.log('reqUrl:', reqUrl);

        const body = { wallet: wallet };

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
                reject(error.response.data);
            });
    });

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