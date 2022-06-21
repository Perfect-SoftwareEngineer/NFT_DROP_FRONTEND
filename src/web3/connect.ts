import { injected, CoinbaseWallet } from './Connector';

export function activateInjectedProvider(providerName: 'MetaMask' | 'CoinBase') {
    const { ethereum } = window;

    if (!ethereum?.providers) {
        return undefined;
    }

    let provider;
    switch (providerName) {
        case 'CoinBase':
            provider = ethereum.providers.find((obj: any) => obj.isCoinbaseWallet);
            break;
        case 'MetaMask':
            provider = ethereum.providers.find((obj: any) => obj.isMetaMask);
            break;
    }
    console.log('provider:', provider);
    if (provider) {
        ethereum.setSelectedProvider(provider);
    }
}

export async function connect(activate: any, type: 'metamask' | 'coinbase' = 'metamask') {
    try {
        const w: any = window;
        // await w.ethereum.request({
        //     method: 'wallet_addEthereumChain',
        //     params: [
        //         {
        //             chainId: process.env.NEXT_PUBLIC_ENV == 'production' ? '0x1' : '0x4',
        //             chainName: process.env.NEXT_PUBLIC_ENV == 'production' ? 'Ethereum Mainnet' : 'Ethereum Rinkeby',
        //             nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
        //             rpcUrls:
        //                 process.env.NEXT_PUBLIC_ENV == 'production'
        //                     ? ['https://mainnet.infura.io/v3/']
        //                     : ['https://rinkeby.infura.io/v3/'],
        //         },
        //     ],
        // });

        if (type === 'metamask') {
            activateInjectedProvider('MetaMask');

            await w.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: process.env.NEXT_PUBLIC_ENV == 'production' ? '0x1' : '0x4' }],
            });

            await activate(injected);
        } else if (type === 'coinbase') {
            activateInjectedProvider('CoinBase');

            await w.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: process.env.NEXT_PUBLIC_ENV == 'production' ? '0x1' : '0x4' }],
            });

            await activate(CoinbaseWallet);
        }
    } catch (ex: Error | any) {
        throw new Error(ex.message);
    }
}
