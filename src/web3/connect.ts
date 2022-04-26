import { injected } from './Connector';

export async function connect(activate: any) {
    try {
        const w: any = window;
        await w.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: process.env.NEXT_PUBLIC_ENV == 'production' ? '0x89' : '0x4',
                    chainName: process.env.NEXT_PUBLIC_ENV == 'production' ? 'Polygon' : 'Mumbai Testnet',
                    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
                    rpcUrls:
                        process.env.NEXT_PUBLIC_ENV == 'production'
                            ? ['https://rpc-mainnet.matic.network']
                            : ['https://rpc-mumbai.maticvigil.com/'],
                },
            ],
        });

        await w.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: process.env.NEXT_PUBLIC_ENV == 'production' ? '0x89' : '0x4' }],
        });

        await w.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: process.env.NEXT_PUBLIC_ENV == 'production' ? '0x89' : '0x4' }],
        });

        await activate(injected);
    } catch (ex: Error | any) {
        throw new Error(ex.message);
    }
}
