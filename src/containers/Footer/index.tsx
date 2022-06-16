import React from 'react';
import { Stack, Box, Typography, IconButton } from '@mui/material';
import Container from '../Container';
import Image from 'next/image';
import InstagramIcon from '../../assets/instagram.svg';
import OpenseaIcon from '../../assets/opensea.svg';
import DiscordIcon from '../../assets/discord.svg';
import TwitterIcon from '../../assets/twitter.svg';
import LunaLogoImg from '../../assets/luna-logo.svg';
import Link from 'next/link';

type ComponentProps = {};

const externalLinksList = [
    { title: 'Curry Brand', url: 'https://www.underarmour.com/en-us/t/currybrand/' },
    { title: 'Under Armour', url: 'https://about.underarmour.com/about' },
    { title: 'Terms & Conditions', url: '/legal/terms-and-conditions' },
    { title: 'Privacy Policy', url: 'https://account.underarmour.com/en-us/privacy' },
];

const socialLinksList = [
    { title: 'Discord', url: 'https://discord.gg/currybrand', icon: <DiscordIcon /> },
    { title: 'Twitter', url: 'https://twitter.com/bball_headz', icon: <TwitterIcon /> },
    { title: 'Instagram', url: 'https://www.instagram.com/currybrand/', icon: <InstagramIcon /> },
    { title: 'Opensea', url: 'https://opensea.io/collection/nf3-basketball', icon: <OpenseaIcon /> },
];

const Footer: React.FC<ComponentProps> = ({}) => {
    return (
        <>
            <Box sx={{ background: '#1B1C22' }}>
                <Container>
                    <Stack
                        height={72}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={4}
                        sx={{ overflowY: 'hidden', overflowX: 'auto' }}
                    >
                        <Stack direction="row" flexShrink={0} alignItems="center" spacing={5}>
                            <Link href="/" passHref>
                                <Image
                                    src="/assets/curry-logo.png"
                                    width={40}
                                    height={40}
                                    alt="Logo"
                                    style={{ cursor: 'pointer' }}
                                />
                            </Link>
                            <Stack direction="row" spacing={2}>
                                {externalLinksList.map((item, index) => (
                                    <Link href={item.url} passHref>
                                        <a target="_blank" rel="noopener noreferrer">
                                            <Typography
                                                fontSize={14}
                                                fontWeight={600}
                                                color="#969AA1"
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                {item.title}
                                            </Typography>
                                        </a>
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
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Box sx={{ background: 'black' }}>
                <Container>
                    <Stack height={78} direction="row" alignItems="center" justifyContent="center" spacing={1}>
                        <Typography fontSize={16} fontWeight={400} color="#FFFEFF" sx={{ padding: '0 0 6px' }}>
                            Powered by
                        </Typography>
                        <Link href="https://lunamarket.io/" passHref>
                            <a target="_blank" rel="noopener noreferrer">
                                <LunaLogoImg />
                            </a>
                        </Link>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default Footer;
