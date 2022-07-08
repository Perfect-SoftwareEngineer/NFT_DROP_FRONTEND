import React, { useState } from 'react';
import { Stack, Box, Typography, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import Container from '../Container';
import Image from 'next/image';
import { HeaderMenuBtn, ComingSoonTypo, ConnectWalletBtn, StyledBurger, BurgerMenuBox } from './styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import InstagramIcon from '../../assets/instagram.svg';
import OpenseaIcon from '../../assets/opensea.svg';
import DiscordIcon from '../../assets/discord.svg';
import TwitterIcon from '../../assets/twitter.svg';
import { useWeb3React } from '@web3-react/core';
import WalletConnectDlg from '../../components/WalletConnectDlg';
import { connect } from '../../web3/connect';
import LockIcon from '@mui/icons-material/LockOutlined';
import { getUserInfo, createUser, userSignIn } from '../../services/api/auth';
import { useAppContext } from '../../context/AppContext';
import { injected, CoinbaseWallet } from '../../web3/Connector';

type ComponentProps = {};

const appMenuList: { title: string; url: string; comingSoon?: any }[] = [
    // { title: 'Home', url: '/' },

    // { title: 'Curry Shop', url: '', comingSoon: { rightPos: -10 } },
    { title: 'Curry Shop', url: '/curryshop' },

    // { title: 'The Lab', url: '', comingSoon: { rightPos: -10 } },
    { title: 'The Lab', url: '/lab' },

    // { title: 'Mixology Room', url: '', comingSoon: { rightPos: -10 } },
    { title: 'Mixology Room', url: '/mixology' },

    { title: 'NF3 Counter', url: '/currycounter' },

    // { title: 'Roadmap', url: '', comingSoon: { rightPos: -10 } },
    { title: 'Roadmap', url: '/roadmap' },

    { title: 'FAQ', url: '/faq' }

    // { title: 'FTX Holders', url: '/ftxholders' },
    // { title: 'FTX Holders', url: '', comingSoon: { rightPos: -10 } },
];

const socialLinksList = [
    { title: 'Discord', url: 'https://discord.gg/currybrand', icon: <DiscordIcon /> },
    { title: 'Twitter', url: 'https://twitter.com/bball_headz', icon: <TwitterIcon /> },
    { title: 'Instagram', url: 'https://www.instagram.com/currybrand/', icon: <InstagramIcon /> }
    // { title: 'Opensea', url: 'https://opensea.io/collection/nf3-basketball', icon: <OpenseaIcon /> },
];

const Header: React.FC<ComponentProps> = ({}) => {
    const router = useRouter();
    const [openConnectWalletDlg, setOpenConnectWalletDlg] = useState(false);
    const { active, account, library, connector, activate, deactivate } = useWeb3React();

    const [menuOpen, setMenuOpen] = useState(false);

    const [showOpenseaMenuBox, setShowOpenseaMenuBox] = useState(false);

    const [appState, setAppState] = useAppContext();

    React.useEffect(() => {
        const getSignature = async (nonce: number, wallet: string) => {
            const msg = `Luna Backend user one-time Nonce: ${nonce}`;

            const sig = await library.eth.personal.sign(msg, wallet);
            return sig;

            // const signature = await library.provider.request({
            //     method: 'personal_sign',
            //     params: [msg, wallet],
            // });
            // return signature;
        };

        const signIn = async (nonce: number, wallet: string) => {
            // console.log('jwtToken:', appState.jwtToken);
            if (!!appState.jwtToken) return;

            const sig = await getSignature(nonce, wallet);
            // console.log('sig:', sig);

            userSignIn(wallet, sig)
                .then((response: any) => {
                    // console.log('userSignIn resonse:', response);
                    setAppState({ ...appState, jwtToken: response });
                })
                .catch((error) => {
                    // console.log(error);
                });
        };

        if (account) {
            getUserInfo(account)
                .then(async (response: any) => {
                    // console.log('getUserInfo response:', response);

                    if (Object.keys(response).length === 0) {
                        createUser(account)
                            .then(async (response: any) => {
                                // console.log('createUser resonse:', response);
                                signIn(response.nonce, account);
                            })
                            .catch((error) => {
                                // console.log(error);
                            });
                    } else {
                        signIn(response.nonce, account);
                    }
                })
                .catch((error) => {
                    // console.log(error);
                });
        }
    }, [account]);

    const onConnect = (data: any) => {
        if (data.type === 'Metamask') {
            connect(activate)
                .then(() => {
                    setOpenConnectWalletDlg(false);
                })
                .catch((error) => {
                    // console.log(error);
                    setOpenConnectWalletDlg(false);
                });
        } else if (data.type === 'Coinbase Wallet') {
            connect(activate, 'coinbase')
                .then(() => {
                    setOpenConnectWalletDlg(false);
                })
                .catch((error) => {
                    // console.log(error);
                    setOpenConnectWalletDlg(false);
                });
        }
    };

    return (
        <>
            <Box sx={{ background: '#1B1C22' }}>
                <Container sx={{ overflow: 'visible' }}>
                    <Stack
                        height={72}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        display={{ xs: 'none', md: 'flex' }}
                    >
                        <Stack direction="row" alignItems="center" spacing={5}>
                            <Link href="/" passHref>
                                <Image
                                    src="/assets/curry-logo.png"
                                    width={40}
                                    height={40}
                                    alt="Logo"
                                    style={{ cursor: 'pointer' }}
                                />
                            </Link>
                            <Stack direction="row" spacing={4}>
                                {appMenuList.map((item, index) => (
                                    <Link href={item.url} passHref key={`app-menu-link-${index}`}>
                                        <HeaderMenuBtn
                                            direction="row"
                                            spacing={1}
                                            selected={router.pathname === item.url}
                                        >
                                            {item.comingSoon && <LockIcon sx={{ width: 16 }} />}
                                            <Typography fontSize={14} fontWeight={600}>
                                                {item.title}
                                            </Typography>
                                            {item.comingSoon && (
                                                <ComingSoonTypo
                                                    rightPos={item.comingSoon.rightPos}
                                                    className="comingsoon_mark"
                                                >
                                                    Coming soon
                                                </ComingSoonTypo>
                                            )}
                                        </HeaderMenuBtn>
                                    </Link>
                                ))}
                            </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            {socialLinksList.map((item, index) => (
                                <Link href={item.url} passHref key={`external-link-${index}`}>
                                    <a target="_blank" rel="noopener noreferrer">
                                        <IconButton>{item.icon}</IconButton>
                                    </a>
                                </Link>
                            ))}
                            <Box position="relative" onClick={() => setShowOpenseaMenuBox(!showOpenseaMenuBox)}>
                                <IconButton>
                                    <OpenseaIcon />
                                </IconButton>
                                <Stack
                                    position="absolute"
                                    left={0}
                                    top="100%"
                                    spacing={2}
                                    padding={2}
                                    borderRadius={2}
                                    visibility={showOpenseaMenuBox ? 'visible' : 'hidden'}
                                    sx={{ background: '#1B1C22' }}
                                >
                                    <Link
                                        href={
                                            process.env.NEXT_PUBLIC_ENV == 'production'
                                                ? 'https://opensea.io/collection/nf3-basketballhead-v4/activity?search[isSingleCollection]=true&search[eventTypes][0]=ASSET_TRANSFER'
                                                : 'https://testnets.opensea.io/collection/nf3-basketballhead-v4/activity?search[isSingleCollection]=true&search[eventTypes][0]=ASSET_TRANSFER'
                                        }
                                        passHref
                                    >
                                        <a target="_blank" rel="noopener noreferrer">
                                            <Typography whiteSpace="nowrap">Basketball Headz</Typography>
                                        </a>
                                    </Link>
                                    <Link href="https://opensea.io/collection/nf3-basketball" passHref>
                                        <a target="_blank" rel="noopener noreferrer">
                                            <Typography whiteSpace="nowrap">NF3 Basketball</Typography>
                                        </a>
                                    </Link>
                                    <Link href="https://opensea.io/collection/basketball-headz-serums" passHref>
                                        <a target="_blank" rel="noopener noreferrer">
                                            <Typography whiteSpace="nowrap">Serums</Typography>
                                        </a>
                                    </Link>
                                </Stack>
                            </Box>
                            <ConnectWalletBtn
                                onClick={() => {
                                    if (!active) setOpenConnectWalletDlg(true);
                                }}
                            >
                                {active ? 'CONNECTED' : 'CONNECT WALLET'}
                            </ConnectWalletBtn>
                        </Stack>
                    </Stack>
                    <Stack
                        height={72}
                        direction="row"
                        alignItems="center"
                        // justifyContent="flex-end"
                        spacing={2.5}
                        display={{ xs: 'flex', md: 'none' }}
                    >
                        <Link href="/" passHref>
                            <Image
                                src="/assets/curry-logo.png"
                                width={40}
                                height={40}
                                alt="Logo"
                                style={{ cursor: 'pointer' }}
                            />
                        </Link>
                        <ConnectWalletBtn
                            sx={{ marginLeft: 'auto !important' }}
                            onClick={() => {
                                if (!active) setOpenConnectWalletDlg(true);
                            }}
                        >
                            {active ? 'CONNECTED' : 'CONNECT WALLET'}
                        </ConnectWalletBtn>
                        <StyledBurger open={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
                            <div className="menu_line" />
                            <div className="menu_line" />
                            <div className="menu_line" />
                            <BurgerMenuBox spacing={2} open={menuOpen}>
                                {appMenuList.map((item, index) => (
                                    <Link href={item.url} passHref key={`app-menu-link-${index}`}>
                                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                                            <Typography fontSize={14} fontWeight={500}>
                                                {item.title}
                                            </Typography>
                                            {item.comingSoon && <LockIcon sx={{ width: 16, color: '#969aa1' }} />}
                                        </Stack>
                                    </Link>
                                ))}
                                {socialLinksList.map((item, index) => (
                                    <Link href={item.url} passHref key={`external-link-${index}`}>
                                        <a target="_blank" rel="noopener noreferrer">
                                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                <Typography fontSize={14} fontWeight={500}>
                                                    {item.title}
                                                </Typography>
                                                <IconButton sx={{ padding: 0 }}>{item.icon}</IconButton>
                                            </Stack>
                                        </a>
                                    </Link>
                                ))}
                                <Stack
                                    position="relative"
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowOpenseaMenuBox(!showOpenseaMenuBox);
                                    }}
                                >
                                    <Typography fontSize={14} fontWeight={500}>
                                        Opensea
                                    </Typography>
                                    <IconButton sx={{ padding: 0 }}>
                                        <OpenseaIcon />
                                    </IconButton>
                                    <Stack
                                        position="absolute"
                                        left={0}
                                        top={24}
                                        spacing={2}
                                        padding={2}
                                        borderRadius={2}
                                        visibility={showOpenseaMenuBox ? 'visible' : 'hidden'}
                                        sx={{ background: '#1B1C22' }}
                                    >
                                        <Link
                                            href={
                                                process.env.NEXT_PUBLIC_ENV == 'production'
                                                    ? 'https://opensea.io/collection/nf3-basketballhead-v4/activity?search[isSingleCollection]=true&search[eventTypes][0]=ASSET_TRANSFER'
                                                    : 'https://testnets.opensea.io/collection/nf3-basketballhead-v4/activity?search[isSingleCollection]=true&search[eventTypes][0]=ASSET_TRANSFER'
                                            }
                                            passHref
                                        >
                                            <a target="_blank" rel="noopener noreferrer">
                                                <Typography whiteSpace="nowrap">Basketball Headz</Typography>
                                            </a>
                                        </Link>
                                        <Link href="https://opensea.io/collection/nf3-basketball" passHref>
                                            <a target="_blank" rel="noopener noreferrer">
                                                <Typography whiteSpace="nowrap">NF3 Basketball</Typography>
                                            </a>
                                        </Link>
                                        <Link href="https://opensea.io/collection/basketball-headz-serums" passHref>
                                            <a target="_blank" rel="noopener noreferrer">
                                                <Typography whiteSpace="nowrap">Serums</Typography>
                                            </a>
                                        </Link>
                                    </Stack>
                                </Stack>
                            </BurgerMenuBox>
                        </StyledBurger>
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
