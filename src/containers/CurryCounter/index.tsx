import React from 'react';
import { Stack, Box, Grid, Typography } from '@mui/material';
import Container from '../Container';
import Image from 'next/image';
import BannerImg from '../../assets/currycounter/banner.png';
import { LeftGradientBox } from './styles';
import SupplyBox from '../../components/CurryShop/SupplyBox';
import CurryCounterItem from '../../components/CurryCounter/ItemBox';
import { CurryCounterItemType } from '../../types';

const curryCounterList: Array<CurryCounterItemType> = [
    {
        name: 'Stephen Curry',
        label: 'Golden State Warriors',
        opponentTeamLogo: '/assets/teams/boston-celtics.png',
        opponentTeam: 'Boston Celtics',
        date: '03/04/22',
        cost: 0,
        reserveDisabled: false,
    },
    {
        name: 'Stephen Curry',
        label: 'Golden State Warriors',
        opponentTeamLogo: '/assets/teams/chicago-bulls.png',
        opponentTeam: 'Chicago Bulls',
        date: '03/07/22',
        cost: 1,
        reserveDisabled: true,
    },
    {
        name: 'Stephen Curry',
        label: 'Golden State Warriors',
        opponentTeamLogo: '/assets/teams/boston-celtics.png',
        opponentTeam: 'Boston Celtics',
        date: '03/10/22',
        cost: 4,
        reserveDisabled: false,
    },
    {
        name: 'Stephen Curry',
        label: 'Golden State Warriors',
        opponentTeamLogo: '/assets/teams/chicago-bulls.png',
        opponentTeam: 'Chicago Bulls',
        date: '03/13/22',
        cost: 2.3,
        reserveDisabled: true,
    },
];

const CurryCounterPageContainer: React.FC = (): JSX.Element => {
    return (
        <>
            <Box position="relative">
                <Box height={{ xs: 240, md: 300 }}>
                    <Image src={BannerImg} layout="fill" objectFit="cover" alt="" />
                </Box>
                <LeftGradientBox />
                <Stack position="absolute" justifyContent="center" sx={{ inset: 0 }}>
                    <Container>
                        <Typography fontSize={48} fontWeight={700}>
                            Curry Counter
                        </Typography>
                        <Typography width={{ xs: '100%', md: '40%' }} fontSize={16} fontWeight={400} marginTop={1}>
                            For every 3 point shot Stephen Curry makes in the NBA Playoffs, a new Basketball mint is
                            created.
                        </Typography>
                    </Container>
                </Stack>
            </Box>
            <Box paddingY={3} sx={{ background: '#1B1C22' }}>
                <Container>
                    <Typography fontSize={16} fontWeight={600}>
                        Overview
                    </Typography>
                    <Stack direction="row" marginTop={2} spacing={2}>
                        <SupplyBox amount={10003} label="Basketballs supply" headColor="#FFCA21" />
                        <SupplyBox amount={3} label="Three Points Scored" headColor="#FFCA21" />
                        <SupplyBox amount={1} label="Unclaimed Mints" headColor="#979797" />
                    </Stack>
                </Container>
            </Box>
            <Container sx={{ marginY: 5 }}>
                <Grid container rowGap={2}>
                    <Grid item container columns={24} columnSpacing={2} paddingX={2}>
                        <Grid item xs={9}>
                            <Typography fontSize={16} fontWeight={600} color="#979797">
                                Basketball Head
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography fontSize={16} fontWeight={600} color="#979797">
                                Opponent Team
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography fontSize={16} fontWeight={600} color="#979797" textAlign="right">
                                Date
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography fontSize={16} fontWeight={600} color="#979797" textAlign="right">
                                Cost
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography fontSize={16} fontWeight={600} color="#979797" textAlign="right">
                                Reserve Mint
                            </Typography>
                        </Grid>
                    </Grid>
                    {curryCounterList.map((item, index) => (
                        <CurryCounterItem data={item} key={`curry-counter-item-${index}`} />
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default CurryCounterPageContainer;
