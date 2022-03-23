import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { ConnectMetamaskBtn } from './styles';
import Image from 'next/image';
import { SxProps } from '@mui/system';
import MetamaskImg from '../../../assets/metamask.png';

export interface ComponentProps {
    sx?: SxProps;
}

const NotWalletConnect: React.FC<ComponentProps> = ({ sx }): JSX.Element => {
    return (
        <Stack alignItems="center" sx={{ ...sx }}>
            <Typography fontSize={48} fontWeight={700} lineHeight={1.1} textAlign="center">
                You need a MetaMask wallet to use the{' '}
                <Typography fontSize={48} fontWeight={700} lineHeight={1.1} color="#FFCA21">
                    Mixology Room
                </Typography>
            </Typography>
            <Box>
                <Typography fontSize={16} fontWeight={400} width={432} textAlign="center" marginTop={3}>
                    Make sure to download Metamask. Once you create or connect your MetaMask account, connect your
                    wallet.
                </Typography>
            </Box>
            <ConnectMetamaskBtn sx={{ marginTop: 5 }}>
                <Image src={MetamaskImg} width={56} height={56} />
                <Typography fontSize={32} fontWeight={600} marginLeft={4} sx={{ padding: '0 0 8px' }}>
                    Connect Metamask
                </Typography>
            </ConnectMetamaskBtn>
        </Stack>
    );
};

export default NotWalletConnect;
