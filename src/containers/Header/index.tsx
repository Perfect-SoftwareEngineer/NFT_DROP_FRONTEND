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

type ComponentProps = {};

const appMenuList = [
    // { title: 'Home', url: '/' },
    { title: 'Curry Counter', url: '/currycounter' },
    { title: 'FAQ', url: '#' },
    { title: 'Curry Shop', url: '', comingSoon: { rightPos: -8 } },
    { title: 'Mixology Room', url: '', comingSoon: { rightPos: -8 } },
    { title: 'The Lab', url: '', comingSoon: { rightPos: -56 } },
];

const socialLinksList = [
    { title: 'Instagram', url: 'https://www.instagram.com/currybrand/', icon: <InstagramIcon /> },
    { title: 'Opensea', url: 'https://opensea.io/', icon: <OpenseaIcon /> },
    { title: 'Discord', url: 'https://discord.com/invite/M5dZ2GJSpQ', icon: <DiscordIcon /> },
    { title: 'Twitter', url: 'https://twitter.com/UnderArmour', icon: <TwitterIcon /> },
];

const Header: React.FC<ComponentProps> = ({}) => {
    const router = useRouter();
    const [openConnectWalletDlg, setOpenConnectWalletDlg] = useState(false);
    const { active, account, library, connector, activate, deactivate } = useWeb3React();

    const [menuOpen, setMenuOpen] = useState(false);

    const onConnect = (data: any) => {
        if (data.type === 'Metamask') {
            connect(activate)
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
                <Container sx={{ overflow: 'visible' }}>
                    <Stack
                        height={72}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        display={{ xs: 'none', md: 'flex' }}
                    >
                        <Stack direction="row" alignItems="center" spacing={5}>
                            <Link href="/currycounter" passHref>
                                <Image
                                    src="/assets/curry-logo.png"
                                    width={40}
                                    height={40}
                                    alt="Logo"
                                    style={{ cursor: 'pointer' }}
                                />
                            </Link>
                            <Stack direction="row" spacing={2}>
                                {appMenuList.map((item, index) => (
                                    <Link href={item.url} passHref key={`app-menu-link-${index}`}>
                                        <HeaderMenuBtn selected={router.pathname === item.url}>
                                            <Typography fontSize={14} fontWeight={600}>
                                                {item.title}
                                            </Typography>
                                            {item.comingSoon && (
                                                <ComingSoonTypo rightPos={item.comingSoon.rightPos}>
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
                        justifyContent="flex-end"
                        spacing={2.5}
                        display={{ xs: 'flex', md: 'none' }}
                    >
                        <ConnectWalletBtn
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
                                            {item.comingSoon && (
                                                <Typography
                                                    fontSize={8}
                                                    fontWeight={400}
                                                    padding="2px 4px"
                                                    borderRadius={1}
                                                    sx={{ background: 'white', color: 'black' }}
                                                >
                                                    Coming soon
                                                </Typography>
                                            )}
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
