import React from 'react';
import { Stack, Box, Grid, Typography } from '@mui/material';
import Container from '../Container';
import {
    GradientBox1,
    GradientBox2,
    GradientBox3,
    GradientBox4,
    GradientBox5,
    GradientBox6,
    RoadmapBtn,
    PartnerLogoBox,
} from './style';
import Link from 'next/link';
import roadmapLists from '../../constants/roadmapData';
import RoadmapItemBox from '../../components/Roadmap/ItemBox';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const HomePageContainer: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Stack sx={{ overflowX: 'hidden' }}>
            <Stack position="relative">
                <img src={matchDownMd ? '/assets/home/bg1-mobile.png' : '/assets/home/bg1.png'} alt="" />
                <Stack position="absolute" sx={{ inset: 0 }}>
                    <GradientBox1 />
                </Stack>
                <Stack position="absolute" sx={{ inset: 0 }}>
                    <Container sx={{ height: '100%' }}>
                        <Stack height="100%" justifyContent="center">
                            <Typography
                                fontSize={{ xs: 32, md: 48 }}
                                fontWeight={700}
                                lineHeight={1}
                                color="#FFCA21"
                                className="neueplak_condensed"
                                marginTop={{ xs: 0, md: -20 }}
                            >
                                CROSS-COMMUNITY PROJECT
                            </Typography>
                            <Typography
                                fontSize={{ xs: 72, md: 128 }}
                                fontWeight={800}
                                lineHeight={1}
                                sx={{ textDecoration: 'underline', textDecorationThickness: 'from-font' }}
                                className="neueplak_condensed"
                            >
                                IT'S GAMETIME
                            </Typography>
                            <Typography
                                width={{ xs: '90%', md: 600 }}
                                fontSize={{ xs: 16, md: 20 }}
                                fontWeight={600}
                                lineHeight={1.2}
                                marginTop={{ xs: 6, md: 10 }}
                            >
                                Time to step up like the man who changed the game for good and change it once again with
                                your own Basketball Headz avatar.
                                <br></br>
                                <br></br>
                                20,000 unique, generative avatars are waiting which one will be yours?
                            </Typography>
                            {/* <Typography fontSize={{ xs: 16, md: 20 }} fontWeight={600} lineHeight={1.2} marginTop={3}>
                                NF3 Basketball Free Claiming: June 9th at 5:00:00 PST to June 11th at 5:00:00 PST.
                            </Typography> */}
                        </Stack>
                    </Container>
                </Stack>
            </Stack>
            <Stack position="relative" marginTop={-1}>
                <img src={matchDownMd ? '/assets/home/bg2-mobile.png' : '/assets/home/bg2.png'} alt="" />
                <Stack position="absolute" sx={{ inset: 0 }}>
                    <GradientBox2 />
                    <GradientBox3 />
                </Stack>
            </Stack>
            <Stack paddingY={{ xs: 10, md: 16 }}>
                <Container>
                    <Stack alignItems="center">
                        <Stack>
                            <Typography
                                fontSize={{ xs: 32, md: 48 }}
                                fontWeight={700}
                                lineHeight={1}
                                color="#FFCA21"
                                className="neueplak_condensed"
                            >
                                MULTI-PARTNER SERUMS
                            </Typography>
                            <Typography
                                fontSize={{ xs: 72, md: 128 }}
                                fontWeight={800}
                                lineHeight={1}
                                sx={{ textDecoration: 'underline', textDecorationThickness: 'from-font' }}
                                className="neueplak_condensed"
                            >
                                MUTATE THE GAME
                            </Typography>
                            <Typography
                                width={{ xs: '100%', md: 700 }}
                                fontSize={{ xs: 16, md: 20 }}
                                fontWeight={600}
                                lineHeight={1.2}
                                marginTop={{ xs: 4, md: 10 }}
                            >
                                Our Basketball Headz avatars will be generated from the combination of Curry Brand DNA
                                and the traits of some the biggest and most exciting communities in the NFT space. Once
                                you've changed the game the only thing left to do is Mutate The Game.
                            </Typography>
                            <RoadmapBtn sx={{ marginTop: { xs: 4, md: 6 } }}>ROADMAP</RoadmapBtn>
                        </Stack>
                    </Stack>
                </Container>
            </Stack>
            <Box position="relative">
                <video autoPlay muted loop style={{ width: '100%' }}>
                    <source src={'/assets/home/video1.mp4'} type="video/mp4" />
                </video>
                <Stack position="absolute" sx={{ inset: 0 }}>
                    <GradientBox4 />
                </Stack>
            </Box>
            <Stack position="relative" alignItems="center" paddingY={{ xs: 4, md: 0 }}>
                <video autoPlay muted loop style={{ width: '50%' }}>
                    <source src={'/assets/home/video2.mp4'} type="video/mp4" />
                </video>
                <Stack position="absolute" sx={{ inset: 0 }}>
                    <GradientBox4 />
                </Stack>
            </Stack>
            <Stack>
                <Container>
                    <Typography fontSize={48} fontWeight={700} lineHeight={1} className="neueplak_condensed">
                        OUR PARTNERS
                    </Typography>
                    <Typography
                        width={560}
                        fontSize={{ xs: 16, md: 20 }}
                        fontWeight={600}
                        lineHeight={1.2}
                        marginTop={3}
                    >
                        Join our partner's Discord for more updates and details on how to join the community mintlist.
                    </Typography>
                    <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={5} marginTop={6}>
                        <PartnerLogoBox>
                            <Link href="https://discord.com/invite/cyberkongz" passHref>
                                <a target="_blank" rel="noopener noreferrer">
                                    <img src="/assets/home/logo/cyberkong.gif" alt="" />
                                </a>
                            </Link>
                        </PartnerLogoBox>
                        <PartnerLogoBox>
                            <Link href="https://discord.com/invite/hape" passHref>
                                <a target="_blank" rel="noopener noreferrer">
                                    <img src="/assets/home/logo/hape.png" alt="" />
                                </a>
                            </Link>
                        </PartnerLogoBox>
                        <PartnerLogoBox>
                            <Link href="https://discord.com/invite/dinos" passHref>
                                <a target="_blank" rel="noopener noreferrer">
                                    <img src="/assets/home/logo/chibi.png" alt="" />
                                </a>
                            </Link>
                        </PartnerLogoBox>
                        <PartnerLogoBox>
                            <Link href="https://discord.com/invite/ftxland" passHref>
                                <a target="_blank" rel="noopener noreferrer">
                                    <img src="/assets/home/logo/ftx.png" alt="" />
                                </a>
                            </Link>
                        </PartnerLogoBox>
                        <PartnerLogoBox>
                            <Box width="100%" paddingTop="100%" position="relative">
                                <Stack
                                    position="absolute"
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{ inset: 0 }}
                                >
                                    <Typography
                                        fontSize={48}
                                        fontWeight={700}
                                        lineHeight={1}
                                        textAlign="center"
                                        className="neueplak_condensed"
                                    >
                                        COMING SOON
                                    </Typography>
                                </Stack>
                            </Box>
                        </PartnerLogoBox>
                    </Stack>
                </Container>
            </Stack>
            <Stack marginTop={20}>
                <Container>
                    <Stack spacing={8}>
                        <Stack
                            width={{ xs: 260, md: 400 }}
                            spacing={{ xs: 3, md: 4 }}
                            alignSelf={{ xs: 'center', md: 'flex-start' }}
                        >
                            <img src="/assets/home/img1.png" alt="" />
                            <Typography
                                fontSize={{ xs: 36, md: 48 }}
                                fontWeight={700}
                                lineHeight={1}
                                className="neueplak_condensed"
                            >
                                SO HERE'S THE SCOOP
                            </Typography>
                            <Typography fontSize={{ xs: 16, md: 20 }} fontWeight={600} lineHeight={1.2}>
                                Since the beginning of the playoffs we've been dropping free NF3 basketballs every time
                                Stephen hits a 3, and we know that happens a lot!
                            </Typography>
                        </Stack>
                        <Stack
                            width={{ xs: 260, md: 400 }}
                            spacing={{ xs: 3, md: 4 }}
                            alignSelf={{ xs: 'center', md: 'flex-end' }}
                        >
                            <img src="/assets/home/img2.png" alt="" />
                            <Typography
                                fontSize={{ xs: 36, md: 48 }}
                                fontWeight={700}
                                lineHeight={1}
                                className="neueplak_condensed"
                            >
                                REWARD FOR GCF HOLDERS
                            </Typography>
                            <Typography fontSize={{ xs: 16, md: 20 }} fontWeight={600} lineHeight={1.2}>
                                Our loyal GCF NFT owners can claim a free NF3 basketball plus a community serum right
                                now, just because we love our community!
                            </Typography>
                        </Stack>
                        <Stack
                            width={{ xs: 260, md: 400 }}
                            spacing={{ xs: 3, md: 4 }}
                            alignSelf={{ xs: 'center', md: 'flex-start' }}
                        >
                            <img src="/assets/home/img3.png" alt="" />
                            <Typography
                                fontSize={{ xs: 36, md: 48 }}
                                fontWeight={700}
                                lineHeight={1}
                                className="neueplak_condensed"
                            >
                                NF3 BASKETBALL SALES
                            </Typography>
                            <Typography fontSize={{ xs: 16, md: 20 }} fontWeight={600} lineHeight={1.2}>
                                On XXX of June the balance of our 20,000 NF3 basketballs go on sale to anyone who hasn't
                                got an NF3 already
                            </Typography>
                        </Stack>
                        <Stack
                            width={{ xs: 260, md: 400 }}
                            spacing={{ xs: 3, md: 4 }}
                            alignSelf={{ xs: 'center', md: 'flex-end' }}
                        >
                            <img src="/assets/home/img4.png" alt="" />
                            <Typography
                                fontSize={{ xs: 36, md: 48 }}
                                fontWeight={700}
                                lineHeight={1}
                                className="neueplak_condensed"
                            >
                                SERUM SALES
                            </Typography>
                            <Typography fontSize={{ xs: 16, md: 20 }} fontWeight={600} lineHeight={1.2}>
                                And on XXXX the community serums go on sale
                            </Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Stack>
            <Stack position="relative" marginTop={{ xs: 12, md: 20 }}>
                <img src="/assets/home/bg3.png" alt="" />
                <Stack position="absolute" sx={{ inset: 0 }}>
                    <GradientBox5 />
                </Stack>
                <Stack position="absolute" sx={{ inset: 0 }}>
                    <Container sx={{ height: '100%' }}>
                        <Stack height="100%" justifyContent="center" alignItems="flex-end">
                            <Typography
                                fontSize={{ xs: 32, md: 48 }}
                                fontWeight={700}
                                lineHeight={1}
                                color="#FFCA21"
                                className="neueplak_condensed"
                            >
                                MIXOLOGY ROOM
                            </Typography>
                            <Typography
                                fontSize={{ xs: 72, md: 128 }}
                                fontWeight={800}
                                lineHeight={1}
                                sx={{ textDecoration: 'underline', textDecorationThickness: 'from-font' }}
                                className="neueplak_condensed"
                            >
                                GET IN THE MIX
                            </Typography>
                            <Typography
                                width={600}
                                fontSize={{ xs: 16, md: 20 }}
                                fontWeight={600}
                                lineHeight={1.2}
                                textAlign="right"
                                marginTop={{ xs: 2, md: 10 }}
                            >
                                Once you have an NF3 basketball and up to 3 distinct serums from our community partners,
                                Cyber Kongs, Hape, Chibi dinos and Smileverse jump on over to our Lab and prepare to
                                mutate.
                                <br></br>
                                <br></br>
                                COMING SOON
                            </Typography>
                        </Stack>
                    </Container>
                </Stack>
            </Stack>
            <Stack position="relative">
                <Stack position="absolute" top={0} left={0} right={0} zIndex={-10}>
                    <img src="/assets/roadmap/background.png" alt="" />
                    <GradientBox6 />
                </Stack>
                <Container sx={{ paddingY: 20 }}>
                    <Stack spacing={8}>
                        <Typography
                            fontSize={{ xs: 72, md: 128 }}
                            fontWeight={800}
                            lineHeight={1}
                            sx={{ textDecoration: 'underline', textDecorationThickness: 'from-font' }}
                            className="neueplak_condensed"
                        >
                            ROADMAP
                        </Typography>
                        <Stack spacing={3}>
                            {roadmapLists.map((item, index) => (
                                <RoadmapItemBox
                                    img={item.img}
                                    title={item.title}
                                    desc={item.desc}
                                    key={`roadmap_item_${index}`}
                                />
                            ))}
                        </Stack>
                    </Stack>
                </Container>
            </Stack>
        </Stack>
    );
};

export default HomePageContainer;
