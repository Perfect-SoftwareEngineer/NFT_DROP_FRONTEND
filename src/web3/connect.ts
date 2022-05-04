import { injected } from './Connector';

export async function connect(activate: any) {
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

        await w.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: process.env.NEXT_PUBLIC_ENV == 'production' ? '0x1' : '0x4' }],
        });

        await activate(injected);
    } catch (ex: Error | any) {
        throw new Error(ex.message);
    }
}
