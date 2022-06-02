import React from 'react';
import { Stack, Box, Grid, Typography } from '@mui/material';
import Container from '../Container';
import { NF3CounterBtn } from './style';
import Link from 'next/link';

const HomePageContainer: React.FC = (): JSX.Element => {
    return (
        <Stack>
            <Stack position="relative" alignItems="center" marginTop={15}>
                {/* <img src="/assets/home/curry-basketball.png" width="20%" alt="" /> */}
                <video autoPlay muted loop style={{ width: '20%' }}>
                    <source src={'/assets/home/BALL.mp4'} type="video/mp4" />
                </video>
                <Stack position="absolute" marginTop={-6} sx={{ inset: 0 }}>
                    <Typography
                        fontSize={92}
                        fontWeight={800}
                        lineHeight={1.1}
                        textAlign="center"
                        sx={{ textDecoration: 'underline', textDecorationThickness: 'from-font' }}
                        className="neueplak_condensed"
                    >
                        NF3 BASKETBALL
                    </Typography>
                    <Typography
                        fontSize={92}
                        fontWeight={800}
                        color="#ffca21"
                        lineHeight={1.1}
                        textAlign="center"
                        sx={{ textDecoration: 'underline', textDecorationThickness: 'from-font' }}
                        className="neueplak_condensed"
                    >
                        CHANGING THE GAME FOR GOOD
                    </Typography>
                </Stack>
            </Stack>
            <Container sx={{ paddingTop: 8, paddingBottom: 16 }}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography>ABOUT THE PROJECT</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography fontSize={48} fontWeight={700} lineHeight={1.1}>
                            As Curry continues to raise the bar through the 2022 NBA Playoffs, we launch our first ever
                            NF3 Basketball. Nine free NFT basketball minted every time he scores a 3 pointer.
                        </Typography>
                        <Typography fontSize={48} fontWeight={700} color="#969AA1" lineHeight={1.1} marginTop={8}>
                            Check the{' '}
                            <Link href="/roadmap" passHref>
                                <Typography
                                    fontSize={48}
                                    fontWeight={700}
                                    color="#FFCA21"
                                    display="inline"
                                    sx={{
                                        textDecoration: 'underline',
                                        textDecorationThickness: 'from-font',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Roadmap
                                </Typography>
                            </Link>{' '}
                            to see what's next!
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Box position="relative">
                <video autoPlay muted loop style={{ width: '100%' }}>
                    <source src={'/assets/home/video.mp4'} type="video/mp4" />
                </video>
                <Stack justifyContent="center" position="absolute" sx={{ inset: 0 }}>
                    <Container>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack spacing={6}>
                                <Typography fontSize={92} fontWeight={800} className="neueplak_condensed">
                                    CURRY COUNTER
                                </Typography>
                                <NF3CounterBtn>NF3 COUNTER</NF3CounterBtn>
                            </Stack>
                            <Typography width="40%" fontSize={48} fontWeight={700} lineHeight={1.2}>
                                As Curry continues to raise the bar through the 2022 NBA Playoffs, we launch our first
                                ever NF3 Basketball. Nine free NFT basketball minted every time he scores a 3 pointer.
                            </Typography>
                        </Stack>
                    </Container>
                </Stack>
            </Box>
        </Stack>
    );
};

export default HomePageContainer;
