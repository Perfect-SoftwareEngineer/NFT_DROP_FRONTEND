import React, { useCallback } from 'react';
import { Stack, Box, Grid, Button, Typography, IconButton, Dialog, CircularProgress } from '@mui/material';
import Container from '../Container';
import Image from 'next/image';
import BackgroundImg from '../../assets/currycounter/background.png';
import { GradientBox, MetamaskNotifBox, PrimaryBtn, TblHeaderCellTypo } from './styles';
import CloseIcon from '@mui/icons-material/Close';
import LearnMoreIcon from '@mui/icons-material/KeyboardArrowDown';
import SupplyBox from '../../components/CurryShop/SupplyBox';
import RaffleWinerItem from '../../components/CurryCounter/RaffleWinerItem';
import { RaffleWinnerItemType } from '../../types';
import { raffleWinnersList } from '../../constants/dummyData';
import { useWeb3React } from '@web3-react/core';
import { connect } from '../../web3/connect';
import { reduceHexAddress } from '../../services/common';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useInterval from '../../hooks/useInterval';
import Link from 'next/link';
import {
    getLatestGameInfo,
    getFreeReserveBasketballs,
    reserveFreeBasketball,
    getUnclaimedBasketballs,
    getHexProofForClaim,
    claimBasketball,
    getWinners,
    getCountValues,
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

    const [isReserve, setIsReserve] = React.useState<boolean>(false);
    const [reserveResult, setReserveResult] = React.useState<string>('');

    const [isClaim, setIsClaim] = React.useState<boolean>(false);

    const [basketballWinners, setBasketballWinners] = React.useState<RaffleWinnerItemType[]>([]);
    const [gameMoreInfo, setGameMoreInfo] = React.useState<number[]>([0, 0]);

    const [showMetamask, setShowMetamask] = React.useState<boolean>(true);

    const [claimAreaTopPos, setClaimAreaTopPos] = React.useState<number>(0);
    const claimAreaRef = React.useRef<HTMLDivElement>(null);

    const onConnect = () => {
        connect(activate);
    };

    const fetchLatestGameInfo = useCallback(() => {
        getLatestGameInfo()
            .then((response: any[]) => {
                setLastGameInfoForReserve(response);

                if (response.length > 0 && response[0].game_id) {
                    getWinners(response[0].game_id)
                        .then((response: any[]) => {
                            setBasketballWinners(response);
                        })
                        .catch((error) => {
                            setBasketballWinners([]);
                        });

                    getCountValues(response[0].game_id)
                        .then((response: any[]) => {
                            setGameMoreInfo(response);
                        })
                        .catch((error) => {});
                }
            })
            .catch((error) => {
                setLastGameInfoForReserve([]);
            });
    }, []);

    useInterval(fetchLatestGameInfo, 30 * 1000);

    React.useEffect(() => {
        if (account && lastGameInfoForReserve.length > 0 && lastGameInfoForReserve[0].game_id && !isReserve) {
            getFreeReserveBasketballs(lastGameInfoForReserve[0].game_id, account)
                .then((response: any[]) => {
                    setFreeReserveBasketballList(response);
                })
                .catch((error) => {
                    setFreeReserveBasketballList([]);
                });
        }
    }, [lastGameInfoForReserve, account, isReserve]);

    React.useEffect(() => {
        if (lastGameInfoForReserve.length > 0 && lastGameInfoForReserve[0].game_id && !isReserve && !isClaim) {
            getWinners(lastGameInfoForReserve[0].game_id)
                .then((response: any[]) => {
                    setBasketballWinners(response);
                })
                .catch((error) => {
                    setBasketballWinners([]);
                });
        }
    }, [lastGameInfoForReserve, isReserve, isClaim]);

    React.useEffect(() => {
        if (
            account &&
            lastGameInfoForReserve.length > 0 &&
            lastGameInfoForReserve[0].merkled === true &&
            lastGameInfoForReserve[0].live === false &&
            !isClaim
        ) {
            getUnclaimedBasketballs(account)
                .then((response: any[]) => {
                    // console.log('response:', response);
                    setHexProofForClaim([]);
                    setUnclaimedNFTInfo(response);
                })
                .catch((error) => {
                    setHexProofForClaim([]);
                    setUnclaimedNFTInfo([]);
                });
        }
    }, [lastGameInfoForReserve, account, isClaim]);

    React.useEffect(() => {
        if (account && unclaimedNFTInfo.length > 0 && unclaimedNFTInfo[0].game_id) {
            getHexProofForClaim(unclaimedNFTInfo[0].game_id, account)
                .then((response: any[]) => {
                    // console.log('response:', response);
                    setHexProofForClaim(response);
                })
                .catch((error) => {
                    setHexProofForClaim([]);
                });
        }
    }, [unclaimedNFTInfo, account]);

    const onReserve = () => {
        if (isReserve) return;

        if (
            account &&
            lastGameInfoForReserve.length > 0 &&
            lastGameInfoForReserve[0].game_id &&
            freeReserveBasketballList.length > 0 &&
            freeReserveBasketballList[0]._id
        ) {
            setIsReserve(true);
            reserveFreeBasketball(freeReserveBasketballList[0]._id, lastGameInfoForReserve[0].game_id, account)
                .then((response: string) => {
                    // console.log('reserve free basketball response:', response);
                    setReserveResult(
                        'Reserve Completed. Check back after the game to claim basketball. Keep in mind there might be delays in allowing minting.'
                    );
                })
                .catch((error) => {
                    // console.log('reserve free basketball error:', error);
                    setReserveResult(error);
                });

            setFreeReserveBasketballList([]);
            setIsReserve(false);
        }
    };

    const onClaim = async () => {
        if (isClaim) return;

        const nftContract = new library.eth.Contract(
            BasketballHeadABI,
            process.env.NEXT_PUBLIC_ENV == 'production' ? '' : '0x1d42BCE7Ef74E7699F6De85F8C753ddd8aB7C16B'
        );

        setIsClaim(true);
        try {
            //change gameId and hexproof from backend
            if (account && unclaimedNFTInfo.length > 0 && unclaimedNFTInfo[0].game_id && hexProofForClaim.length > 0) {
                await nftContract.methods
                    .claimFromThreePoint(unclaimedNFTInfo[0].game_id, hexProofForClaim, account)
                    .send({ from: account });
            }
        } catch (err: any) {
            console.error(err);
            setUnclaimedNFTInfo([]);
            setIsClaim(false);
            return;
        }

        //call post api
        claimBasketball(unclaimedNFTInfo[0]._id)
            .then((response: string) => {
                // console.log('claim basketball response:', response);
            })
            .catch((error) => {
                // console.log('claim basketball error:', error);
            });
        setUnclaimedNFTInfo([]);
        setIsClaim(false);
    };

    const handleAgreeTermsConditions = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgreeTermsConditions(event.target.checked);
    };

    React.useEffect(() => {
        const rect = claimAreaRef.current?.getBoundingClientRect();
        setClaimAreaTopPos(window.scrollY + (rect ? rect.top : 0));
    }, []);

    const gotoClaimPart = () => {
        window.scrollTo({ top: claimAreaTopPos, behavior: 'smooth' });
    };

    let gameStatus = lastGameInfoForReserve.length === 0 ? 0 : lastGameInfoForReserve[0].live === true ? 1 : 2; // 0: no game, 1: live, 2: not live
    const gameStatusInfo = [
        { label: '-', color: 'white' },
        { label: 'Live', color: '#B8FF97' },
        { label: 'Not Live', color: 'red' },
    ];

    return (
        <>
            <Box position="relative">
                <Box position="absolute" top={0} width="100vw" zIndex={-10}>
                    <video autoPlay muted loop style={{ width: '100%' }}>
                        <source src="/assets/currycounter/background.mp4" type="video/mp4" />
                    </video>
                    <GradientBox />
                </Box>
                <Container sx={{ position: 'relative', height: '100%', paddingY: { xs: 2, md: 5 } }}>
                    {showMetamask && (
                        <MetamaskNotifBox direction="row" spacing={2} display={{ xs: 'none', md: 'flex' }}>
                            <img src="/assets/metamask.png" width={56} height={56} alt="" />
                            <Stack spacing={1}>
                                <Typography fontSize={14} fontWeight={500}>
                                    MetaMask
                                </Typography>
                                <Typography width={320} fontSize={12} fontWeight={400}>
                                    Make sure you download Metamask and connect your account prior to minting. You will
                                    need MetaMask compatibility to mint your Basketball.
                                </Typography>
                            </Stack>
                            <IconButton sx={{ color: 'white' }} onClick={() => setShowMetamask(false)}>
                                <CloseIcon />
                            </IconButton>
                        </MetamaskNotifBox>
                    )}
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        alignItems={{ xs: 'auto', md: 'center' }}
                        spacing={{ xs: 0, md: 5 }}
                        borderRadius={{ xs: 0, md: 100 }}
                        sx={{ background: '#1B1C22' }}
                    >
                        <Stack
                            width={{ xs: '100%', md: 224 }}
                            height={64}
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius={{ xs: 0, md: 100 }}
                            spacing={1}
                            sx={{ background: '#32343F' }}
                        >
                            <Image
                                src={'/assets/currycounter/curry-brand.png'}
                                width={32}
                                height={32}
                                style={{ borderRadius: '50%' }}
                            />
                            <Typography fontSize={20} fontWeight={600} paddingBottom="6px">
                                Curry Counter
                            </Typography>
                        </Stack>
                        <Stack
                            height={64}
                            direction="row"
                            alignItems="center"
                            spacing={5}
                            paddingX={{ xs: 2, md: 0 }}
                            sx={{ overflowY: 'hidden', overflowX: 'auto' }}
                        >
                            <Box flexShrink={0}>
                                <Typography fontSize={16} fontWeight={600} color="#969AA1">
                                    Game Status:{' '}
                                    <Typography
                                        fontSize={16}
                                        fontWeight={600}
                                        color={gameStatusInfo[gameStatus].color}
                                        display="inline"
                                    >
                                        {gameStatusInfo[gameStatus].label}
                                    </Typography>
                                </Typography>
                            </Box>
                            <Box flexShrink={0}>
                                <Typography fontSize={16} fontWeight={600} color="#969AA1">
                                    Game in Series:{' '}
                                    <Typography fontSize={16} fontWeight={600} color="white" display="inline">
                                        Series 2-2
                                    </Typography>
                                </Typography>
                            </Box>
                            <Box flexShrink={0}>
                                <Typography fontSize={16} fontWeight={600} color="#969AA1">
                                    Available Reserves:{' '}
                                    <Typography fontSize={16} fontWeight={600} color="white" display="inline">
                                        6 Basketballs
                                    </Typography>
                                </Typography>
                            </Box>
                            <Box flexShrink={0}>
                                <Typography fontSize={16} fontWeight={600} color="#969AA1">
                                    Cost:{' '}
                                    <Typography fontSize={16} fontWeight={600} color="white" display="inline">
                                        Free
                                    </Typography>
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack direction={{ xs: 'column-reverse', md: 'row' }} spacing={3} marginTop={{ xs: 30, md: 50 }}>
                        <Stack width="100%" borderRadius={4} padding={4} sx={{ background: 'rgba(27, 28, 34, 0.75)' }}>
                            <Typography fontSize={32} fontWeight={600}>
                                Reserve a Basketball
                            </Typography>
                            <Stack
                                direction="row"
                                width="100%"
                                justifyContent="space-between"
                                paddingX={2}
                                paddingY={1}
                                borderRadius="100px"
                                marginTop={2}
                                sx={{ background: '#32343F' }}
                            >
                                <Typography fontSize={16} fontWeight={400}>
                                    MY WALLET ADDRESS:
                                </Typography>
                                <Typography fontSize={16} fontWeight={800}>
                                    {account ? reduceHexAddress(account, 4) : 'Wallet not connected'}
                                </Typography>
                            </Stack>
                            {account ? (
                                lastGameInfoForReserve.length > 0 &&
                                lastGameInfoForReserve[0].merkled === false &&
                                freeReserveBasketballList.length > 0 ? (
                                    <>
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
                                                    <Link href="/terms" passHref>
                                                        <Typography
                                                            color="#FFCA21"
                                                            display="inline"
                                                        >{`Terms & Conditions.`}</Typography>
                                                    </Link>
                                                </Typography>
                                            }
                                            sx={{ marginTop: 3 }}
                                        />
                                        <PrimaryBtn
                                            disabled={!agreeTermsConditions}
                                            sx={{
                                                marginTop: { xs: 1, md: 1.5 },
                                                width: 156,
                                                height: 34,
                                                fontSize: 14,
                                                padding: '2px 16px 6px',
                                            }}
                                            onClick={onReserve}
                                        >
                                            RESERVE
                                        </PrimaryBtn>
                                        <Typography fontSize={16} fontWeight={400} color="#FFCA21" marginTop={2}>
                                            Reserve Completed. Check back after the game to claim basketball. Keep in
                                            mind there might be delays in allowing minting.
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Typography fontSize={16} fontWeight={400} marginTop={2}>
                                            Even if Stephen Curry made a three-point shot, it will take around 30
                                            seconds for our system to process.
                                        </Typography>
                                        <PrimaryBtn
                                            disabled
                                            sx={{
                                                width: 156,
                                                height: 34,
                                                fontSize: 14,
                                                padding: '2px 16px 6px',
                                                marginTop: 2,
                                            }}
                                        >
                                            UNAVAILABLE
                                        </PrimaryBtn>
                                        <Typography fontSize={16} fontWeight={400} color="#FFCA21" marginTop={2}>
                                            There are currently no reserves available.
                                        </Typography>
                                    </>
                                )
                            ) : (
                                <>
                                    <Typography fontSize={16} fontWeight={400} marginTop={2}>
                                        In order to start, please connect your MetaMask Wallet. You will only be able to
                                        start after connecting your Wallet.
                                    </Typography>
                                    <PrimaryBtn
                                        sx={{
                                            width: 156,
                                            height: 34,
                                            fontSize: 14,
                                            padding: '2px 16px 6px',
                                            marginTop: 3,
                                        }}
                                        onClick={onConnect}
                                    >
                                        CONNECT WALLET
                                    </PrimaryBtn>
                                </>
                            )}
                        </Stack>
                        <Stack width="100%" borderRadius={4} padding={4} sx={{ background: 'rgba(27, 28, 34, 0.75)' }}>
                            <Typography fontSize={32} fontWeight={600} lineHeight={1.2}>
                                How to Get Basketball
                            </Typography>
                            <Typography fontSize={16} fontWeight={400} color="#FFCA21" marginTop={2}>
                                NOTE: Reserving a Basketball does not guarantee a claim.
                            </Typography>
                            <Typography fontSize={16} fontWeight={600} marginTop={2.5}>
                                How this works:
                            </Typography>
                            <ol style={{ marginTop: 0, paddingLeft: 18 }}>
                                <li>Connect your Wallet</li>
                                <li>For every three-point shot, 3 free Basketballs that can be reserved</li>
                                <li>{`Accept Terms & Conditions and Press "Reserve"`}</li>
                                <li>
                                    Whoever reserves the Basketball first will be able to claim their free Basketball
                                    mint after the game{` `}
                                    <span onClick={gotoClaimPart} style={{ color: '#FFCA21', cursor: 'pointer' }}>
                                        below
                                    </span>
                                </li>
                            </ol>
                        </Stack>
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={{ xs: 5, md: 14 }}
                        marginTop={10}
                        ref={claimAreaRef}
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
                                <Image
                                    src="/assets/currycounter/curry-brand.png"
                                    layout="fill"
                                    style={{ borderRadius: 16 }}
                                />
                            </Box>
                            <Stack spacing={1}>
                                <Typography fontSize={16} fontWeight={600}>
                                    Curry Brand Basketball
                                </Typography>
                                <Typography fontSize={14} fontWeight={400}>
                                    GSW Playoffs Basketball
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
                                For every three-point shot Stephen Curry makes in the NBA Playoffs, 3 new Basketball
                                mints are created.
                            </Typography>
                            <Grid container marginTop={{ xs: 3.5, md: 6 }} columnSpacing={2}>
                                <Grid item xs={6}>
                                    <SupplyBox
                                        amount={gameMoreInfo[0]}
                                        label="Three Points Scored"
                                        bgColor="#1B1C22"
                                        headColor="#FFCA21"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <SupplyBox
                                        amount={gameMoreInfo[1]}
                                        label="Available Reserves"
                                        bgColor="#1B1C22"
                                        headColor="#979797"
                                    />
                                </Grid>
                            </Grid>
                            <Stack marginTop={4}>
                                <Typography fontSize={16} fontWeight={600}>
                                    Claim Your Basketball
                                </Typography>
                                <ol style={{ marginTop: 0, paddingLeft: 18 }}>
                                    <li>Connect Metamask Wallet</li>
                                    <li>When Score is made, press reserve</li>
                                    <li>If you have successfully reserved a Basketball,press "Claim"</li>
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
                                                    unclaimedNFTInfo.length > 0 &&
                                                    hexProofForClaim.length > 0
                                                )
                                            }
                                            sx={{ width: 156, height: 34, fontSize: 14, padding: '2px 16px 6px' }}
                                            onClick={onClaim}
                                        >
                                            CLAIM
                                        </PrimaryBtn>
                                        {!!unclaimedNFTInfo.length ? (
                                            <Typography fontSize={16} fontWeight={600}>
                                                You have{' '}
                                                <Typography
                                                    fontSize={16}
                                                    fontWeight={600}
                                                    color="#FFCA21"
                                                    display="inline"
                                                >
                                                    {`${unclaimedNFTInfo.length} unclaimed mint`}
                                                </Typography>
                                            </Typography>
                                        ) : (
                                            <Typography fontSize={16} fontWeight={600}>
                                                You do not have any claims
                                            </Typography>
                                        )}
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
                    <Stack marginY={{ xs: 6, md: 9 }} spacing={4}>
                        <Typography fontSize={32} fontWeight={600}>
                            Basketball Winners
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
                            {basketballWinners.map((item, index) => (
                                <RaffleWinerItem data={item} index={index} key={`raffle-winner-key${index}`} />
                            ))}
                        </Grid>
                    </Stack>
                </Container>
            </Box>

            <Dialog
                open={isReserve || isClaim}
                maxWidth="lg"
                PaperProps={{
                    sx: {
                        padding: 4,
                        background: 'none',
                    },
                }}
            >
                <CircularProgress />
            </Dialog>
        </>
    );
};

export default CurryCounterPageContainer;
