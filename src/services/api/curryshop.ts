import axios from 'axios';
import SERVER_URL from '../../constants/server';

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

// export const confirmClaimSerumGCF = (wallet: string, token: string) =>
//     new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
//         let reqUrl = `${SERVER_URL}/api/curryv2/serum/merkle/gcf/claim`;
//         // console.log('reqUrl:', reqUrl);

//         const body = { wallet: wallet };

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: token,
//             },
//         };

//         axios
//             .post(reqUrl, body, config)
//             .then((response) => {
//                 resolve(response.data);
//             })
//             .catch((error) => {
//                 reject(error.response.data);
//             });
//     });

export const claimNF3MintlistNFT = (wallet: string) =>
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

export const confirmClaimNF3Mintlist = (wallet: string, token: string) =>
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

export const claimSerumMintlistNFT = (wallet: string) =>
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

// export const confirmClaimSerumCommunity = (wallet: string, token: string) =>
//     new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
//         let reqUrl = `${SERVER_URL}/api/curryv2/serum/merkle/community/claim`;
//         // console.log('reqUrl:', reqUrl);

//         const body = { wallet: wallet };

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: token,
//             },
//         };

//         axios
//             .post(reqUrl, body, config)
//             .then((response) => {
//                 resolve(response.data);
//             })
//             .catch((error) => {
//                 reject(error.response.data);
//             });
//     });
