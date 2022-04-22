import SERVER_URL from '../constants/server';

export const FETCH_CONFIG_JSON = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

export const getLatestGameInfo = async () => {
    let url = SERVER_URL + '/api/curryv2/current/match/get';
    console.log('url:', url);

    const data = await fetch(url, FETCH_CONFIG_JSON);
    const result = await data.json();
    console.log('result:', result);
    return result;
};

export const getAvailableBasketballs = async (gameID: string) => {
    let url = SERVER_URL + '/api/curryv2/free/basketball/get/' + gameID;
    console.log('url:', url);

    const data = await fetch(url, FETCH_CONFIG_JSON);
    const result = await data.json();
    console.log('result:', result);
    return result;
};

export const reserveBasketball = (_id: string, gameId: number, wallet: string) =>
    new Promise((resolve: (value: boolean) => void, reject: (value: boolean) => void) => {
        let reqUrl = SERVER_URL + '/api/curryv2/free/basketball/get';
        const reqBody = {
            _id: _id,
            gameId: gameId,
            wallet: wallet,
        };
        fetch(reqUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch((error) => {
                reject(false);
            });
    });
