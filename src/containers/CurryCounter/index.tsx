import React from 'react';
import { Stack, Box, Grid, Button, Typography, IconButton } from '@mui/material';
import Container from '../Container';
import Image from 'next/image';
import BackgroundImg from '../../assets/currycounter/background.png';
import { GradientBox, ConnectWalletBtn, TblHeaderCellTypo } from './styles';
import CloseIcon from '@mui/icons-material/Close';
import LearnMoreIcon from '@mui/icons-material/KeyboardArrowDown';
import SupplyBox from '../../components/CurryShop/SupplyBox';
import RaffleWinerItem from '../../components/CurryCounter/RaffleWinerItem';
import { raffleWinnersList } from '../../constants/dummyData';

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
                                <Stack direction="row" spacing={2}>
                                    <Stack
                                        width={192}
                                        height={84}
                                        justifyContent="center"
                                        alignItems="flex-start"
                                        spacing={1}
                                        paddingX={2}
                                        borderRadius={2}
                                        sx={{ background: '#1B1C22' }}
                                    >
                                        <Typography fontSize={16} fontWeight={700} color="white">
                                            Opponent Team
                                        </Typography>
                                        <Typography fontSize={16} fontWeight={400} color="#979797">
                                            Boston Celtics
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        width={192}
                                        height={84}
                                        justifyContent="center"
                                        alignItems="flex-start"
                                        spacing={1}
                                        paddingX={2}
                                        borderRadius={2}
                                        sx={{ background: '#1B1C22' }}
                                    >
                                        <Typography fontSize={16} fontWeight={700} color="white">
                                            Cost
                                        </Typography>
                                        <Typography fontSize={16} fontWeight={400} color="#979797">
                                            Free
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        width={192}
                                        height={84}
                                        justifyContent="center"
                                        alignItems="flex-start"
                                        spacing={1}
                                        paddingX={2}
                                        borderRadius={2}
                                        sx={{ background: '#1B1C22' }}
                                    >
                                        <Typography fontSize={16} fontWeight={700} color="white">
                                            Available Mints
                                        </Typography>
                                        <Typography fontSize={16} fontWeight={400} color="#979797">
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
                    <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={14}>
                        <Stack borderRadius={4} padding={3} spacing={3} sx={{ background: '#1B1C22' }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Image src="/assets/curry-logo.png" width={40} height={40} alt="Logo" />
                                <Typography fontSize={20} fontWeight={600}>
                                    Curry Brand
                                </Typography>
                            </Stack>
                            <Box width={464} height={464} position="relative">
                                <Image src="/assets/currycounter/curry-brand.png" layout="fill" />
                            </Box>
                            <Stack spacing={1}>
                                <Typography fontSize={16} fontWeight={600}>
                                    UA Basketball
                                </Typography>
                                <Typography fontSize={14} fontWeight={400}>
                                    Golden State Warriors
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack alignItems="flex-start">
                            <Typography fontSize={92} fontWeight={700} lineHeight={1.1}>
                                Curry Counter
                            </Typography>
                            <Typography maxWidth={600} fontSize={32} fontWeight={600} lineHeight={1.1} marginTop={3}>
                                For every 3 point shot Stephen Curry makes in the NBA Playoffs, a new Basketball mint is
                                created.
                            </Typography>
                            <Stack direction="row" spacing={2} marginTop={6}>
                                <SupplyBox
                                    amount={5}
                                    label="Three Points Scored"
                                    bgColor="#1B1C22"
                                    headColor="#FFCA21"
                                />
                                <SupplyBox amount={0} label="Unclaimed Mints" bgColor="#1B1C22" headColor="#979797" />
                            </Stack>
                            <Stack marginTop={4}>
                                <Typography fontSize={16} fontWeight={600}>
                                    How to Play:
                                </Typography>
                                <ol style={{ marginTop: 0, paddingLeft: 18 }}>
                                    <li>Connect Metamask Wallet</li>
                                    <li>Submit Raffle Entry: Only 1 Entry per game (Renews every game)</li>
                                    <li>Check site to see winners (Next day)</li>
                                    <li>Winners Claim Basketball</li>
                                </ol>
                            </Stack>
                            <ConnectWalletBtn sx={{ height: 34, marginTop: 5, fontSize: 14, padding: '2px 16px 6px' }}>
                                CONNECT WALLET
                            </ConnectWalletBtn>
                        </Stack>
                    </Stack>
                    <Stack marginTop={9} spacing={4}>
                        <Typography fontSize={32} fontWeight={600}>
                            Raffle Winners
                        </Typography>
                        <Grid container rowGap={3}>
                            <Grid item container columns={14}>
                                <Grid item xs={1}>
                                    <TblHeaderCellTypo>#</TblHeaderCellTypo>
                                </Grid>
                                <Grid item xs={3}>
                                    <TblHeaderCellTypo>NFT Name</TblHeaderCellTypo>
                                </Grid>
                                <Grid item xs={3}>
                                    <TblHeaderCellTypo>Date Created</TblHeaderCellTypo>
                                </Grid>
                                <Grid item xs={5}>
                                    <TblHeaderCellTypo>Wallet Address</TblHeaderCellTypo>
                                </Grid>
                                <Grid item xs={2}>
                                    <TblHeaderCellTypo>Status</TblHeaderCellTypo>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Box width="100%" height="1px" sx={{ background: '#32343F' }}></Box>
                            </Grid>
                            {raffleWinnersList.map((item, index) => (
                                <RaffleWinerItem data={item} key={`raffle-winner-key${index}`} />
                            ))}
                        </Grid>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default CurryCounterPageContainer;
