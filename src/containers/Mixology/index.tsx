import React, { useState, useEffect } from 'react';
import { Stack, Box, Grid, Typography, Dialog, CircularProgress } from '@mui/material';
import Container from '../Container';
import CounterBox from '../../components/CounterBox';
import StepBox from '../../components/Mixology/StepBox';
import StepBoxMobile from '../../components/Mixology/StepBox/Mobile';
import { useAppContext } from '../../context/AppContext';
import MixologyNavBar from './Navbar';
import NotWalletConnect from './NotWalletConnect';
import NotOwnBasketball from './NotOwnBasketball';
import SelectBasketball from './SelectBasketball';
import NotOwnSerum from './NotOwnSerum';
import SelectSerum from './SelectSerum';
import FuseEvolve from './FuseEvolve';
import FuseSuccess from './FuseSuccess';
import { useWeb3React } from '@web3-react/core';
import BasketballABI from '../../lib/ABI/BasketBall.json';
import BasketballHeadABI from '../../lib/ABI/BasketBallHead.json';
import SerumABI from '../../lib/ABI/Serum.json';
import { getLocker } from '../../services/api/thelab';
import { getBasketballInfo, getSerumTokenCount } from '../../services/thelab';
import { BasketballTokenInfoType, SerumTokenInfoType } from '../../types';
import basketballTokenData from '../../constants/basketballTokenData';
import { serumTokenInfoData } from '../../constants/serumTokenData';
import { gen3DCreate } from '../../services/api/mixology';
import { BigNumber } from '@ethersproject/bignumber';
import FuseConfirmBox from '../../components/Mixology/FuseConfirmBox';
import OneTimeApprovalBox from '../../components/Mixology/OneTimeApprovalBox';
import WaitingDlg from '../../components/WaitingDlg';

enum FuseStatus {
    INIT,
    IN_FUSE,
    FUSE_FAILED,
    FUSE_SUCCESS
}

const MixologyPageContainer: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();
    const { active, account, library, connector, activate, deactivate } = useWeb3React();

    const [basketballBalance, setBasketballBalance] = useState<number>(0);
    const [serumBalance, setSerumBalance] = useState<number>(0);
    const [balanceLoadedFromSC, setBalanceLoadedFromSC] = useState<boolean>(false);

    const [ownedNFTTokensList, setOwnedNFTTokensList] = useState<any[]>([]);
    const [basketballToken, setBasketballToken] = useState<BasketballTokenInfoType>(basketballTokenData);
    const [serumTokensList, setSerumTokensList] = useState<SerumTokenInfoType[]>(serumTokenInfoData);
    const [totalSerumTokensCount, setTotalSerumTokensCount] = useState<number>(0);
    const [balanceLoadedFromBE, setBalanceLoadedFromBE] = useState<boolean>(false);

    const [basketballApproving, setBasketballApproving] = useState<boolean>(false);
    const [serumApproving, setSerumApproving] = useState<boolean>(false);

    const [fuseState, setFuseState] = useState<FuseStatus>(FuseStatus.INIT);

    const [nf3Approved, setNf3Approved] = useState<boolean>(false);
    const [serumApproved, setSerumApproved] = useState<boolean>(false);

    const [showNF3OneTimeApproval, setShowNF3OneTimeApproval] = useState<boolean>(false);
    const [showSerumOneTimeApproval, setShowSerumOneTimeApproval] = useState<boolean>(false);
    const [showFuseConfirmDlg, setShowFuseConfirmDlg] = useState<boolean>(false);

    React.useEffect(() => {
        setAppState({
            ...appState,
            mixologyCurStep: 0,
            selectedBasketball: false,
            selectedSerumCount: {},
            selectedSerumId: []
        });
    }, []);

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

            let balance2 = 0;
            for (let i = 1; i <= 11; i++) {
                const temp = await nftContract1.methods.balanceOf(account, i).call({ from: account });
                balance2 = balance2 + parseInt(temp);
            }
            setSerumBalance(balance2);

            setBalanceLoadedFromSC(true);

            setNf3Approved(JSON.parse(localStorage.getItem(`${account}_nf3_one_time_approved`)!));
            setSerumApproved(JSON.parse(localStorage.getItem(`${account}_serum_one_time_approved`)!));
        }

        if (account) {
            updateAppState();
        }
    }, [account]);

    React.useEffect(() => {
        async function updateAppState() {
            if (account) {
                getLocker(account)
                    .then((response: any[]) => {
                        // console.log('getLocker response:', response);
                        setOwnedNFTTokensList(response);
                    })
                    .catch((error) => {
                        setOwnedNFTTokensList([]);
                    });
            }
        }

        if (account) {
            updateAppState();
        }
    }, [account]);

    React.useEffect(() => {
        async function getTokensData() {
            let basketballInfo = await getBasketballInfo(ownedNFTTokensList);

            // get basketball tokens info
            let newBasketballToken = { ...basketballToken, count: basketballInfo.count, image: basketballInfo.image };
            setBasketballToken(newBasketballToken);

            // get serum tokens info
            let newSerumTokenList = serumTokenInfoData.map((item) => {
                let count = getSerumTokenCount(ownedNFTTokensList, item.tokenId);
                return { ...item, count };
            });
            setSerumTokensList(newSerumTokenList);

            let totalSerumTokenCnt = newSerumTokenList.reduce((prev, cur) => prev + cur.count, 0);
            setTotalSerumTokensCount(totalSerumTokenCnt);

            setBalanceLoadedFromBE(true);
        }

        getTokensData();
    }, [ownedNFTTokensList]);

    const onNF3Approve = () => {
        localStorage.setItem(`${account}_nf3_one_time_approved`, JSON.stringify(true));
        setNf3Approved(true);

        setShowNF3OneTimeApproval(false);
        onSelectNF3Basketball();
    };

    const onSelectNF3Basketball = async () => {
        setBasketballApproving(true);

        const basketballContract = new library.eth.Contract(
            BasketballABI,
            process.env.NEXT_PUBLIC_ENV == 'production'
                ? process.env.NEXT_PUBLIC_MAINNET_BASKETBALL_CONTRACT_ADDRESS
                : process.env.NEXT_PUBLIC_TESTNET_BASKETBALL_CONTRACT_ADDRESS
        );

        const basketballHeadContractAddress =
            process.env.NEXT_PUBLIC_ENV == 'production'
                ? process.env.NEXT_PUBLIC_MAINNET_BASKETBALLHEAD_CONTRACT_ADDRESS
                : process.env.NEXT_PUBLIC_TESTNET_BASKETBALLHEAD_CONTRACT_ADDRESS;

        let IsBasketballApproved = await basketballContract.methods
            .isApprovedForAll(account, basketballHeadContractAddress)
            .call({ from: account });

        if (!IsBasketballApproved)
            await basketballContract.methods
                .setApprovalForAll(basketballHeadContractAddress, true)
                .send({ from: account });

        setBasketballApproving(false);

        setAppState({ ...appState, mixologyCurStep: appState.mixologyCurStep + 1 });
    };

    const onSerumApprove = () => {
        localStorage.setItem(`${account}_serum_one_time_approved`, JSON.stringify(true));
        setSerumApproved(true);

        setShowSerumOneTimeApproval(false);
        onSelectSerum();
    };

    const onSelectSerum = async () => {
        setSerumApproving(true);

        const serumContract = new library.eth.Contract(
            SerumABI,
            process.env.NEXT_PUBLIC_ENV == 'production'
                ? process.env.NEXT_PUBLIC_MAINNET_SERUM_CONTRACT_ADDRESS
                : process.env.NEXT_PUBLIC_TESTNET_SERUM_CONTRACT_ADDRESS
        );

        const basketballHeadContractAddress =
            process.env.NEXT_PUBLIC_ENV == 'production'
                ? process.env.NEXT_PUBLIC_MAINNET_BASKETBALLHEAD_CONTRACT_ADDRESS
                : process.env.NEXT_PUBLIC_TESTNET_BASKETBALLHEAD_CONTRACT_ADDRESS;

        let IsSerumApproved = await serumContract.methods
            .isApprovedForAll(account, basketballHeadContractAddress)
            .call({ from: account });

        if (!IsSerumApproved)
            await serumContract.methods.setApprovalForAll(basketballHeadContractAddress, true).send({ from: account });

        setSerumApproving(false);

        setAppState({ ...appState, mixologyCurStep: appState.mixologyCurStep + 1 });
    };

    const fuseEvolve = async () => {
        if (account) {
            setFuseState(FuseStatus.IN_FUSE);
            setShowFuseConfirmDlg(false);

            // console.log(appState.selectedSerumId, appState.selectedSerumId.length);

            const basketballHeadContract = new library.eth.Contract(
                BasketballHeadABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? process.env.NEXT_PUBLIC_MAINNET_BASKETBALLHEAD_CONTRACT_ADDRESS
                    : process.env.NEXT_PUBLIC_TESTNET_BASKETBALLHEAD_CONTRACT_ADDRESS
            );

            // console.log(IsBasketballApproved, IsSerumApproved);

            let result = await gen3DCreate(account, appState.selectedSerumId, appState.jwtToken);
            // .then(async (response: any) => {
            //     console.log('gen3DCreate response:', response);
            // })
            // .catch((error: any) => {
            //     console.log('gen3DCreate error:', error);
            // });
            // console.log('gen3DCreate result:', result);

            basketballHeadContract.methods
                .mint(
                    BigNumber.from((result.tokenId as number).toString()),
                    1,
                    appState.selectedSerumId,
                    appState.selectedSerumId.length
                )
                .send({ from: account, value: 0 })
                .then(() => {
                    setFuseState(FuseStatus.FUSE_SUCCESS);
                    setAppState({ ...appState, mixologyCurStep: appState.mixologyCurStep + 1 });
                })
                .catch((e: any) => {
                    setFuseState(FuseStatus.FUSE_FAILED);
                });
        }
    };

    return (
        <>
            {!account ? (
                <NotWalletConnect sx={{ marginTop: 10 }} />
            ) : appState.mixologyCurStep < 3 ? (
                <>
                    <Container sx={{ paddingY: 8 }}>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            justifyContent="space-between"
                            alignItems={{ xs: 'flex-start', md: 'center' }}
                            spacing={2}
                        >
                            <Typography fontSize={48} fontWeight={800} lineHeight={1} className="neueplak_condensed">
                                MIXOLOGY ROOM
                            </Typography>
                            <Stack
                                direction="row"
                                width={{ xs: '100%', md: 'auto' }}
                                spacing={2}
                                justifyContent="flex-end"
                            >
                                <CounterBox title="MY NF3 BASKETBALLS" value={basketballBalance} />
                                <CounterBox title="MY SERUMS" value={serumBalance} />
                            </Stack>
                        </Stack>
                        <Typography marginTop={4}>
                            Select 1 NF3 basketball and up to 3 serums to create your unique avatar.
                        </Typography>
                        <Grid container marginTop={5} columnSpacing={8} rowGap={4}>
                            <Grid item xs={12} md={4} sx={{ overflowY: 'hidden', overflowX: 'auto' }}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={2}
                                    paddingBottom={3}
                                    marginBottom={8}
                                    display={{ xs: 'flex', md: 'none' }}
                                >
                                    <StepBoxMobile step={0} />
                                    <Box width="100%" height={2} sx={{ background: '#A5A5A5' }}></Box>
                                    <StepBoxMobile step={1} />
                                    <Box width="100%" height={2} sx={{ background: '#A5A5A5' }}></Box>
                                    <StepBoxMobile step={2} />
                                </Stack>
                                <Stack
                                    spacing={2}
                                    paddingBottom={{ xs: 0, md: 20 }}
                                    display={{ xs: 'none', md: 'flex' }}
                                >
                                    <StepBox step={0} />
                                    <StepBox step={1} />
                                    <StepBox step={2} />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                {appState.mixologyCurStep === 0 &&
                                    (basketballToken.count > 0 ? (
                                        <SelectBasketball data={basketballToken} />
                                    ) : (
                                        <NotOwnBasketball />
                                    ))}
                                {appState.mixologyCurStep === 1 &&
                                    (totalSerumTokensCount > 0 ? (
                                        <SelectSerum data={serumTokensList} />
                                    ) : (
                                        <NotOwnSerum />
                                    ))}
                                {appState.mixologyCurStep === 2 && <FuseEvolve />}
                            </Grid>
                        </Grid>
                    </Container>
                    <MixologyNavBar
                        onSelectNF3BasketballNext={() => {
                            nf3Approved ? onSelectNF3Basketball() : setShowNF3OneTimeApproval(true);
                        }}
                        onSelectSerumNext={() => {
                            serumApproved ? onSelectSerum() : setShowSerumOneTimeApproval(true);
                        }}
                        onFuseEvolve={() => setShowFuseConfirmDlg(true)}
                    />
                </>
            ) : (
                <Stack height="calc(100vh - 72px)">
                    <FuseSuccess />
                </Stack>
            )}
            <Dialog
                open={showFuseConfirmDlg}
                onClose={() => setShowFuseConfirmDlg(false)}
                maxWidth="lg"
                PaperProps={{
                    sx: {
                        padding: { xs: 2, md: 8 },
                        background: 'none',
                        boxShadow: 'none'
                    }
                }}
            >
                <FuseConfirmBox onFuse={fuseEvolve} onClose={() => setShowFuseConfirmDlg(false)} />
            </Dialog>
            <Dialog
                open={!nf3Approved && showNF3OneTimeApproval}
                onClose={() => setShowNF3OneTimeApproval(false)}
                maxWidth="lg"
                PaperProps={{
                    sx: {
                        padding: { xs: 2, md: 8 },
                        background: 'none',
                        boxShadow: 'none'
                    }
                }}
            >
                <OneTimeApprovalBox
                    type={0}
                    onContinue={onNF3Approve}
                    onClose={() => setShowNF3OneTimeApproval(false)}
                />
            </Dialog>
            <Dialog
                open={!serumApproved && showSerumOneTimeApproval}
                onClose={() => setShowSerumOneTimeApproval(false)}
                maxWidth="lg"
                PaperProps={{
                    sx: {
                        padding: { xs: 2, md: 8 },
                        background: 'none',
                        boxShadow: 'none'
                    }
                }}
            >
                <OneTimeApprovalBox
                    type={1}
                    onContinue={onSerumApprove}
                    onClose={() => setShowSerumOneTimeApproval(false)}
                />
            </Dialog>
            <WaitingDlg
                open={
                    !!account &&
                    (!balanceLoadedFromSC ||
                        !balanceLoadedFromBE ||
                        basketballApproving ||
                        serumApproving ||
                        fuseState === FuseStatus.IN_FUSE)
                }
            />
        </>
    );
};

export default MixologyPageContainer;
