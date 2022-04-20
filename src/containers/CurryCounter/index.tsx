import React from 'react';
import { Stack, Box, Grid, Button, Typography, IconButton } from '@mui/material';
import Container from '../Container';
import Image from 'next/image';
import BackgroundImg from '../../assets/currycounter/background.png';
import { GradientBox, PrimaryBtn, TblHeaderCellTypo } from './styles';
import CloseIcon from '@mui/icons-material/Close';
import LearnMoreIcon from '@mui/icons-material/KeyboardArrowDown';
import SupplyBox from '../../components/CurryShop/SupplyBox';
import RaffleWinerItem from '../../components/CurryCounter/RaffleWinerItem';
import { raffleWinnersList } from '../../constants/dummyData';
import { useWeb3React } from '@web3-react/core';
import { connect } from '../../web3/connect';
import { reduceHexAddress } from '../../services/common';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CurryCounterPageContainer: React.FC = (): JSX.Element => {
    const { active, account, library, connector, activate, deactivate } = useWeb3React();
    const [agreeTermsConditions, setAgreeTermsConditions] = React.useState(false);
    const [reserveAvailable, setReserveAvailable] = React.useState(true);

    const onConnect = () => {
        connect(activate);
    };

    const handleAgreeTermsConditions = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgreeTermsConditions(event.target.checked);
    };

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
                                    <Typography fontSize={14} fontWeight={500}>
                                        MetaMask
                                    </Typography>
                                    <Typography width={320} fontSize={12} fontWeight={400}>
                                        Make sure you download Metamask and connect your account prior to minting. You
                                        will need MetaMask compatibility to mint your Intel Cryptex.
                                    </Typography>
                                </Stack>
                                <IconButton sx={{ color: 'white' }}>
                                    <CloseIcon />
                                </IconButton>
                            </Stack>
                            <Stack marginX="auto" alignItems="center">
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
                                {account ? (
                                    <>
                                        <Stack
                                            direction="row"
                                            width="100%"
                                            justifyContent="space-between"
                                            paddingX={3}
                                            paddingY={1}
                                            borderRadius="100px"
                                            marginTop={3}
                                            sx={{ background: '#1B1C22' }}
                                        >
                                            <Typography fontSize={16} fontWeight={400}>
                                                MY WALLET ADDRESS:
                                            </Typography>
                                            <Typography fontSize={16} fontWeight={800}>
                                                {reduceHexAddress('0x3acedf55a03877c7561830238f0adb9e24090fbd', 4)}
                                            </Typography>
                                        </Stack>
                                        {reserveAvailable ? (
                                            <>
                                                <Stack direction="row" alignItems="center" marginTop={3}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={agreeTermsConditions}
                                                                onChange={handleAgreeTermsConditions}
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                                sx={{ color: '#9E9E9E' }}
                                                            />
                                                        }
                                                        label={
                                                            <Typography marginBottom="6px">
                                                                {`I agree that checking this box, I agree to Under Armours's `}
                                                                <Typography
                                                                    color="#FFCA21"
                                                                    display="inline"
                                                                >{`Terms & Conditions.`}</Typography>
                                                            </Typography>
                                                        }
                                                    />
                                                </Stack>
                                                <PrimaryBtn sx={{ marginTop: 2.5 }}>Reserve</PrimaryBtn>
                                                <Typography
                                                    width={480}
                                                    color="#FFCA21"
                                                    textAlign="center"
                                                    marginTop={3}
                                                >
                                                    Reserve Completed. Check back after the game to claim basketball.
                                                    Keep in mind there might be delays in allowing minting.
                                                </Typography>
                                            </>
                                        ) : (
                                            <>
                                                <PrimaryBtn disabled sx={{ marginTop: 4 }}>Unavailable</PrimaryBtn>
                                                <Typography color="#FFCA21" marginTop={2}>
                                                    Sorry, no reserves available
                                                </Typography>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <PrimaryBtn sx={{ marginTop: 4 }} onClick={onConnect}>
                                        Connect Wallet
                                    </PrimaryBtn>
                                )}
                                <Stack marginTop={5}>
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
                            <Stack marginTop={5} spacing={1}>
                                {account ? (
                                    <>
                                        <PrimaryBtn
                                            disabled={!reserveAvailable}
                                            sx={{ width: 156, height: 34, fontSize: 14, padding: '2px 16px 6px' }}
                                        >
                                            CLAIM
                                        </PrimaryBtn>
                                        <Typography fontSize={16} fontWeight={600}>
                                            {reserveAvailable
                                                ? 'You have 1 unclaimed mint'
                                                : 'You do not have any claims'}
                                        </Typography>
                                    </>
                                ) : (
                                    <PrimaryBtn
                                        sx={{ width: 156, height: 34, fontSize: 14, padding: '2px 16px 6px' }}
                                        onClick={onConnect}
                                    >
                                        CONNECT WALLET
                                    </PrimaryBtn>
                                )}
                            </Stack>
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
