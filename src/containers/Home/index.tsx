import React, { useState } from 'react';
import { Stack, Box, Typography, IconButton } from '@mui/material';
import Container from '../Container';
import {
    GradientBox1,
    GradientBox2,
    GradientBox3,
    GradientBox4,
    GradientBox5,
    GradientBox6,
    GradientBox7,
    MintNowBtn,
    HowItWorksBtn,
    PartnerLogoListBox,
    PartnerLogoBox,
    HowItWorksBox,
    MixologyRoomBtn,
} from './style';
import Link from 'next/link';
import roadmapLists from '../../constants/roadmapData';
import RoadmapItemBox from '../../components/Roadmap/ItemBox';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import HowItWorks from '../../components/Home/HowItWorks';
import TwitterIcon from '../../assets/twitter.svg';
import InstagramIcon from '../../assets/instagram.svg';

const HomePageContainer: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const [showHowItWorks, setShowHowItWorks] = useState<boolean>(false);

    return (
        <Stack sx={{ overflowX: 'hidden' }}>
            <Stack position="relative">
                <img src={matchDownMd ? '/assets/home/bg1-mobile.png' : '/assets/home/bg1.png'} alt="" />
                <Stack position="absolute" sx={{ inset: 0 }}>
                    <GradientBox1 />
                </Stack>
                <Stack position="absolute" sx={{ inset: 0 }}>
                    {/* <Stack width="100%" paddingTop={2} paddingBottom={3} sx={{ background: '#FFCA21' }}>
                        <Typography
                            fontSize={{ xs: 32, md: 48 }}
                            fontWeight={700}
                            lineHeight={1}
                            color="black"
                            textAlign="center"
                            className="neueplak_condensed"
                        >
                            General Mint Moved: June 29th at 5:00:00 PM PST
                        </Typography>
                    </Stack> */}
                    <Container>
                        <Stack justifyContent={{ xs: 'flex-start', md: 'center' }} marginTop={{ xs: 10, md: 15 }}>
                            <Typography
                                fontSize={{ xs: 32, md: 48 }}
                                fontWeight={700}
                                lineHeight={1}
                                color="#FFCA21"
                                className="neueplak_condensed"
                                // marginTop={{ xs: 0, md: -20 }}
                            >
                                BASKETBALL HEADZ
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
                                marginTop={{ xs: 4, md: 6 }}
                            >
                                Curry brand is unifying basketball and positive communities across the Metaverse.
                                <br />
                                <br />
                                Introducing Basketball Headz - a limited-edition 3D generative NFT project that unifies
                                multiple communities to mix and match your favorite NFT traits
                            </Typography>
                            <PartnerLogoListBox direction="row" flexWrap="wrap" gap={2} marginTop={6}>
                                <Link href="https://discord.com/invite/cyberkongz" passHref>
                                    <a target="_blank" rel="noopener noreferrer">
                                        <img src="/assets/home/logo/cyberkong.gif" alt="" />
                                    </a>
                                </Link>
                                <Link href="https://discord.com/invite/hape" passHref>
                                    <a target="_blank" rel="noopener noreferrer">
                                        <img src="/assets/home/logo/hape.png" alt="" />
                                    </a>
                                </Link>
                                <Link href="https://discord.com/invite/dinos" passHref>
                                    <a target="_blank" rel="noopener noreferrer">
                                        <img src="/assets/home/logo/chibi.png" alt="" />
                                    </a>
                                </Link>
                                <Link href="https://discord.com/invite/smilesss" passHref>
                                    <a target="_blank" rel="noopener noreferrer">
                                        <img src="/assets/home/logo/smilesss.png" alt="" />
                                    </a>
                                </Link>
                            </PartnerLogoListBox>
                            <Stack direction="row" spacing={2} marginTop={4}>
                                <Link href="/curryshop" passHref>
                                    <MintNowBtn>Mint Now</MintNowBtn>
                                </Link>
                                <HowItWorksBtn onClick={() => setShowHowItWorks(true)}>How it Works</HowItWorksBtn>
                            </Stack>
                        </Stack>
                    </Container>
                </Stack>

                <HowItWorksBox show={showHowItWorks}>
                    <IconButton
                        sx={{ position: 'absolute', right: '24px', top: '24px' }}
                        onClick={() => setShowHowItWorks(false)}
                    >
                        <CloseIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <HowItWorks />
                </HowItWorksBox>
            </Stack>
            <Stack position="relative" marginTop={-1}>
                <img src={matchDownMd ? '/assets/home/bg2-mobile.png' : '/assets/home/bg2.png'} alt="" />
                <Stack position="absolute" sx={{ inset: 0 }}>
                    <GradientBox2 />
                    <GradientBox3 />
                </Stack>
                <Box position="absolute" sx={{ inset: 0 }}>
                    <Container sx={{ height: '100%' }}>
                        <Stack
                            height="100%"
                            direction={{ xs: 'column', md: 'row' }}
                            justifyContent={{ xs: 'center', md: 'space-between' }}
                            spacing={{ xs: 20, md: 0 }}
                            paddingY="12%"
                        >
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                alignItems={{ xs: 'flex-start', sm: 'center' }}
                                alignSelf="flex-start"
                                spacing={4}
                            >
                                <img
                                    src="/assets/home/basketball.png"
                                    width={matchDownMd ? 136 : 272}
                                    height={matchDownMd ? 136 : 272}
                                    alt=""
                                />
                                <Stack>
                                    <Typography
                                        fontSize={{ xs: 36, md: 48 }}
                                        fontWeight={800}
                                        color="#FFCA21"
                                        lineHeight={1}
                                        className="neueplak_condensed"
                                    >
                                        NF3 BASKETBALL
                                    </Typography>
                                    <Typography
                                        fontSize={{ xs: 72, md: 128 }}
                                        fontWeight={800}
                                        lineHeight={1}
                                        className="neueplak_condensed"
                                    >
                                        0.08 ETH
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack
                                direction={{ xs: 'column-reverse', sm: 'row' }}
                                alignItems={{ xs: 'flex-end', sm: 'center' }}
                                alignSelf="flex-end"
                                spacing={4}
                            >
                                <Stack alignItems="flex-end">
                                    <Typography
                                        fontSize={{ xs: 36, md: 48 }}
                                        fontWeight={800}
                                        color="#FFCA21"
                                        lineHeight={1}
                                        className="neueplak_condensed"
                                    >
                                        SERUMS
                                    </Typography>
                                    <Typography
                                        fontSize={{ xs: 72, md: 128 }}
                                        fontWeight={800}
                                        lineHeight={1}
                                        className="neueplak_condensed"
                                    >
                                        0.027 ETH
                                    </Typography>
                                </Stack>
                                <img
                                    src="/assets/home/serum.png"
                                    width={matchDownMd ? 114 : 228}
                                    height={matchDownMd ? 136 : 272}
                                    alt=""
                                />
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
            </Stack>
            <Stack paddingY={{ xs: 16, md: 24 }}>
                <Container>
                    <Typography
                        fontSize={{ xs: 72, md: 128 }}
                        fontWeight={800}
                        lineHeight={1}
                        sx={{ textDecoration: 'underline', textDecorationThickness: 'from-font' }}
                        className="neueplak_condensed"
                    >
                        OUR PARTNERS
                    </Typography>
                    <Typography
                        width={{ xs: '100%', md: 560 }}
                        fontSize={{ xs: 16, md: 20 }}
                        fontWeight={600}
                        lineHeight={1.2}
                        marginTop={6}
                    >
                        Join our partners' Discords for more updates and details on how to join the community mintlist.
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
                            <Link href="https://discord.com/invite/smilesss" passHref>
                                <a target="_blank" rel="noopener noreferrer">
                                    <img src="/assets/home/logo/smilesss.png" alt="" />
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
                        {/* <PartnerLogoBox>
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
                        </PartnerLogoBox> */}
                    </Stack>
                </Container>
            </Stack>
            <Stack marginTop={10}>
                <Container>
                    <Typography
                        fontSize={{ xs: 72, md: 128 }}
                        fontWeight={800}
                        lineHeight={1}
                        sx={{ textDecoration: 'underline', textDecorationThickness: 'from-font' }}
                        className="neueplak_condensed"
                    >
                        SO HERE'S THE SCOOP
                    </Typography>
                    <Stack spacing={{ xs: 10, md: -10 }} marginTop={10}>
                        <Stack
                            width={{ xs: 260, md: 400 }}
                            spacing={{ xs: 3, md: 4 }}
                            alignSelf={{ xs: 'center', md: 'flex-start' }}
                        >
                            <video autoPlay muted loop style={{ borderRadius: 500 }}>
                                <source src={'/assets/home/video1.mp4'} type="video/mp4" />
                            </video>
                            <Typography
                                fontSize={{ xs: 36, md: 48 }}
                                fontWeight={700}
                                lineHeight={1}
                                className="neueplak_condensed"
                            >
                                CURRY COUNTER
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
                                <br />
                                <br />
                                <u>NF3 BASKETBALL</u>
                                <br />
                                Snapshot Date: <span style={{ color: '#FFCA21' }}>June 9th at 4:00:00 PST</span>
                                <br />
                                Freebies open:{' '}
                                <span style={{ color: '#FFCA21' }}>
                                    June 9th at 5:00:00 PST to June 11th at 5:00:00 PST.
                                </span>
                                <br />
                                <br />
                                <u>Serums</u>
                                <br />
                                Freebies open: <span style={{ color: '#FFCA21' }}>June 19th at 5:00:00 PM PST</span>
                            </Typography>
                        </Stack>
                        <Stack
                            width={{ xs: 260, md: 400 }}
                            spacing={{ xs: 3, md: 4 }}
                            alignSelf={{ xs: 'center', md: 'flex-start' }}
                        >
                            <video autoPlay muted loop style={{ width: '150%', marginLeft: '-25%' }}>
                                <source src={'/assets/home/video2.mp4'} type="video/mp4" />
                            </video>
                            <Typography
                                fontSize={{ xs: 36, md: 48 }}
                                fontWeight={700}
                                lineHeight={1}
                                className="neueplak_condensed"
                            >
                                NF3 BASKETBALL SALES
                            </Typography>
                            <Typography fontSize={{ xs: 16, md: 20 }} fontWeight={600} lineHeight={1.2}>
                                Got a mintlist spot? We open up early purchase to community partner mintlists and
                                Discord mintlists from{' '}
                                <span style={{ color: '#FFCA21' }}>
                                    June 19th at 5:00:00 PM PST to June 21st at 5:00:00 PM PST
                                </span>{' '}
                                for NF3 Basketballs and Serums.
                                <br />
                                <br />
                                On <span style={{ color: '#FFCA21' }}>June 29th at 5:00:00 PM PST</span> NF3 Basketballs
                                go on sale to anyone who hasn't got an NF3 already.
                            </Typography>
                        </Stack>
                        <Stack
                            width={{ xs: 260, md: 400 }}
                            spacing={{ xs: 3, md: 4 }}
                            alignSelf={{ xs: 'center', md: 'flex-end' }}
                        >
                            <Stack direction="row">
                                {[...Array(3).keys()].map((item) => (
                                    <img
                                        src="/assets/home/serum.png"
                                        width="33%"
                                        height="33%"
                                        alt=""
                                        style={{ borderRadius: 56 }}
                                    />
                                ))}
                            </Stack>
                            <Typography
                                fontSize={{ xs: 36, md: 48 }}
                                fontWeight={700}
                                lineHeight={1}
                                className="neueplak_condensed"
                            >
                                SERUM SALES
                            </Typography>
                            <Typography fontSize={{ xs: 16, md: 20 }} fontWeight={600} lineHeight={1.2}>
                                And on <span style={{ color: '#FFCA21' }}>June 29th at 5:00:00 PM PST</span> the
                                community serums go on sale.
                            </Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Stack>
            <Stack position="relative" marginTop={{ xs: 12, md: 20 }}>
                <img src={matchDownMd ? '/assets/home/bg3-mobile.png' : '/assets/home/bg3.png'} alt="" />
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
                                width={{ xs: '100%', md: 600 }}
                                fontSize={{ xs: 16, md: 20 }}
                                fontWeight={600}
                                lineHeight={1.2}
                                textAlign="right"
                                marginTop={{ xs: 2, md: 10 }}
                            >
                                Once you have an NF3 Basketball, you can use up to three distinct Serums from our
                                community partners - CyberKongz, HAPE, Chibi Dinos, and Smilesss. Come to mutate the NF3
                                in our Lab.
                            </Typography>
                            <Link href="/mixology" passHref>
                                <MixologyRoomBtn sx={{ marginTop: 5 }}>Mixology Room</MixologyRoomBtn>
                            </Link>
                        </Stack>
                    </Container>
                </Stack>
            </Stack>
            <Stack position="relative">
                <Stack position="absolute" top={0} left={0} right={0} zIndex={-10}>
                    <img
                        src={matchDownMd ? '/assets/roadmap/background-mobile.png' : '/assets/roadmap/background.png'}
                        alt=""
                    />
                    <GradientBox6 />
                    <GradientBox7 />
                </Stack>
                <Container sx={{ marginTop: 20 }}>
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
            <Stack width={{ xs: '80%', md: '30%' }} marginX="auto" alignItems="center" marginY={20}>
                <Typography
                    fontSize={{ xs: 32, md: 48 }}
                    fontWeight={700}
                    lineHeight={1}
                    color="#FFCA21"
                    className="neueplak_condensed"
                >
                    ABOUT THE ARTIST
                </Typography>
                <Typography
                    fontSize={{ xs: 72, md: 128 }}
                    fontWeight={800}
                    lineHeight={1}
                    sx={{ textDecoration: 'underline', textDecorationThickness: 'from-font' }}
                    className="neueplak_condensed"
                >
                    SANDY
                </Typography>
                <img src="/assets/home/artist.png" width="100%" style={{ marginTop: 80 }} alt="" />
                <Typography marginTop={5}>
                    Sandra is an artist based in London. She works in many mediums and has been enjoying exploring ways
                    to translate her ideas into a 3D world.
                    <br />
                    <br />
                    Originally a painter and illustrator, she combines her love for culture, music, and fashion in most
                    of her styles and storytelling.
                    <br />
                    <br />
                    Selling her work over the years to many collectors and musicians, she hopes to continue connecting
                    and exploring the creative space with like-minded souls.
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center" marginRight="auto" marginTop={5}>
                    <Link href={`https://twitter.com/justsandy_?s=21&t=H9Rx3LHs2FkKWCmMFYOj7g`} passHref>
                        <a target="_blank" rel="noopener noreferrer">
                            <IconButton>
                                <TwitterIcon />
                            </IconButton>
                        </a>
                    </Link>
                    <Link href="https://www.instagram.com/justsandy____/" passHref>
                        <a target="_blank" rel="noopener noreferrer">
                            <IconButton>
                                <InstagramIcon />
                            </IconButton>
                        </a>
                    </Link>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default HomePageContainer;
