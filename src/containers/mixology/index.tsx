import React, { useState } from 'react';
import { Stack, Grid, Typography, Link } from '@mui/material';
import Container from '../Container';
import CounterBox from '../../components/CounterBox';
import StepBox from '../../components/Mixology/StepBox';
import NotOwnBasketball from './NotOwnBasketball';
import { BackBtn, NextBtn } from './styles';
import SelectBasketball from './SelectBasketball';
import { useAppContext } from '../../context/AppContext';

const MixologyPageContainer: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    return (
        <>
            <Container sx={{ paddingY: 5 }}>
                <Stack direction="row" spacing={2}>
                    <CounterBox title="MY BASKETBALLS" value={0} />
                    <CounterBox title="MY SERUMS" value={0} />
                </Stack>
                <Stack marginTop={4}>
                    <Typography fontSize={48} fontWeight={700}>
                        Mixology Room
                    </Typography>
                    <Typography fontSize={16} fontWeight={400} width={432}>
                        Select 1 Basketball and 3 Serums to create a new NFT. The fiinal product will look different
                        depending on selected items.
                    </Typography>
                </Stack>
                <Grid container marginTop={5} columnSpacing={8}>
                    <Grid item xs={4}>
                        <Stack spacing={2}>
                            <StepBox step={0} />
                            <StepBox step={1} />
                            <StepBox step={2} />
                        </Stack>
                    </Grid>
                    <Grid item xs={8}>
                        {appState.basketballsList.length > 0 ? <SelectBasketball /> : <NotOwnBasketball />}
                    </Grid>
                </Grid>
            </Container>
            <Stack
                position="fixed"
                bottom={0}
                width="100%"
                height={120}
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                sx={{ background: '#1B1C22' }}
            >
                <BackBtn>Back</BackBtn>
                <NextBtn disabled>Next</NextBtn>
            </Stack>
        </>
    );
};

export default MixologyPageContainer;
