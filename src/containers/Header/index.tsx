import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Container from '../Container';
import Image from 'next/image';
import LogoImg from '../../assets/curry-logo.png';
import { HeaderMenuBtn } from './styles';
import Link from 'next/link';
import { useRouter } from 'next/router';

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

    return (
        <Box sx={{ background: '#1B1C22' }}>
            <Container>
                <Stack height={72} direction="row" alignItems="center">
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
                </Stack>
            </Container>
        </Box>
    );
};

export default Header;
