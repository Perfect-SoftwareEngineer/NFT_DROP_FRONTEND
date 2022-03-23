import React from 'react';
import { Stack, Box, Typography, IconButton } from '@mui/material';
import Container from '../Container';
import Image from 'next/image';
import LogoImg from '../../assets/curry-logo.png';
import OpenseaIcon from '../../assets/opensea.svg';
import DiscordIcon from '../../assets/discord.svg';
import TwitterIcon from '../../assets/twitter.svg';
import LunaLogoImg from '../../assets/luna-logo.svg';
import Link from 'next/link';

type ComponentProps = {};

const menuList = [
    { title: 'Under Armour', url: '#' },
    { title: 'Curry Brand', url: '#' },
    { title: 'Terms', url: '#' },
    { title: 'Privacy', url: '#' },
];

const Footer: React.FC<ComponentProps> = ({}) => {
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
                                        <Typography
                                            fontSize={14}
                                            fontWeight={600}
                                            color="#969AA1"
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            {item.title}
                                        </Typography>
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
                        <LunaLogoImg />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default Footer;
