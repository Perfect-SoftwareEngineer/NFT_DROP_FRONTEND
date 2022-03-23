import React, { useState } from 'react';
import { Stack, Box, Typography, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import Container from '../Container';
import Image from 'next/image';
import LogoImg from '../../assets/curry-logo.png';
import { HeaderMenuBtn, ConnectWalletBtn } from './styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import OpenseaIcon from '../../assets/opensea.svg';
import DiscordIcon from '../../assets/discord.svg';
import TwitterIcon from '../../assets/twitter.svg';
import { useWeb3React } from '@web3-react/core';
import WalletConnectDlg from '../../components/WalletConnectDlg';
import { injected } from '../../web3/Connector';

type ComponentProps = {};

const menuList = [
    { title: 'Home', url: '/' },
    { title: 'Curry Shop', url: '#' },
    { title: 'Mixology Room', url: '/mixology' },
    { title: 'The Lab', url: '#' },
    { title: 'Curry Counter', url: '#' },
    { title: 'FAQ', url: '#' },
];

const Header: React.FC<ComponentProps> = ({}) => {
    const router = useRouter();
    const [openConnectWalletDlg, setOpenConnectWalletDlg] = useState(false);
    const { active, account, library, connector, activate, deactivate } = useWeb3React();

    async function connect() {
        try {
            const w: any = window;
            await w.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: process.env.NEXT_PUBLIC_ENV == 'production' ? '0x89' : '0x13881',
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
                params: [{ chainId: process.env.NEXT_PUBLIC_ENV == 'production' ? '0x89' : '0x13881' }],
            });

            await w.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: process.env.NEXT_PUBLIC_ENV == 'production' ? '0x89' : '0x13881' }],
            });

            await activate(injected);
        } catch (ex: Error | any) {
            throw new Error(ex.message);
        }
    }

    const onConnect = (data: any) => {
        if (data.type === 'Metamask') {
            connect()
                .then(() => {
                    setOpenConnectWalletDlg(false);
                })
                .catch((error) => {
                    console.log(error);
                    setOpenConnectWalletDlg(false);
                });
        }
    };

    return (
        <>
            <Box sx={{ background: '#1B1C22' }}>
                <Container>
                    <Stack height={72} direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" spacing={5}>
                            <Image src={LogoImg} width={40} height={40} alt="Logo" />
                            <Stack direction="row" spacing={2}>
                                {menuList.map((item, index) => (
                                    <Link href={item.url} passHref>
                                        <HeaderMenuBtn selected={router.pathname === item.url}>
                                            <Typography>{item.title}</Typography>
                                        </HeaderMenuBtn>
                                    </Link>
                                ))}
                            </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <IconButton>
                                <OpenseaIcon />
                            </IconButton>
                            <IconButton>
                                <DiscordIcon />
                            </IconButton>
                            <IconButton>
                                <TwitterIcon />
                            </IconButton>
                            <ConnectWalletBtn
                                onClick={() => {
                                    if (!active) setOpenConnectWalletDlg(true);
                                }}
                            >
                                {active ? 'CONNECTED' : 'CONNECT WALLET'}
                            </ConnectWalletBtn>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Dialog
                open={openConnectWalletDlg}
                maxWidth="lg"
                onClose={() => {
                    setOpenConnectWalletDlg(false);
                }}
            >
                <DialogTitle>
                    <Typography fontSize={48} fontWeight={700} color="black">
                        Connect Your Wallet
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ width: 640 }}>
                    <WalletConnectDlg onChange={onConnect} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Header;
