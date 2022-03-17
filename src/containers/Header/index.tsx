import React from 'react';
import { Stack, Box } from '@mui/material';
import Container from '../Container';
import Image from 'next/image';
import LogoImg from '../../assets/curry-logo.png';
import { HeaderMenuBtn } from './styles';

type ComponentProps = {};

const Header: React.FC<ComponentProps> = ({}) => {
    return (
        <Box sx={{ background: '#1B1C22' }}>
            <Container>
                <Stack height={72} direction="row" alignItems="center">
                    <Image src={LogoImg} width={40} height={40} alt="Logo" />
                    <Stack>
                        {/* <HeaderMenuBtn>Mixology Room</HeaderMenuBtn> */}
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Header;
