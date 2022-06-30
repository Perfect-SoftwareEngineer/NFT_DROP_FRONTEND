import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { GradientBox, ConnectWalletBtn } from './styles';
import Image from 'next/image';
import { SxProps } from '@mui/system';
import { useWeb3React } from '@web3-react/core';
import { connect } from '../../../web3/connect';
import Container from '../../Container';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import HowItWorks from './HowItWorks';

export interface ComponentProps {
    sx?: SxProps;
}

const NotWalletConnect: React.FC<ComponentProps> = ({ sx }): JSX.Element => {
    const { active, account, library, connector, activate, deactivate } = useWeb3React();

    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Stack position="relative">
                {matchDownMd && (
                    <video autoPlay muted loop style={{ width: '100%' }}>
                        <source src={'/assets/mixology/background-mobile.mp4'} type="video/mp4" />
                    </video>
                )}
                {!matchDownMd && (
                    <video autoPlay muted loop style={{ width: '100%' }}>
                        <source src={'/assets/mixology/background.mp4'} type="video/mp4" />
                    </video>
                )}
                <GradientBox />
                <Container sx={{ position: 'absolute', inset: 0 }}>
                    <Stack width="100%" height="100%" justifyContent="center">
                        <Typography
                            fontSize={{ xs: 32, md: 48 }}
                            fontWeight={700}
                            lineHeight={1}
                            color="#FFCA21"
                            marginTop={{ xs: 0, md: -10 }}
                            className="neueplak_condensed"
                        >
                            WELCOME TO THE...
                        </Typography>
                        <Typography
                            fontSize={{ xs: 72, md: 128 }}
                            fontWeight={800}
                            lineHeight={1}
                            sx={{ textDecoration: 'underline', textDecorationThickness: 'from-font' }}
                            className="neueplak_condensed"
                        >
                            MIXOLOGY ROOM
                        </Typography>
                        <Typography
                            width={{ xs: '100%', md: 700 }}
                            fontSize={{ xs: 16, md: 20 }}
                            fontWeight={600}
                            lineHeight={1.2}
                            marginTop={{ xs: 4, md: 6 }}
                        >
                            Mix your NF3 Basketball and up to three community partner Serums together in our high-tech
                            lab and prepare to unlock your unique, generative Basketball Headz avatar.
                        </Typography>
                        <ConnectWalletBtn sx={{ marginTop: 6 }} onClick={() => connect(activate)}>
                            <Image src="/assets/wallet/metamask.png" width={56} height={56} />
                            <Typography
                                fontSize={{ xs: 22, sm: 26, md: 32 }}
                                fontWeight={600}
                                lineHeight={1.1}
                                marginLeft={{ xs: 1, sm: 2, md: 4 }}
                                sx={{ padding: '0 0 8px' }}
                            >
                                Connect MetaMask
                            </Typography>
                        </ConnectWalletBtn>
                        <ConnectWalletBtn sx={{ marginTop: 3 }} onClick={() => connect(activate, 'coinbase')}>
                            <Image src="/assets/wallet/coinbase.png" width={56} height={56} />
                            <Typography
                                fontSize={{ xs: 22, sm: 26, md: 32 }}
                                fontWeight={600}
                                lineHeight={1.1}
                                marginLeft={{ xs: 1, sm: 2, md: 4 }}
                                sx={{ padding: '0 0 8px' }}
                            >
                                Connect Coinbase
                            </Typography>
                        </ConnectWalletBtn>
                    </Stack>
                </Container>
            </Stack>
            <HowItWorks />
        </>
    );
};

export default NotWalletConnect;
