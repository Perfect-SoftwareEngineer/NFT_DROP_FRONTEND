import React, { useState, useEffect } from 'react';
import { Stack, Box, Grid, Typography } from '@mui/material';
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

const MixologyPageContainer: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();
    const { active, account, library, connector, activate, deactivate } = useWeb3React();

    const [basketballBalance, setBasketballBalance] = useState<number>(0);
    const [serumBalance, setSerumBalance] = useState<number>(0);

    const [ownedNFTTokensList, setOwnedNFTTokensList] = useState<any[]>([]);
    const [basketballToken, setBasketballToken] = useState<BasketballTokenInfoType>(basketballTokenData);
    const [serumTokensList, setSerumTokensList] = useState<SerumTokenInfoType[]>(serumTokenInfoData);
    const [totalSerumTokensCount, setTotalSerumTokensCount] = useState<number>(0);

    React.useEffect(() => {
        setAppState({
            ...appState,
            mixologyCurStep: 0,
            selectedBasketball: false,
            selectedSerumCount: {},
            selectedSerumId: [],
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
        }

        getTokensData();
    }, [ownedNFTTokensList]);

    const fuseEvolve = async () => {
        if (account) {
            console.log(appState.selectedSerumId, appState.selectedSerumId.length);

            const basketballContract = new library.eth.Contract(
                BasketballABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? process.env.NEXT_PUBLIC_MAINNET_BASKETBALL_CONTRACT_ADDRESS
                    : process.env.NEXT_PUBLIC_TESTNET_BASKETBALL_CONTRACT_ADDRESS
            );

            const serumContract = new library.eth.Contract(
                SerumABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? process.env.NEXT_PUBLIC_MAINNET_SERUM_CONTRACT_ADDRESS
                    : process.env.NEXT_PUBLIC_TESTNET_SERUM_CONTRACT_ADDRESS
            );

            const basketballHeadContract = new library.eth.Contract(
                BasketballHeadABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? process.env.NEXT_PUBLIC_MAINNET_BASKETBALLHEAD_CONTRACT_ADDRESS
                    : process.env.NEXT_PUBLIC_TESTNET_BASKETBALLHEAD_CONTRACT_ADDRESS
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

            let IsSerumApproved = await serumContract.methods
                .isApprovedForAll(account, basketballHeadContractAddress)
                .call({ from: account });

            if (!IsSerumApproved)
                await serumContract.methods
                    .setApprovalForAll(basketballHeadContractAddress, true)
                    .send({ from: account });

            console.log(IsBasketballApproved, IsSerumApproved);

            basketballHeadContract.methods
                .mint(1, appState.selectedSerumId, appState.selectedSerumId.length)
                .send({ from: account, value: 0 })
                .then()
                .catch((e: any) => {});

            // gen3DCreate(account, appState.selectedSerumId)
            //     .then(async(response: any) => {
            //         console.log('gen3DCreate response:', response);
            //     })
            //     .catch((error: any) => {
            //         console.log('gen3DCreate error:', error);
            //     });

            setAppState({ ...appState, mixologyCurStep: appState.mixologyCurStep + 1 });
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
                            Select 1 Basketball and 3 Serums to create a new NFT. The fiinal product will look different
                            depending on selected items.
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
                    <MixologyNavBar fuseEvolve={fuseEvolve} />
                </>
            ) : (
                <Stack height="calc(100vh - 222px)" justifyContent="center">
                    <FuseSuccess />
                </Stack>
            )}
        </>
    );
};

export default MixologyPageContainer;
