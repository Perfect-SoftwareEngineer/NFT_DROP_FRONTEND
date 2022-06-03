import React from 'react';
import { Stack, Box, Grid, Typography } from '@mui/material';
import Container from '../Container';
import { GradientBox1, GradientBox2, GradientBox3, RoadmapBtn } from './style';
import Link from 'next/link';

const HomePageContainer: React.FC = (): JSX.Element => {
    return (
        <Stack>
            <Stack position="relative">
                <img src="/assets/home/bg1.png" alt="" />
                <Stack position="absolute" sx={{ inset: 0 }}>
                    <GradientBox1 />
                </Stack>
                <Stack position="absolute" sx={{ inset: 0 }}>
                    <Container sx={{ height: '100%' }}>
                        <Stack height="100%" justifyContent="center">
                            <Typography
                                fontSize={48}
                                fontWeight={700}
                                lineHeight={1}
                                color="#FFCA21"
                                className="neueplak_condensed"
                                marginTop={-20}
                            >
                                CROSS-COMMUNITY PROJECT
                            </Typography>
                            <Typography
                                fontSize={128}
                                fontWeight={800}
                                lineHeight={1}
                                sx={{ textDecoration: 'underline', textDecorationThickness: 'from-font' }}
                                className="neueplak_condensed"
                            >
                                IT'S GAMETIME
                            </Typography>
                            <Typography width={600} fontSize={20} fontWeight={600} lineHeight={1.2} marginTop={10}>
                                Time to step up like the man who changed the game for good and change it once again with
                                your own Basketball Headz avatar.
                                <br></br>
                                <br></br>
                                20,000 unique, generative avatars are waiting which one will be yours?
                            </Typography>
                        </Stack>
                    </Container>
                </Stack>
            </Stack>
            <Stack position="relative" marginTop={-1}>
                <img src="/assets/home/bg2.png" alt="" />
                <Stack position="absolute" sx={{ inset: 0 }}>
                    <GradientBox2 />
                    <GradientBox3 />
                </Stack>
            </Stack>
            <Stack paddingY={16}>
                <Container>
                    <Stack alignItems="center">
                        <Stack>
                            <Typography
                                fontSize={48}
                                fontWeight={700}
                                lineHeight={1}
                                color="#FFCA21"
                                className="neueplak_condensed"
                            >
                                MULTI-PARTNER SERUMS
                            </Typography>
                            <Typography
                                fontSize={128}
                                fontWeight={800}
                                lineHeight={1}
                                sx={{ textDecoration: 'underline', textDecorationThickness: 'from-font' }}
                                className="neueplak_condensed"
                            >
                                MUTATE THE GAME
                            </Typography>
                            <Typography width={700} fontSize={20} fontWeight={600} lineHeight={1.2} marginTop={10}>
                                Our Basketball Headz avatars will be generated from the combination of Curry Brand DNA
                                and the traits of some the biggest and most exciting communities in the NFT space. Once
                                you've changed the game the only thing left to do is Mutate The Game.
                            </Typography>
                            <RoadmapBtn sx={{ marginTop: 6 }}>ROADMAP</RoadmapBtn>
                        </Stack>
                    </Stack>
                </Container>
            </Stack>
        </Stack>
    );
};

export default HomePageContainer;
