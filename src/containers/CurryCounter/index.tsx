import React from 'react';
import { Stack, Box, Grid, Button, Typography, IconButton } from '@mui/material';
import Container from '../Container';
import Image from 'next/image';
import BackgroundImg from '../../assets/currycounter/background.png';
import { GradientBox, MetamaskNotifBox, PrimaryBtn, TblHeaderCellTypo } from './styles';
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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    getLatestGameInfo,
    getFreeReserveBasketballs,
    reserveFreeBasketball,
    getUnclaimedBasketballs,
    getHexProofForClaim,
    claimBasketball,
} from '../../services/fetch';

import BasketballHeadABI from '../../lib/ABI/BasketBallHead.json';

const CurryCounterPageContainer: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const { active, account, library, connector, activate, deactivate } = useWeb3React();
    const [agreeTermsConditions, setAgreeTermsConditions] = React.useState(false);

    const [lastGameInfoForReserve, setLastGameInfoForReserve] = React.useState<any[]>([]);
    const [freeReserveBasketballList, setFreeReserveBasketballList] = React.useState<any[]>([]);
    const [unclaimedNFTInfo, setUnclaimedNFTInfo] = React.useState<any[]>([]);
    const [hexProofForClaim, setHexProofForClaim] = React.useState<any[]>([]);

    const onConnect = () => {
        connect(activate);
    };

    React.useEffect(() => {
        setInterval(() => {
            getLatestGameInfo().then((response: any) => {
                // console.log('response:', response);
                let result: any[] = response;
                setLastGameInfoForReserve(result);
            });
            console.log('getLatestGameInfo');
        }, 60 * 1000);
    }, []);

    React.useEffect(() => {
        if (lastGameInfoForReserve.length > 0 && lastGameInfoForReserve[0].game_id) {
            getFreeReserveBasketballs(lastGameInfoForReserve[0].game_id).then((response: any) => {
                // console.log('response:', response);
                let result: any[] = response;
                setFreeReserveBasketballList(result);
            });

            if (account && lastGameInfoForReserve[0].merkled === true && lastGameInfoForReserve[0].live === false) {
                getUnclaimedBasketballs(account).then((response: any) => {
                    let result: any[] = response;
                    setUnclaimedNFTInfo(result);
                });
            }
        }
    }, [lastGameInfoForReserve, account]);

    React.useEffect(() => {
        if (account && unclaimedNFTInfo.length > 0 && unclaimedNFTInfo[0].game_id) {
            getHexProofForClaim(unclaimedNFTInfo[0].game_id, account).then((response: any) => {
                let result: any[] = response;
                setHexProofForClaim(result);
            });
        }
    }, [unclaimedNFTInfo, account]);

    const onReserve = () => {
        if (
            account &&
            lastGameInfoForReserve.length > 0 &&
            lastGameInfoForReserve[0].game_id &&
            freeReserveBasketballList.length > 0 &&
            freeReserveBasketballList[0]._id
        ) {
            reserveFreeBasketball(freeReserveBasketballList[0]._id, lastGameInfoForReserve[0].game_id, account)
                .then((response: string) => {
                    console.log('reserve free basketball response:', response);
                })
                .catch((error) => {
                    console.log('reserve free basketball error:', error);
                });
        }
    };

    const claim = async () => {
        const nftContract = new library.eth.Contract(
            BasketballHeadABI,
            process.env.NEXT_PUBLIC_ENV == 'production' ? '' : '0x0dC87A666eFbA194B6FfE4014D2f80b706D5dF51'
        );
        try {
            //change gameId and hexproof from backend
            if (account && unclaimedNFTInfo.length > 0 && unclaimedNFTInfo[0].game_id && hexProofForClaim.length > 0) {
                await nftContract.methods
                    .claimFromThreePoint(unclaimedNFTInfo[0].game_id, hexProofForClaim, account)
                    .send({ from: account });

                //call post api
                claimBasketball(unclaimedNFTInfo[0].game_id)
                    .then((response: string) => {
                        console.log('claim basketball response:', response);
                    })
                    .catch((error) => {
                        console.log('claim basketball error:', error);
                    });
            }
        } catch (err: any) {
            console.error(err);
            return;
        }
    };

    const handleAgreeTermsConditions = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgreeTermsConditions(event.target.checked);
    };

    return (
        <>
            <Box position="relative">
                <Box height={{ xs: 640, md: '100%' }}>
                    <Image src={BackgroundImg} layout={matchDownMd ? 'fill' : 'responsive'} objectFit="cover" alt="" />
                </Box>
                <GradientBox />
                <Box position="absolute" sx={{ inset: 0 }}>
                    <Container sx={{ height: '100%', paddingY: { xs: 2, md: 5 } }}>
                        <Stack height="100%" justifyContent="flex-end" position="relative">
                            <MetamaskNotifBox direction="row" spacing={2} display={{ xs: 'none', md: 'flex' }}>
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
                            </MetamaskNotifBox>
                            <Stack marginX="auto" alignItems="center">
                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 2 }}>
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
                                            {lastGameInfoForReserve.length > 0 &&
                                            lastGameInfoForReserve[0].opposite_team
                                                ? lastGameInfoForReserve[0].opposite_team
                                                : '-'}
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
                                                {reduceHexAddress(account, 4)}
                                            </Typography>
                                        </Stack>
                                        {lastGameInfoForReserve.length > 0 && freeReserveBasketballList.length > 0 ? (
                                            <>
                                                <Stack direction="row" alignItems="center" marginTop={{ xs: 1, md: 3 }}>
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
                                                <PrimaryBtn
                                                    disabled={!agreeTermsConditions}
                                                    sx={{ marginTop: { xs: 1, md: 2.5 } }}
                                                    onClick={onReserve}
                                                >
                                                    Reserve
                                                </PrimaryBtn>
                                                <Typography
                                                    width={{ xs: '90%', md: 480 }}
                                                    color="#FFCA21"
                                                    textAlign="center"
                                                    marginTop={{ xs: 1, md: 3 }}
                                                >
                                                    Reserve Completed. Check back after the game to claim basketball.
                                                    Keep in mind there might be delays in allowing minting.
                                                </Typography>
                                            </>
                                        ) : (
                                            <>
                                                <PrimaryBtn disabled sx={{ marginTop: { xs: 2, md: 4 } }}>
                                                    Unavailable
                                                </PrimaryBtn>
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
                                <Stack marginTop={{ xs: 2, sm: 3.5, md: 5 }}>
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
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={{ xs: 5, md: 14 }}
                    >
                        <Stack
                            alignSelf="center"
                            borderRadius={4}
                            padding={3}
                            spacing={3}
                            sx={{ background: '#1B1C22' }}
                        >
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Image src="/assets/curry-logo.png" width={40} height={40} alt="Logo" />
                                <Typography fontSize={20} fontWeight={600}>
                                    Curry Brand
                                </Typography>
                            </Stack>
                            <Box width={{ xs: 300, sm: 464 }} height={{ xs: 300, sm: 464 }} position="relative">
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
                            <Typography fontSize={{ xs: 48, sm: 64, md: 92 }} fontWeight={700} lineHeight={1.1}>
                                Curry Counter
                            </Typography>
                            <Typography
                                maxWidth={600}
                                fontSize={{ xs: 16, sm: 24, md: 32 }}
                                fontWeight={600}
                                lineHeight={1.1}
                                marginTop={3}
                            >
                                For every 3 point shot Stephen Curry makes in the NBA Playoffs, a new Basketball mint is
                                created.
                            </Typography>
                            <Grid container marginTop={{ xs: 3.5, md: 6 }} columnSpacing={2}>
                                <Grid item xs={6}>
                                    <SupplyBox
                                        amount={5}
                                        label="Three Points Scored"
                                        bgColor="#1B1C22"
                                        headColor="#FFCA21"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <SupplyBox
                                        amount={0}
                                        label="Games Left in Season"
                                        bgColor="#1B1C22"
                                        headColor="#979797"
                                    />
                                </Grid>
                            </Grid>
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
                            <Stack marginTop={{ xs: 4, md: 5 }} spacing={1}>
                                {account ? (
                                    <>
                                        <PrimaryBtn
                                            disabled={
                                                !(
                                                    lastGameInfoForReserve.length > 0 &&
                                                    lastGameInfoForReserve[0].merkled === true &&
                                                    lastGameInfoForReserve[0].live === false &&
                                                    unclaimedNFTInfo.length > 0
                                                )
                                            }
                                            sx={{ width: 156, height: 34, fontSize: 14, padding: '2px 16px 6px' }}
                                            onClick={claim}
                                        >
                                            CLAIM
                                        </PrimaryBtn>
                                        <Typography fontSize={16} fontWeight={600}>
                                            You have 1 unclaimed mint
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
                    <Stack marginTop={{ xs: 6, md: 9 }} spacing={4}>
                        <Typography fontSize={32} fontWeight={600}>
                            Raffle Winners
                        </Typography>
                        <Grid container rowGap={3}>
                            <Grid item container columns={{ xs: 7, md: 14 }}>
                                <Grid item xs={1}>
                                    <TblHeaderCellTypo>#</TblHeaderCellTypo>
                                </Grid>
                                <Grid item xs={3}>
                                    <TblHeaderCellTypo>NFT Name</TblHeaderCellTypo>
                                </Grid>
                                <Grid item xs={3} display={{ xs: 'none', md: 'block' }}>
                                    <TblHeaderCellTypo>Date Created</TblHeaderCellTypo>
                                </Grid>
                                <Grid item xs={3} md={5}>
                                    <TblHeaderCellTypo>Wallet Address</TblHeaderCellTypo>
                                </Grid>
                                <Grid item xs={2} display={{ xs: 'none', md: 'block' }}>
                                    <TblHeaderCellTypo>Status</TblHeaderCellTypo>
                                </Grid>
                            </Grid>
                            <Grid item xs={14}>
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
