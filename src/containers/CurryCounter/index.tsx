import React from 'react';
import { Stack, Box, Button, Typography, IconButton } from '@mui/material';
import Container from '../Container';
import Image from 'next/image';
import BackgroundImg from '../../assets/currycounter/background.png';
import { GradientBox, ConnectWalletBtn } from './styles';
import CloseIcon from '@mui/icons-material/Close';
import LearnMoreIcon from '@mui/icons-material/KeyboardArrowDown';
import SupplyBox from '../../components/CurryShop/SupplyBox';

const CurryCounterPageContainer: React.FC = (): JSX.Element => {
    return (
        <>
            <Box position="relative">
                <Image src={BackgroundImg} layout="responsive" alt="" />
                <GradientBox />
                <Box position="absolute" sx={{ inset: 0 }}>
                    <Container sx={{ height: '100%', paddingY: 5 }}>
                        <Stack height="100%" justifyContent="space-between">
                            <Stack
                                direction="row"
                                alignItems="flex-start"
                                marginLeft="auto"
                                borderRadius={2}
                                padding={3}
                                spacing={2}
                                sx={{ background: 'rgba(0, 0, 0, 0.75)' }}
                            >
                                <img src="/assets/metamask.png" width={56} height={56} alt="" />
                                <Stack spacing={1}>
                                    <Typography fontSize={14} fontWeight={500} color="white">
                                        MetaMask
                                    </Typography>
                                    <Typography width={320} fontSize={12} fontWeight={400} color="white">
                                        Make sure you download Metamask and connect your account prior to minting. You
                                        will need MetaMask compatibility to mint your Intel Cryptex.
                                    </Typography>
                                </Stack>
                                <IconButton sx={{ color: 'white' }}>
                                    <CloseIcon />
                                </IconButton>
                            </Stack>
                            <Stack marginX="auto" alignItems="center" spacing={5}>
                                <Stack direction="row" spacing={5}>
                                    <Stack spacing={3} alignItems="center">
                                        <Typography fontSize={16} fontWeight={600} color="#979797">
                                            Opponent Team
                                        </Typography>
                                        <Typography fontSize={20} fontWeight={600} color="white">
                                            Boston Celtics
                                        </Typography>
                                    </Stack>
                                    <Stack spacing={3} alignItems="center">
                                        <Typography fontSize={16} fontWeight={600} color="#979797">
                                            Cost
                                        </Typography>
                                        <Typography fontSize={20} fontWeight={600} color="white">
                                            Free
                                        </Typography>
                                    </Stack>
                                    <Stack spacing={3} alignItems="center">
                                        <Typography fontSize={16} fontWeight={600} color="#979797">
                                            3-Points Scored
                                        </Typography>
                                        <Typography fontSize={20} fontWeight={600} color="white">
                                            5 Basketballs
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <ConnectWalletBtn>Connect Wallet</ConnectWalletBtn>
                                <Stack>
                                    <Typography fontSize={14} fontWeight={600} color="#979797">
                                        LEARN MORE
                                    </Typography>
                                    <Button sx={{ '&:hover': { background: 'transparent' } }}>
                                        <LearnMoreIcon sx={{ color: '#979797' }} />
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
            </Box>
            <Box paddingY={10} sx={{ background: 'black' }}>
                <Container>
                    <Stack direction="row" justifyContent="center" spacing={14}>
                        <Stack borderRadius={4} padding={3} spacing={3} sx={{ background: '#1B1C22' }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Image src="/assets/curry-logo.png" width={40} height={40} alt="Logo" />
                                <Typography fontSize={20} fontWeight={600} color="white">
                                    Curry Brand
                                </Typography>
                            </Stack>
                            <Box width={400} height={400} position="relative">
                                <Image src="/assets/currycounter/curry-brand.png" layout="fill" />
                            </Box>
                            <Stack spacing={1}>
                                <Typography fontSize={16} fontWeight={600} color="white">
                                    UA Basketball
                                </Typography>
                                <Typography fontSize={14} fontWeight={400} color="white">
                                    Golden State Warriors
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack alignItems="flex-start">
                            <Typography fontSize={92} fontWeight={700} lineHeight={1.1} color="white">
                                Curry Counter
                            </Typography>
                            <Typography
                                maxWidth={600}
                                fontSize={32}
                                fontWeight={600}
                                lineHeight={1.1}
                                color="white"
                                marginTop={3}
                            >
                                For every 3 point shot Stephen Curry makes in the NBA Playoffs, a new Basketball mint is
                                created.
                            </Typography>
                            <Stack direction="row" spacing={2} marginTop={5}>
                                <SupplyBox
                                    amount={5}
                                    label="Three Points Scored"
                                    bgColor="#1B1C22"
                                    headColor="#FFCA21"
                                />
                                <SupplyBox amount={0} label="Unclaimed Mints" bgColor="#1B1C22" headColor="#979797" />
                            </Stack>
                            <Stack marginTop={4}>
                                <Typography fontSize={16} fontWeight={600} color="white">
                                    How to Play:
                                </Typography>
                                <ol style={{ marginTop: 0, paddingLeft: 18 }}>
                                    <li>Connect Metamask Wallet</li>
                                    <li>Submit Raffle Entry: Only 1 Entry per game (Renews every game)</li>
                                    <li>Check site to see winners (Next day)</li>
                                    <li>Winners Claim Basketball</li>
                                </ol>
                            </Stack>
                            <ConnectWalletBtn sx={{ height: 34, fontSize: 14, padding: '2px 16px 6px' }}>
                                CONNECT WALLET
                            </ConnectWalletBtn>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default CurryCounterPageContainer;
