import React, { useState, useEffect } from 'react';
import { Stack, Grid, Typography, Link } from '@mui/material';
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

const MixologyPageContainer: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();
    const { active, account, library, connector, activate, deactivate } = useWeb3React();

    // console.log('account:', account);

    return (
        <>
            {!account ? (
                <NotWalletConnect sx={{ marginTop: 10 }} />
            ) : appState.mixologyCurStep < 3 ? (
                <>
                    <Container sx={{ paddingY: 5 }}>
                        <Stack direction="row" spacing={2}>
                            <CounterBox title="MY BASKETBALLS" value={0} />
                            <CounterBox title="MY SERUMS" value={0} />
                        </Stack>
                        <Stack marginTop={4}>
                            <Typography fontSize={{ xs: 42, sm: 48 }} fontWeight={700}>
                                Mixology Room
                            </Typography>
                            <Typography fontSize={16} fontWeight={400} width={{ xs: '90%', md: '30%' }} marginTop={2}>
                                Select 1 Basketball and 3 Serums to create a new NFT. The fiinal product will look
                                different depending on selected items.
                            </Typography>
                        </Stack>
                        <Grid container marginTop={5} columnSpacing={8} rowGap={4}>
                            <Grid item xs={12} md={4}>
                                <Stack direction="row" marginBottom={8} display={{ xs: 'flex', md: 'none' }}>
                                    <StepBoxMobile step={0} />
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
                                    (appState.basketballsList.length > 0 ? <SelectBasketball /> : <NotOwnBasketball />)}
                                {appState.mixologyCurStep === 1 &&
                                    (appState.serumsList.length > 0 ? <SelectSerum /> : <NotOwnSerum />)}
                                {appState.mixologyCurStep === 2 && <FuseEvolve />}
                            </Grid>
                        </Grid>
                    </Container>
                    <MixologyNavBar />
                </>
            ) : (
                // <Stack height="calc(100vh - 222px)" justifyContent="center">
                <FuseSuccess />
                // </Stack>
            )}
        </>
    );
};

export default MixologyPageContainer;
