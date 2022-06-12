import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import BasketballHeadABI from '../../lib/ABI/BasketBallHead.json';
import { Stack, Box, Grid, Typography, Divider } from '@mui/material';
import Container from '../Container';
import SupplyBox from '../../components/CurryShop/SupplyBox';
import CounterBox from '../../components/CounterBox';
import NF3GCFClaimBox from '../../components/CurryShop/NF3Basketball/GCFClaimBox';
import NF3MintlistMintBox from '../../components/CurryShop/NF3Basketball/MintlistMintBox';
import NF3GeneralMintBox from '../../components/CurryShop/NF3Basketball/GeneralMintBox';
import SerumGCFClaimBox from '../../components/CurryShop/Serums/GCFClaimBox';
import SerumMintlistMintBox from '../../components/CurryShop/Serums/MintlistMintBox';
import SerumGeneralMintBox from '../../components/CurryShop/Serums/GeneralMintBox';
import { claimNF3GCF, claimSerumGCF, claimNF3CommunityNFT, claimSerumCommunityNFT } from '../../services/api/curryshop';
import NF3GCFInfoBox from '../../components/CurryShop/NF3InfoBox/GCFBox';
import SerumStatusBox from '../../components/CurryShop/SerumStatusBox';
import { ConnectMetamaskBtn, CategoryBtn, PhaseTypo } from './styles';
import Image from 'next/image';
import MetamaskImg from '../../assets/metamask.png';
import { connect } from '../../web3/connect';
import { useAppContext } from '../../context/AppContext';

enum StepType {
    GCF_NF3,
    MINTLIST_NF3,
    MINTLIST_SERUM,
    GCF_SERUM,
    GENERALMINT_NF3,
    GENERALMINT_SERUM,
}

const CurryShopPageContainer: React.FC = (): JSX.Element => {
    const { active, account, library, activate } = useWeb3React();
    const [appState, setAppState] = useAppContext();

    const [curStep, setCurStep] = useState<StepType>(StepType.GCF_NF3);

    const [balance, setBalance] = useState<number>(0);
    const [supplyLeft, setSupplyLeft] = useState<number>(0);

    const [dropPhase, setDropPhase] = useState<number>(0);

    const [nf3GCFOwnedCount, setNF3GCFOwnedCount] = useState<number>(0);
    const [nf3GCFClaimHexProof, setNF3GCFClaimHexProof] = React.useState<any[]>([]);

    const [serumGCFData, setSerumGCFData] = useState<any>();

    const [nf3CommunityOwnedCount, setNF3CommunityOwnedCount] = useState<number>(0);
    const [nf3CommunityClaimHexProof, setNF3CommunityClaimHexProof] = React.useState<any[]>([]);

    const [serumCommunityOwnedCount, setSerumCommunityOwnedCount] = useState<number>(0);
    const [serumCommunityClaimHexProof, setSerumCommunityClaimHexProof] = React.useState<any[]>([]);

    const [needUpdateInfo, setNeedUpdateInfo] = useState<boolean>(true);

    React.useEffect(() => {
        async function updateAppState() {
            const nftContract = new library.eth.Contract(
                BasketballHeadABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? '0x75615677d9cd50cb5D9660Ffb84eCd4d333E0B76'
                    : '0x22899ed83366ef867265A98413f1f332aD4Aa168'
            );
            let _dropPhase = await nftContract.methods.dropPhase().call({ from: account });
            console.log('_dropPhase:', _dropPhase);
            // let _dropPhase = '3';

            if (parseInt(_dropPhase) === 1) setCurStep(StepType.GCF_NF3);
            else if (parseInt(_dropPhase) === 2) setCurStep(StepType.MINTLIST_NF3);
            else if (parseInt(_dropPhase) === 3) setCurStep(StepType.GENERALMINT_NF3);

            setDropPhase(parseInt(_dropPhase));

            const balance = await nftContract.methods.balanceOf(account, 1).call({ from: account });
            setBalance(parseInt(balance));

            const maxsupply = await nftContract.methods.maxsupply().call({ from: account });
            const totalsupply = await nftContract.methods.totalsupply().call({ from: account });
            const totalReservedSupply = await nftContract.methods.totalReservedSupply().call({ from: account });

            setSupplyLeft(parseInt(maxsupply) - parseInt(totalsupply) - parseInt(totalReservedSupply));
        }

        if (account && needUpdateInfo) {
            updateAppState();

            setNeedUpdateInfo(false);
        }
    }, [account, needUpdateInfo]);

    React.useEffect(() => {
        async function updateAppState() {
            const nftContract = new library.eth.Contract(
                BasketballHeadABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? '0x75615677d9cd50cb5D9660Ffb84eCd4d333E0B76'
                    : '0x22899ed83366ef867265A98413f1f332aD4Aa168'
            );

            console.log('curStep:', curStep);

            if (curStep === StepType.GCF_NF3) {
                const NF3GCFFlag = await nftContract.methods.mintedForGCF(account).call({ from: account });

                if (NF3GCFFlag == true) {
                    setNF3GCFOwnedCount(0);
                    setNF3GCFClaimHexProof([]);
                } else {
                    if (account) {
                        const response = await claimNF3GCF(account);
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
                        console.log('claimSerumGCF:', response);
                        setSerumGCFData(response);
                    }
                }
            } else if (curStep === StepType.MINTLIST_NF3 || curStep === StepType.GENERALMINT_NF3) {
                const NF3CommunityFlag = await nftContract.methods.mintedForCommunity(account).call({ from: account });

                if (NF3CommunityFlag == true) {
                    setNF3CommunityOwnedCount(0);
                    setNF3CommunityClaimHexProof([]);
                } else {
                    if (account) {
                        const response = await claimNF3CommunityNFT(account);
                        setNF3CommunityOwnedCount(response.quantity);
                        setNF3CommunityClaimHexProof(response.hexProof);
                    }
                }
            } else if (curStep === StepType.MINTLIST_SERUM || curStep === StepType.GENERALMINT_SERUM) {
                const SerumCommunityFlag = true;

                if (SerumCommunityFlag == true) {
                    setSerumCommunityOwnedCount(0);
                    setSerumCommunityClaimHexProof([]);
                } else {
                    if (account) {
                        const response = await claimSerumCommunityNFT(account);
                        setSerumCommunityOwnedCount(response.quantity);
                        setSerumCommunityClaimHexProof(response.hexProof);
                    }
                }
            }
        }

        if (account) updateAppState();
    }, [curStep]);

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
                        amountLeft={supplyLeft}
                        communityOwnedCount={nf3CommunityOwnedCount}
                        communityClaimHexProof={nf3CommunityClaimHexProof}
                        setNeedUpdateInfo={setNeedUpdateInfo}
                    />
                )}
                {curStep === StepType.MINTLIST_SERUM && (
                    <SerumMintlistMintBox
                        communityOwnedCount={serumCommunityOwnedCount}
                        communityClaimHexProof={serumCommunityClaimHexProof}
                        setNeedUpdateInfo={setNeedUpdateInfo}
                    />
                )}
                {curStep === StepType.GCF_SERUM && (
                    <SerumGCFClaimBox gcfData={serumGCFData} setNeedUpdateInfo={setNeedUpdateInfo} />
                )}
                {curStep === StepType.GENERALMINT_NF3 && (
                    <NF3GeneralMintBox amountLeft={supplyLeft} setNeedUpdateInfo={setNeedUpdateInfo} />
                )}
                {curStep === StepType.GENERALMINT_SERUM && (
                    <SerumGeneralMintBox amountLeft={supplyLeft} setNeedUpdateInfo={setNeedUpdateInfo} />
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
                        <CounterBox title="MY NF3 BASKETBALLS" value={balance} />
                        <CounterBox title="MY SERUMS" value={0} />
                    </Stack>
                </Stack>
                <Typography marginTop={4}>
                    Curry Shop is where you get the 'goods.' Claim or purchase your NF3 Basketball, along with Serums
                    from our communities.
                </Typography>
                <Grid container columnSpacing={4} rowGap={4} marginTop={4}>
                    <Grid item xs={12} md={5}>
                        {account && selectBox()}
                    </Grid>
                    <Grid item xs={12} md={7}>
                        {account ? (
                            dropBox()
                        ) : (
                            <Stack marginLeft={3}>
                                <Typography fontSize={48} fontWeight={700} lineHeight={1.1}>
                                    To Get Started, Connect MetaMask Wallet
                                </Typography>
                                <Typography marginTop={4}>
                                    Make sure to download Metamask. Once you create or connect your MetaMask account,
                                    connect your wallet.
                                </Typography>
                                <ConnectMetamaskBtn sx={{ marginTop: 5 }} onClick={() => connect(activate)}>
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
                        )}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default CurryShopPageContainer;
