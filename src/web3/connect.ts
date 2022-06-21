import { injected, CoinbaseWallet } from './Connector';

export async function connect(activate: any, type: number = 0) {
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

        // await w.ethereum.request({
        //     method: 'wallet_switchEthereumChain',
        //     params: [{ chainId: process.env.NEXT_PUBLIC_ENV == 'production' ? '0x1' : '0x4' }],
        // });

        // if (typeof window.ethereum !== 'undefined') {
        //     let provider = window.ethereum;
        //     // edge case if MM and CBW are both installed
        //     if (window.ethereum.providers?.length) {
        //         window.ethereum.providers.forEach(async (p: any) => {
        //             if (p.isMetaMask) provider = p;
        //         });
        //     }
        //     await provider.request({
        //         method: 'eth_requestAccounts',
        //         params: [],
        //     });
        // }

        if (type === 0) {
            await activate(injected);
        } else if (type === 1) {
            await activate(CoinbaseWallet);
        }
    } catch (ex: Error | any) {
        throw new Error(ex.message);
    }
}
