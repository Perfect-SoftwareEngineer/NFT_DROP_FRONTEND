import React from 'react';
import { Stack, Grid, Typography, Link } from '@mui/material';
import Container from '../Container';
import CounterBox from '../../components/CounterBox';
import StepBox from '../../components/Mixology/StepBox';
import { CurryShopBtn, CurryCounterBtn } from './styles';

const MixologyPageContainer: React.FC = (): JSX.Element => {
    return (
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
                    <Stack spacing={4}>
                        <Typography fontSize={48} fontWeight={700}>
                            Select a Basketball
                        </Typography>
                        <Stack spacing={2}>
                            <Typography fontSize={32} fontWeight={700} color="#FFCA21">
                                You currently do not own any Basketballs.
                            </Typography>
                            <Typography fontSize={16} fontWeight={400} width="70%">
                                You cannot start the Mixology process without owning a Basketball or Serum. You can
                                either mint a Basketball or Serum, mint after every 3 point shot Stephen Curry makes, or
                                buy them off the secondary market in{' '}
                                <Link href="https://opensea.io" color="#FFCA21" underline="none" target="_blank">
                                    OpenSea
                                </Link>
                                .
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <CurryShopBtn>Curry Shop</CurryShopBtn>
                            <CurryCounterBtn>Curry Counter</CurryCounterBtn>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MixologyPageContainer;
