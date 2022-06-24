import React, { useCallback } from 'react';
import {
    Stack,
    Box,
    Grid,
    Button,
    Typography,
    IconButton,
    Dialog,
    CircularProgress,
    Link as MuiLink
} from '@mui/material';
import Container from '../Container';
import Image from 'next/image';
import BackgroundImg from '../../assets/currycounter/background.png';
import { GradientBox, MetamaskNotiBox, DiscordNotiBox, PrimaryBtn, TblHeaderCellTypo } from './styles';
import CloseIcon from '@mui/icons-material/Close';
import LearnMoreIcon from '@mui/icons-material/KeyboardArrowDown';
import SupplyBox from '../../components/CurryCounter/SupplyBox';
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
    startClaim,
    claimBasketball,
    getWinners,
    getCountValues
} from '../../services/api/currycounter';
import { usePrevious } from 'react-use';

import BasketballABI from '../../lib/ABI/BasketBall.json';

const CurryCounterPageContainer: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const { active, account, library, connector, activate, deactivate } = useWeb3React();
    const accountPrev = usePrevious(account);

    const [agreeTermsConditions, setAgreeTermsConditions] = React.useState(false);

    const [lastGameInfoForReserve, setLastGameInfoForReserve] = React.useState<any[]>([]);
    const lastGameInfoForReservePrev = usePrevious(lastGameInfoForReserve);

    const [freeReserveBasketballList, setFreeReserveBasketballList] = React.useState<any[]>([]);
    const [unclaimedNFTInfo, setUnclaimedNFTInfo] = React.useState<any[]>([]);
    const [hexProofForClaim, setHexProofForClaim] = React.useState<any[]>([]);

    const [reserveAvailable, setReserveAvailable] = React.useState<boolean>(false);
    const [reserveState, setReserveState] = React.useState<number>(0); // 0: initial state, 1: default, 2: before reserve request, 3: success, 4: failed
    const [reserveResult, setReserveResult] = React.useState<string>('');

    const [claimState, setClaimState] = React.useState<number>(0); // 0: initial state, 1: default, 2: before claim request, 3: success, 4: failed

    const [basketballWinners, setBasketballWinners] = React.useState<RaffleWinnerItemType[]>([]);
    const [gameMoreInfo, setGameMoreInfo] = React.useState<number[]>([0, 0]);

    const [showMetamaskNoti, setShowMetamaskNoti] = React.useState<boolean>(true);
    const [showDiscordNoti, setShowDiscordNoti] = React.useState<boolean>(true);

    const [claimAreaTopPos, setClaimAreaTopPos] = React.useState<number>(0);
    const claimAreaRef = React.useRef<HTMLDivElement>(null);

    const [viewAll, setViewAll] = React.useState<boolean>(false);

    const onConnect = () => {
        connect(activate);
    };

    const fetchLatestGameInfo = useCallback(() => {
        getLatestGameInfo()
            .then((response: any[]) => {
                setLastGameInfoForReserve(response);
                // console.log('setLastGameInfoForReserve');

                if (response.length > 0 && response[0].game_id) {
                    getWinners(response[0].game_id)
                        .then((response: any[]) => {
                            setBasketballWinners(response);
                        })
                        .catch(error => {
                            setBasketballWinners([]);
                        });

                    getCountValues(response[0].game_id)
                        .then((response: any[]) => {
                            setGameMoreInfo(response);
                        })
                        .catch(error => {});
                }
            })
            .catch(error => {
                setLastGameInfoForReserve([]);
            });
    }, []);

    useInterval(fetchLatestGameInfo, 10 * 1000);

    React.useEffect(() => {
        if (
            account !== accountPrev ||
            lastGameInfoForReserve !== lastGameInfoForReservePrev ||
            reserveState === 0 ||
            reserveState === 3 ||
            reserveState === 4
        ) {
            if (account && lastGameInfoForReserve.length > 0 && lastGameInfoForReserve[0].game_id) {
                // console.log('getFreeReserveBasketballs');
                getFreeReserveBasketballs(lastGameInfoForReserve[0].game_id, account)
                    .then((response: any[]) => {
                        setFreeReserveBasketballList(response);
                    })
                    .catch(error => {
                        setFreeReserveBasketballList([]);
                    })
                    .finally(() => {
                        if (reserveState === 4) {
                            setTimeout(() => setReserveState(1), 3000);
                        } else {
                            setReserveState(1);
                        }
                    });
            }
        }
    }, [lastGameInfoForReserve, account, reserveState]);

    React.useEffect(() => {
        if (
            lastGameInfoForReserve.length > 0 &&
            lastGameInfoForReserve[0].game_id &&
            (reserveState === 3 || claimState === 3)
        ) {
            getWinners(lastGameInfoForReserve[0].game_id)
                .then((response: any[]) => {
                    setBasketballWinners(response);
                })
                .catch(error => {
                    setBasketballWinners([]);
                });
        }
    }, [reserveState, claimState]);

    React.useEffect(() => {
        if (
            account !== accountPrev ||
            lastGameInfoForReserve !== lastGameInfoForReservePrev ||
            claimState === 0 ||
            claimState === 3 ||
            claimState === 4
        ) {
            if (
                account &&
                lastGameInfoForReserve.length > 0 &&
                lastGameInfoForReserve[0].merkled === true &&
                lastGameInfoForReserve[0].live === false
            ) {
                // console.log('getUnclaimedBasketballs');
                getUnclaimedBasketballs(account)
                    .then((response: any[]) => {
                        // console.log('response:', response);
                        setUnclaimedNFTInfo(response);
                    })
                    .catch(error => {
                        setUnclaimedNFTInfo([]);
                    })
                    .finally(() => {});
            }

            if (claimState === 3 || claimState === 4) {
                setTimeout(() => setClaimState(1), 3000);
            } else if (claimState !== 2) {
                setClaimState(1);
            }
        }
    }, [lastGameInfoForReserve, account, claimState]);

    React.useEffect(() => {
        if (account && unclaimedNFTInfo.length > 0 && unclaimedNFTInfo[0].game_id) {
            getHexProofForClaim(unclaimedNFTInfo[0].game_id, account)
                .then((response: any[]) => {
                    // console.log('response:', response);
                    setHexProofForClaim(response);
                })
                .catch(error => {
                    setHexProofForClaim([]);
                });
        }
    }, [unclaimedNFTInfo, account]);

    const onReserve = () => {
        if (reserveState === 2) return;

        if (
            account &&
            lastGameInfoForReserve.length > 0 &&
            lastGameInfoForReserve[0].game_id &&
            freeReserveBasketballList.length > 0 &&
            freeReserveBasketballList[0]._id
        ) {
            setReserveState(2);
            reserveFreeBasketball(freeReserveBasketballList[0]._id, lastGameInfoForReserve[0].game_id, account)
                .then((response: string) => {
                    // console.log('reserve free basketball response:', response);
                    setReserveResult(
                        'Reserve Completed. Check back after the game to claim basketball. Keep in mind there might be delays in allowing minting.'
                    );
                    setReserveState(3);
                })
                .catch(error => {
                    // console.log('reserve free basketball error:', error);
                    setReserveResult(error);
                    setReserveState(4);
                })
                .finally(() => {
                    setFreeReserveBasketballList([]);
                });
        }
    };

    const onClaim = async () => {
        if (
            claimState === 2 ||
            !(account && unclaimedNFTInfo.length > 0 && unclaimedNFTInfo[0].game_id && hexProofForClaim.length > 0)
        )
            return;

        setClaimState(2);

        startClaim(unclaimedNFTInfo[0].game_id, account);

        const nftContract = new library.eth.Contract(
            BasketballABI,
            process.env.NEXT_PUBLIC_ENV == 'production'
                ? process.env.NEXT_PUBLIC_MAINNET_BASKETBALL_CONTRACT_ADDRESS
                : process.env.NEXT_PUBLIC_TESTNET_BASKETBALL_CONTRACT_ADDRESS
        );

        // console.log('call contract method claimFromThreePoint!');
        try {
            //change gameId and hexproof from backend
            await nftContract.methods
                .claimFromThreePoint(unclaimedNFTInfo[0].game_id, hexProofForClaim, account)
                .send({ from: account });
        } catch (err) {
            // console.log(err);
            setUnclaimedNFTInfo([]);
            setHexProofForClaim([]);
            setClaimState(4);
            return;
        }
        // console.log('call contract method claimFromThreePoint end!');

        //call post api
        claimBasketball(unclaimedNFTInfo[0]._id)
            .then((response: string) => {
                // console.log('claim basketball response:', response);
                setClaimState(3);
            })
            .catch(error => {
                // console.log('claim basketball error:', error);
                setClaimState(4);
            })
            .finally(() => {
                setUnclaimedNFTInfo([]);
                setHexProofForClaim([]);
            });
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
        { label: 'Not Live', color: 'red' }
    ];

    React.useEffect(() => {
        setReserveAvailable(
            lastGameInfoForReserve.length > 0 &&
                lastGameInfoForReserve[0].merkled === false &&
                freeReserveBasketballList.length > 0 &&
                freeReserveBasketballList[0].wallet === '0x'
        );
    }, [lastGameInfoForReserve, freeReserveBasketballList]);

    return (
        <>
            <Box position="relative">
                <Box position="absolute" top={0} width="100vw" zIndex={-10}>
                    {!matchDownMd && (
                        <video autoPlay muted loop style={{ width: '100%' }}>
                            <source src={'/assets/currycounter/background.mp4'} type="video/mp4" />
                        </video>
                    )}
                    {matchDownMd && (
                        <video autoPlay muted loop style={{ width: '100%' }}>
                            <source src={'/assets/currycounter/background-mobile.mp4'} type="video/mp4" />
                        </video>
                    )}
                    <GradientBox />
                </Box>
                <Container sx={{ position: 'relative', height: '100%', paddingY: { xs: 2, md: 5 } }}>
                    {showMetamaskNoti && (
                        <MetamaskNotiBox
                            direction="row"
                            alignItems="flex-start"
                            spacing={2}
                            display={{ xs: 'none', md: 'flex' }}
                        >
                            <img src="/assets/metamask.png" width={56} height={56} alt="" />
                            <Stack spacing={1}>
                                <Typography fontSize={14} fontWeight={500}>
                                    MetaMask
                                </Typography>
                                <Typography width={320} fontSize={12} fontWeight={400}>
                                    Make sure you download MetaMask and connect your account. You will need MetaMask
                                    compatibility. Get your download ready.
                                </Typography>
                            </Stack>
                            <IconButton sx={{ color: 'white' }} onClick={() => setShowMetamaskNoti(false)}>
                                <CloseIcon />
                            </IconButton>
                        </MetamaskNotiBox>
                    )}
                    {showDiscordNoti && (
                        <DiscordNotiBox
                            direction="row"
                            alignItems="flex-start"
                            spacing={2}
                            display={{ xs: 'none', md: 'flex' }}
                        >
                            <img src="/assets/discord.svg" width={56} height={56} alt="" />
                            <Stack spacing={1}>
                                <Typography fontSize={14} fontWeight={500}>
                                    Join Our Discord
                                </Typography>
                                <Typography width={320} fontSize={12} fontWeight={400}>
                                    Let's watch the game together!{' '}
                                    <MuiLink
                                        href="https://discord.gg/currybrand"
                                        color="#FFCA21"
                                        underline="none"
                                        target="_blank"
                                    >
                                        Join our Discord
                                    </MuiLink>{' '}
                                    now and watch NF3s rain.
                                </Typography>
                            </Stack>
                            <IconButton sx={{ color: 'white' }} onClick={() => setShowDiscordNoti(false)}>
                                <CloseIcon />
                            </IconButton>
                        </DiscordNotiBox>
                    )}
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        alignItems={{ xs: 'auto', md: 'center' }}
                        spacing={{ xs: 0, md: 5 }}
                        borderRadius={{ xs: 0, md: 100 }}
                        sx={{ background: '#1B1C22' }}
                    >
                        <Stack
                            width={{ xs: '100%', md: 192 }}
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
                            <Typography
                                fontSize={20}
                                fontWeight={800}
                                paddingBottom="6px"
                                textTransform="uppercase"
                                className="neueplak_condensed"
                            >
                                NF3 Counter
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
                                        3
                                    </Typography>
                                </Typography>
                            </Box>
                            <Box flexShrink={0}>
                                <Typography fontSize={16} fontWeight={600} color="#969AA1">
                                    Available Reserves:{' '}
                                    <Typography fontSize={16} fontWeight={600} color="white" display="inline">
                                        {`${gameMoreInfo[1]} Basketballs`}
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
                            <Typography
                                fontSize={32}
                                fontWeight={800}
                                textTransform="uppercase"
                                className="neueplak_condensed"
                            >
                                Reserve an NF3 Basketball
                            </Typography>
                            {!account && (
                                <Typography fontSize={16} fontWeight={400} marginTop={2}>
                                    For every three-pointer Stephen Curry makes in a playoff game, nine free digital
                                    basketballs are claimable by the most engaged fans. Be fast. Others will be trying
                                    as well. For more info, check out our{' '}
                                    <MuiLink href="/faq" color="#FFCA21" underline="none">
                                        FAQ
                                    </MuiLink>
                                    .
                                </Typography>
                            )}
                            <Stack
                                direction="row"
                                width="100%"
                                justifyContent="space-between"
                                paddingX={{ xs: 3, md: 2 }}
                                paddingY={1}
                                borderRadius="100px"
                                marginTop={2}
                                sx={{ background: '#32343F' }}
                            >
                                <Typography fontSize={16} fontWeight={400}>
                                    MY WALLET ADDRESS:
                                </Typography>
                                <Typography fontSize={16} fontWeight={800} textAlign="right">
                                    {account ? reduceHexAddress(account, 4) : 'Wallet not connected'}
                                </Typography>
                            </Stack>
                            {account ? (
                                <>
                                    {reserveAvailable && (
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
                                                    I have read and agree to the{' '}
                                                    <Link href="/legal/terms-and-conditions" passHref>
                                                        <a rel="noopener noreferrer" target="_blank">
                                                            <Typography color="#FFCA21" display="inline">
                                                                {`Terms & Conditions`}
                                                            </Typography>
                                                        </a>
                                                    </Link>
                                                    ,{' '}
                                                    <Link href="https://account.underarmour.com/en-us/privacy" passHref>
                                                        <a target="_blank" rel="noopener noreferrer">
                                                            <Typography color="#FFCA21" display="inline">
                                                                Privacy Policy
                                                            </Typography>
                                                        </a>
                                                    </Link>
                                                    , and{' '}
                                                    <Link href="/legal/nft-ownership-agreement" passHref>
                                                        <a rel="noopener noreferrer" target="_blank">
                                                            <Typography color="#FFCA21" display="inline">
                                                                NFT Ownership Agreement
                                                            </Typography>
                                                        </a>
                                                    </Link>
                                                    .
                                                </Typography>
                                            }
                                            sx={{ marginTop: 3 }}
                                        />
                                    )}
                                    <PrimaryBtn
                                        disabled={!agreeTermsConditions || !reserveAvailable}
                                        sx={{
                                            marginTop: { xs: 1, md: 1.5 },
                                            width: 156,
                                            height: 34,
                                            fontSize: 14,
                                            padding: '2px 16px 6px'
                                        }}
                                        onClick={onReserve}
                                    >
                                        RESERVE
                                    </PrimaryBtn>
                                    {(reserveState === 3 ||
                                        (freeReserveBasketballList.length > 0 &&
                                            freeReserveBasketballList[0].wallet.toUpperCase() ===
                                                account.toUpperCase())) && (
                                        <>
                                            <Typography fontSize={16} fontWeight={400} color="#B8FF97" marginTop={3}>
                                                You have successfully reserved an NF3 Basketball!
                                            </Typography>
                                            <Typography fontSize={12} fontWeight={400} marginTop={1}>
                                                Please wait till one hour after the end of the game to claim your NF3
                                                Basketball NFT. After the game, the mintlist will take time to update.
                                                Once complete, you may claim your NFT!
                                            </Typography>
                                        </>
                                    )}
                                    {reserveState === 4 && (
                                        <>
                                            <Typography fontSize={16} fontWeight={400} color="#FF2121" marginTop={3}>
                                                Reserve Unsuccessful
                                            </Typography>
                                            <Typography fontSize={12} fontWeight={400} marginTop={1}>
                                                Try again on the next available Reserve.
                                            </Typography>
                                        </>
                                    )}
                                </>
                            ) : (
                                <PrimaryBtn
                                    sx={{
                                        width: 156,
                                        height: 34,
                                        fontSize: 14,
                                        padding: '2px 16px 6px',
                                        marginTop: 3
                                    }}
                                    onClick={onConnect}
                                >
                                    CONNECT WALLET
                                </PrimaryBtn>
                            )}
                        </Stack>
                        <Stack width="100%" borderRadius={4} padding={4} sx={{ background: 'rgba(27, 28, 34, 0.75)' }}>
                            <Typography
                                fontSize={32}
                                fontWeight={800}
                                lineHeight={1.2}
                                textTransform="uppercase"
                                className="neueplak_condensed"
                            >
                                How to Get an NF3 Basketball
                            </Typography>
                            <Typography color="#FFCA21" marginTop={2}>
                                Pressing Reserve does not guarantee an NF3 Basketball. Only the very first person will
                                successfully reserve an NFT.
                            </Typography>
                            <Typography fontSize={16} fontWeight={600} marginTop={2.5}>
                                How this works:
                            </Typography>
                            <ol style={{ marginTop: 0, paddingLeft: 18 }}>
                                <li>Connect your Wallet</li>
                                <li>For every three-point shot, nine free NF3 Basketballs can be reserved</li>
                                <li>
                                    Accept{' '}
                                    <Link href="/legal/terms-and-conditions" passHref>
                                        <a rel="noopener noreferrer">
                                            <Typography
                                                color="#FFCA21"
                                                display="inline"
                                            >{`Terms & Conditions`}</Typography>
                                        </a>
                                    </Link>
                                    ,{' '}
                                    <Link href="https://account.underarmour.com/en-us/privacy" passHref>
                                        <a target="_blank" rel="noopener noreferrer">
                                            <Typography color="#FFCA21" display="inline">
                                                Privacy Policy
                                            </Typography>
                                        </a>
                                    </Link>
                                    , and{' '}
                                    <Link href="/legal/nft-ownership-agreement" passHref>
                                        <a rel="noopener noreferrer">
                                            <Typography color="#FFCA21" display="inline">
                                                NFT Ownership Agreement
                                            </Typography>
                                        </a>
                                    </Link>{' '}
                                    and Press "Reserve"
                                </li>
                                <li>
                                    Whoever reserves the Basketball first will be able to claim their free NF3
                                    Basketball mint one hour after the game in the section{` `}
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
                                    Curry Brand NF3 Basketball
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack alignItems="flex-start">
                            {/* <Typography fontSize={{ xs: 48, sm: 64, md: 92 }} fontWeight={700} lineHeight={1.1}>
                                NF3 Counter
                            </Typography>
                            <Typography
                                maxWidth={600}
                                fontSize={{ xs: 16, sm: 24, md: 32 }}
                                fontWeight={600}
                                lineHeight={1.1}
                                marginTop={3}
                            >
                                For every three-point shot Stephen Curry makes in the Playoffs, three new NF3 Basketball
                                mints are created.
                            </Typography> */}
                            <Grid container marginTop={{ xs: 3.5, md: 6 }} columnSpacing={2}>
                                <Grid item xs={6}>
                                    <SupplyBox
                                        amount={gameMoreInfo[0]}
                                        label="Three-Points Scored"
                                        bgColor="#1B1C22"
                                        headColor="#FFCA21"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <SupplyBox
                                        amount={gameMoreInfo[1]}
                                        label="Available to Reserve"
                                        bgColor="#1B1C22"
                                        headColor="#979797"
                                    />
                                </Grid>
                            </Grid>
                            <Stack marginTop={4}>
                                <Typography
                                    fontSize={32}
                                    fontWeight={800}
                                    textTransform="uppercase"
                                    className="neueplak_condensed"
                                >
                                    Claim Your NF3 Basketball
                                </Typography>
                                <ol style={{ marginTop: 0, paddingLeft: 18 }}>
                                    <li>Connect Metamask Wallet</li>
                                    <li>When three-pointer score is made, click reserve (in the box above)</li>
                                    <li>
                                        If you have successfully reserved an NF3 Basketball, press "Claim"{' '}
                                        <span style={{ fontWeight: 700 }}>(one hour after the game)</span>
                                    </li>
                                </ol>
                                <Typography fontSize={16} fontWeight={400} marginTop={1}>
                                    *Only one NF3 Basketball is redeemable per Wallet per game
                                    <br></br>
                                    *Make sure you have enough Ethereum in your Wallet to pay for gas fees
                                </Typography>
                            </Stack>
                            <Typography fontSize={32} fontWeight={700} marginTop={4}>
                                PRICE: FREE{' '}
                                <Typography fontSize={16} fontWeight={700} display="inline">
                                    (+GAS FEE)
                                </Typography>
                            </Typography>
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
                                        {claimState === 3 ? (
                                            <Typography fontWeight={600}>
                                                You have claimed your NF3 Basketball, please check your{' '}
                                                <Link href="https://opensea.io/collection/nf3-basketball" passHref>
                                                    <a target="_blank" rel="noopener noreferrer">
                                                        <Typography fontWeight={600} color="#FFCA21" display="inline">
                                                            Opensea
                                                        </Typography>
                                                    </a>
                                                </Link>{' '}
                                                profile to check if the NF3 Basketball is in your wallet
                                            </Typography>
                                        ) : claimState === 4 ? (
                                            <Typography fontWeight={600} color="#FF2121">
                                                Claim Unsuccessful
                                            </Typography>
                                        ) : !!unclaimedNFTInfo.length ? (
                                            <Typography fontSize={16} fontWeight={600}>
                                                You have{' '}
                                                <Typography
                                                    fontSize={16}
                                                    fontWeight={600}
                                                    color="#FFCA21"
                                                    display="inline"
                                                >
                                                    {`${unclaimedNFTInfo.length} reserved NF3 Basketball`}
                                                </Typography>
                                            </Typography>
                                        ) : (
                                            <Typography fontSize={16} fontWeight={600}>
                                                You do not have any reserved NF3 Basketballs
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
                    <Stack marginY={{ xs: 6, md: 9 }} spacing={4} sx={{ overflowY: 'hidden', overflowX: 'auto' }}>
                        <Typography
                            fontSize={32}
                            fontWeight={800}
                            whiteSpace="nowrap"
                            textTransform="uppercase"
                            className="neueplak_condensed"
                        >
                            NF3 Basketball Winners
                        </Typography>
                        <Grid minWidth={480} container rowGap={3}>
                            <Grid item container columns={{ xs: 7, md: 14 }}>
                                <Grid item xs={1}>
                                    <TblHeaderCellTypo>#</TblHeaderCellTypo>
                                </Grid>
                                <Grid item xs={3}>
                                    <TblHeaderCellTypo>NFT Name</TblHeaderCellTypo>
                                </Grid>
                                <Grid item xs={4} display={{ xs: 'none', md: 'block' }}>
                                    <TblHeaderCellTypo>Date/Time Updated</TblHeaderCellTypo>
                                </Grid>
                                <Grid item xs={3} md={4}>
                                    <TblHeaderCellTypo>Wallet Address</TblHeaderCellTypo>
                                </Grid>
                                <Grid item xs={2} display={{ xs: 'none', md: 'block' }}>
                                    <TblHeaderCellTypo>Status</TblHeaderCellTypo>
                                </Grid>
                            </Grid>
                            <Grid item xs={14}>
                                <Box width="100%" height="1px" sx={{ background: '#32343F' }}></Box>
                            </Grid>
                            {(viewAll
                                ? [...basketballWinners].reverse()
                                : [...basketballWinners].reverse().slice(0, 6)
                            ).map((item, index) => (
                                <RaffleWinerItem
                                    data={item}
                                    index={basketballWinners.length - index}
                                    key={`raffle-winner-key${index}`}
                                />
                            ))}
                            <PrimaryBtn
                                sx={{ width: 120, height: 34, marginX: 'auto', fontSize: 14, padding: '2px 16px 6px' }}
                                onClick={() => setViewAll(!viewAll)}
                            >
                                {viewAll ? 'View Less' : 'View All'}
                            </PrimaryBtn>
                        </Grid>
                    </Stack>
                </Container>
            </Box>

            <Dialog
                open={reserveState === 2 || claimState === 2}
                maxWidth="lg"
                PaperProps={{
                    sx: {
                        padding: 4,
                        background: 'none'
                    }
                }}
            >
                <CircularProgress />
            </Dialog>
        </>
    );
};

export default CurryCounterPageContainer;
