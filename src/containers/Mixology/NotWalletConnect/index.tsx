import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { ConnectMetamaskBtn } from './styles';
import Image from 'next/image';
import { SxProps } from '@mui/system';
import MetamaskImg from '../../../assets/metamask.png';
import { useWeb3React } from '@web3-react/core';
import { connect } from '../../../web3/connect';

export interface ComponentProps {
    sx?: SxProps;
}

const NotWalletConnect: React.FC<ComponentProps> = ({ sx }): JSX.Element => {
    const { active, account, library, connector, activate, deactivate } = useWeb3React();

    const onConnect = () => {
        connect(activate);
    };

    return (
        <Stack alignItems="center" sx={{ ...sx }}>
            <Typography fontSize={{ xs: 32, md: 48 }} fontWeight={700} lineHeight={1.1} paddingX={2} textAlign="center">
                You need a MetaMask wallet to use the
                <br />
                <span style={{ color: '#FFCA21' }}>Mixology Room</span>
            </Typography>
            <Box width={{ xs: '80%', sm: '60%', md: '30%' }}>
                <Typography fontSize={16} fontWeight={400} textAlign="center" marginTop={3}>
                    Make sure to download Metamask. Once you create or connect your MetaMask account, connect your
                    wallet.
                </Typography>
            </Box>
            <ConnectMetamaskBtn sx={{ marginTop: 5 }} onClick={onConnect}>
                <Image src={MetamaskImg} width={56} height={56} />
                <Typography
                    fontSize={{ xs: 22, sm: 26, md: 32 }}
                    fontWeight={600}
                    lineHeight={1.1}
                    marginLeft={{ xs: 1, sm: 2, md: 4 }}
                    sx={{ padding: '0 0 8px' }}
                >
                    Connect Metamask
                </Typography>
            </ConnectMetamaskBtn>
        </Stack>
    );
};

export default NotWalletConnect;
