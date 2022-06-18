import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import BasketballABI from '../../lib/ABI/BasketBall.json';
import SerumABI from '../../lib/ABI/Serum.json';
import { Stack, Box, Grid, Typography, Divider, Dialog } from '@mui/material';
import Container from '../Container';
import SupplyBox from '../../components/CurryShop/SupplyBox';
import CounterBox from '../../components/CounterBox';
import NF3GCFClaimBox from '../../components/CurryShop/NF3Basketball/GCFClaimBox';
import NF3MintlistMintBox from '../../components/CurryShop/NF3Basketball/MintlistMintBox';
import NF3GeneralMintBox from '../../components/CurryShop/NF3Basketball/GeneralMintBox';
import SerumGCFClaimBox from '../../components/CurryShop/Serums/GCFClaimBox';
import SerumMintlistMintBox from '../../components/CurryShop/Serums/MintlistMintBox';
import SerumGeneralMintBox from '../../components/CurryShop/Serums/GeneralMintBox';
import { claimNF3GCF, claimSerumGCF, claimNF3MintlistNFT, claimSerumMintlistNFT } from '../../services/api/curryshop';
import NF3GCFInfoBox from '../../components/CurryShop/NF3InfoBox/GCFBox';
import SerumStatusBox from '../../components/CurryShop/SerumStatusBox';
import { ConnectWalletBtn, CategoryBtn, PhaseTypo, WatchVideoBtn } from './styles';
import Image from 'next/image';
import { connect } from '../../web3/connect';
import { useAppContext } from '../../context/AppContext';
import { usePrevious } from 'react-use';

enum StepType {
    NONE,
    GCF_NF3,
    MINTLIST_NF3,
    MINTLIST_SERUM,
    GCF_SERUM,
    GENERALMINT_NF3,
    GENERALMINT_SERUM
}

const CurryShopPageContainer: React.FC = (): JSX.Element => {
    const { active, account, library, activate } = useWeb3React();
    const [appState, setAppState] = useAppContext();

    const [curStep, setCurStep] = useState<StepType>(StepType.NONE);
    const curStepPrev = usePrevious(curStep);

    const [basketballBalance, setBasketballBalance] = useState<number>(0);
    const [serumBalance, setSerumBalance] = useState<number>(0);
    const [basketballSupplyLeft, setBasketballSupplyLeft] = useState<number>(0);

    const [dropPhase, setDropPhase] = useState<number>(0);

    const [nf3GCFOwnedCount, setNF3GCFOwnedCount] = useState<number>(0);
    const [nf3GCFClaimHexProof, setNF3GCFClaimHexProof] = React.useState<any[]>([]);

    const [serumGCFData, setSerumGCFData] = useState<any>();

    const [serumMintlistData, setSerumMintlistData] = useState<any>();

    const [nf3MintlistOwnedCount, setNF3MintlistOwnedCount] = useState<number>(0);
    const [nf3MintlistClaimHexProof, setNF3MintlistClaimHexProof] = React.useState<any[]>([]);

    const [needUpdateInfo, setNeedUpdateInfo] = useState<boolean>(true);

    const [watchVideo, setWatchVideo] = useState<boolean>(false);

    React.useEffect(() => {
        async function updateAppState() {
            const nftContract = new library.eth.Contract(
                BasketballABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? process.env.NEXT_PUBLIC_MAINNET_BASKETBALL_CONTRACT_ADDRESS
                    : process.env.NEXT_PUBLIC_TESTNET_BASKETBALL_CONTRACT_ADDRESS
            );
            let _dropPhase = await nftContract.methods.dropPhase().call({ from: account });
            // let _dropPhase = '3';
            console.log('_dropPhase:', _dropPhase);

            if (parseInt(_dropPhase) === 1) setCurStep(StepType.GCF_NF3);
            else if (parseInt(_dropPhase) === 2) setCurStep(StepType.MINTLIST_NF3);
            else if (parseInt(_dropPhase) === 3) setCurStep(StepType.GENERALMINT_NF3);

            setDropPhase(parseInt(_dropPhase));
        }

        if (account) {
            updateAppState();
        }
    }, [account]);

    React.useEffect(() => {
        async function updateAppState() {
            const nftContract = new library.eth.Contract(
                BasketballABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? process.env.NEXT_PUBLIC_MAINNET_BASKETBALL_CONTRACT_ADDRESS
                    : process.env.NEXT_PUBLIC_TESTNET_BASKETBALL_CONTRACT_ADDRESS
            );

            const nftContract1 = new library.eth.Contract(
                SerumABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? process.env.NEXT_PUBLIC_MAINNET_SERUM_CONTRACT_ADDRESS
                    : process.env.NEXT_PUBLIC_TESTNET_SERUM_CONTRACT_ADDRESS
            );

            const balance1 = await nftContract.methods.balanceOf(account, 1).call({ from: account });
            setBasketballBalance(parseInt(balance1));
            // console.log('balance1: ' + balance1);

            let balance2 = 0;
            for (let i = 1; i <= 11; i++) {
                const temp = await nftContract1.methods.balanceOf(account, i).call({ from: account });
                balance2 = balance2 + parseInt(temp);
            }
            // console.log('balance2: ' + balance2);
            setSerumBalance(balance2);

            const maxsupply1 = await nftContract.methods.maxsupply().call({ from: account });
            const totalsupply1 = await nftContract.methods.totalsupply().call({ from: account });
            const totalReservedSupply1 = await nftContract.methods.totalReservedSupply().call({ from: account });

            setBasketballSupplyLeft(parseInt(maxsupply1) - parseInt(totalsupply1) - parseInt(totalReservedSupply1));

            console.log('curStep:', curStep);

            if (curStep === StepType.GCF_NF3) {
                const NF3GCFFlag = await nftContract.methods.mintedForGCF(account).call({ from: account });
                if (NF3GCFFlag == true) {
                    setNF3GCFOwnedCount(0);
                    setNF3GCFClaimHexProof([]);
                } else {
                    if (account) {
                        const response = await claimNF3GCF(account);
                        console.log(account, response);
                        setNF3GCFOwnedCount(response.quantity);
                        setNF3GCFClaimHexProof(response.hexProof);
                    }
                }
            } else if (curStep === StepType.GCF_SERUM) {
                const SerumGCFFlag = true;

                /*if (SerumGCFFlag === true) {
                    setSerumGCFOwnedCount(0);
                    setSerumGCFClaimHexProof([]);
                } else*/ {
                    if (account) {
                        const response = await claimSerumGCF(account);
                        setSerumGCFData(response);
                    }
                }
            } else if (curStep === StepType.MINTLIST_NF3) {
                const NF3CommunityFlag = await nftContract.methods.mintedForCommunity(account).call({ from: account });

                if (NF3CommunityFlag == true) {
                    setNF3MintlistOwnedCount(0);
                    setNF3MintlistClaimHexProof([]);
                } else {
                    if (account) {
                        const response = await claimNF3MintlistNFT(account);
                        setNF3MintlistOwnedCount(response.quantity);
                        setNF3MintlistClaimHexProof(response.hexProof);
                    }
                }
            } else if (curStep === StepType.MINTLIST_SERUM) {
                if (account) {
                    const response = await claimSerumMintlistNFT(account);
                    setSerumMintlistData(response);
                }
            } else if (curStep === StepType.GENERALMINT_NF3) {
            } else if (curStep === StepType.GENERALMINT_SERUM) {
            }
        }

        if (account && (needUpdateInfo || curStep !== curStepPrev)) {
            updateAppState();

            setNeedUpdateInfo(false);
        }
    }, [account, curStep, needUpdateInfo]);

    const selectBox = () => {
        if (dropPhase === 1) {
            return <NF3GCFInfoBox jwtToken={appState.jwtToken} dropPhase={dropPhase} />;
        } else {
            return (
                <Stack spacing={4} marginRight={8}>
                    {dropPhase === 2 && (
                        <Stack spacing={3}>
                            <Typography fontSize={20} fontWeight={800} color="#969AA1">
                                MINTLISTS
                            </Typography>
                            <Stack spacing={1.5}>
                                <PhaseTypo
                                    onClick={() => setCurStep(StepType.MINTLIST_NF3)}
                                    selected={curStep === StepType.MINTLIST_NF3}
                                >
                                    NF3 Basketball
                                </PhaseTypo>
                                <PhaseTypo
                                    onClick={() => setCurStep(StepType.MINTLIST_SERUM)}
                                    selected={curStep === StepType.MINTLIST_SERUM}
                                >
                                    Serums
                                </PhaseTypo>
                            </Stack>
                            <Divider sx={{ borderColor: '#969AA1' }} />
                        </Stack>
                    )}
                    {dropPhase === 3 && (
                        <Stack spacing={3}>
                            <Typography fontSize={20} fontWeight={800} color="#969AA1">
                                GENERAL MINTING
                            </Typography>
                            <Stack spacing={1.5}>
                                <PhaseTypo
                                    onClick={() => setCurStep(StepType.GENERALMINT_NF3)}
                                    selected={curStep === StepType.GENERALMINT_NF3}
                                >
                                    NF3 Basketball
                                </PhaseTypo>
                                <PhaseTypo
                                    onClick={() => setCurStep(StepType.GENERALMINT_SERUM)}
                                    selected={curStep === StepType.GENERALMINT_SERUM}
                                >
                                    Serums
                                </PhaseTypo>
                            </Stack>
                            <Divider sx={{ borderColor: '#969AA1' }} />
                        </Stack>
                    )}
                    <Stack spacing={3}>
                        <Typography fontSize={20} fontWeight={800} color="#969AA1">
                            SERUM FREEBEES
                        </Typography>
                        <Stack spacing={1.5}>
                            <PhaseTypo
                                onClick={() => setCurStep(StepType.GCF_SERUM)}
                                selected={curStep === StepType.GCF_SERUM}
                            >
                                GCF Serums
                            </PhaseTypo>
                        </Stack>
                        <Divider sx={{ borderColor: '#969AA1' }} />
                    </Stack>
                    <Stack spacing={3}>
                        <Typography fontSize={20} fontWeight={800} color="#969AA1">
                            HOW IT WORKS
                        </Typography>
                        <WatchVideoBtn onClick={() => setWatchVideo(true)}>WATCH VIDEO</WatchVideoBtn>
                    </Stack>
                </Stack>
            );
        }
    };

    const dropBox = () => {
        if (!appState.jwtToken) return '';

        return (
            <>
                {curStep === StepType.GCF_NF3 && (
                    <NF3GCFClaimBox
                        gcfOwnedCount={nf3GCFOwnedCount}
                        gcfClaimHexProof={nf3GCFClaimHexProof}
                        setNeedUpdateInfo={setNeedUpdateInfo}
                    />
                )}
                {curStep === StepType.MINTLIST_NF3 && (
                    <NF3MintlistMintBox
                        amountLeft={basketballSupplyLeft}
                        communityOwnedCount={nf3MintlistOwnedCount}
                        communityClaimHexProof={nf3MintlistClaimHexProof}
                        setNeedUpdateInfo={setNeedUpdateInfo}
                    />
                )}
                {curStep === StepType.MINTLIST_SERUM && (
                    <SerumMintlistMintBox mintData={serumMintlistData} setNeedUpdateInfo={setNeedUpdateInfo} />
                )}
                {curStep === StepType.GCF_SERUM && (
                    <SerumGCFClaimBox mintData={serumGCFData} setNeedUpdateInfo={setNeedUpdateInfo} />
                )}
                {curStep === StepType.GENERALMINT_NF3 && (
                    <NF3GeneralMintBox amountLeft={basketballSupplyLeft} setNeedUpdateInfo={setNeedUpdateInfo} />
                )}
                {curStep === StepType.GENERALMINT_SERUM && (
                    <SerumGeneralMintBox setNeedUpdateInfo={setNeedUpdateInfo} />
                )}
            </>
        );
    };

    return (
        <>
            <Container sx={{ paddingY: 8, overflow: 'visible' }}>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', md: 'center' }}
                    spacing={2}
                >
                    <Typography fontSize={48} fontWeight={800} lineHeight={1} className="neueplak_condensed">
                        CURRY SHOP
                    </Typography>
                    <Stack direction="row" width={{ xs: '100%', md: 'auto' }} spacing={2} justifyContent="flex-end">
                        <CounterBox title="MY NF3 BASKETBALLS" value={basketballBalance} />
                        <CounterBox title="MY SERUMS" value={serumBalance} />
                    </Stack>
                </Stack>
                <Typography marginTop={4}>
                    Curry Shop is where you get the 'goods.' Claim or purchase your NF3 Basketball, along with Serums
                    from our communities.
                </Typography>
                <Grid container columnSpacing={4} rowGap={4} marginTop={4}>
                    {account ? (
                        <>
                            <Grid item xs={12} md={5}>
                                {selectBox()}
                            </Grid>
                            <Grid item xs={12} md={7}>
                                {dropBox()}
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs={12}>
                            <Stack alignItems="center" marginLeft={{ xs: 0, md: 3 }}>
                                <Typography fontSize={48} fontWeight={700} lineHeight={1.1} textAlign="center">
                                    To Get Started, Connect Your Wallet
                                </Typography>
                                <Stack width={{ xs: '80%', sm: '60%', md: 536 }} marginTop={4}>
                                    <Typography marginX="auto" textAlign="center">
                                        Make sure to download Metamask. Once you create or connect your MetaMask
                                        account, connect your wallet.
                                    </Typography>
                                    <ConnectWalletBtn
                                        sx={{ marginTop: 5, marginX: 'auto' }}
                                        onClick={() => connect(activate)}
                                    >
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
                                    <ConnectWalletBtn
                                        sx={{ marginTop: 2, marginX: 'auto' }}
                                        onClick={() => connect(activate, 'coinbase')}
                                    >
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
                                    <Stack alignItems="center" spacing={3} marginTop={5}>
                                        <Typography fontSize={20} fontWeight={800} color="#969AA1" lineHeight={1}>
                                            HOW IT WORKS
                                        </Typography>
                                        <WatchVideoBtn onClick={() => setWatchVideo(true)}>WATCH VIDEO</WatchVideoBtn>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Grid>
                    )}
                </Grid>
            </Container>
            <Dialog
                open={watchVideo}
                onClose={() => setWatchVideo(false)}
                maxWidth="lg"
                PaperProps={{
                    sx: {
                        padding: 0,
                        background: 'none',
                    },
                }}
            >
                <video autoPlay loop controls style={{ borderRadius: 16 }}>
                    <source src={'/assets/curryshop/how-it-works.MOV'} type="video/mp4" />
                </video>
            </Dialog>
        </>
    );
};

export default CurryShopPageContainer;
