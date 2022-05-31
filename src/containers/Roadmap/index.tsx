import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Container from '../Container';
import RoadmapItemBox from '../../components/Roadmap/ItemBox';
import Image from 'next/image';
import BackgroundImg from '../../assets/roadmap/background.png';
import { GradientBox } from './styles';

// const q4_21 = [
//     {
//         img: '/assets/roadmap/genesis-curry-flow.png',
//         title: '01/ GENESIS CURRY FLOW',
//         desc: 'This NFT was built in 5 unique versions, each assigned a class of rarity. Upon delivery of the NFT, holders discovered which versions they unlocked. As the owner of the Genesis Curry Flow, you will be entitled to claim Metaverse Curry Flows from each of our partners; Decentraland, Sandbox, and RKL. Utility for all the Curry Flows are now introduced once again → read more below!',
//     },
// ];

const roadmapLists = [
    {
        img: '/assets/roadmap/01.png',
        title: '01/ GENESIS CURRY FLOW',
        desc: (
            <Typography>
                How do you celebrate the moment that Stephen Curry broke the world record for three-point shooting,
                changing the game for good? You change the Metaverse for good with the Curry Genesis Flow, the first
                wearable to cross the platforms of Decentraland, Sandbox, Gala Games, and RKL. Minted in five distinct
                rarities and now delivering the NF3 Basketball to our loyal holders.
            </Typography>
        ),
    },
    {
        img: '/assets/roadmap/02.png',
        title: '02/ NFT MEETS NF3',
        desc: (
            <Typography>
                As Stephen continues to raise the bar through the 2022 NBA Playoffs, we launch the amazing NF3
                Basketball. Nine free NFT basketball minted every time he scores a 3 pointer. Yes, they are limited, and
                that's the point; just like Steph, you have to have the quickest hands in the game.
            </Typography>
        ),
    },
    {
        img: '/assets/roadmap/03.png',
        title: `03/ IT'S ALL ABOUT COMMUNITY`,
        desc: (
            <Typography>
                We are excited to partner with some of the most amazing NFT projects in the Metaverse to grow one big
                passionate basketball community. So prepare to be excited and get involved in the biggest
                cross-community project the Metaverse has seen.
            </Typography>
        ),
    },
    {
        img: '/assets/roadmap/04.png',
        title: '04/ YOU DESERVE THE MINTLIST',
        desc: (
            <Typography>
                To reward our loyal holders of the Genesis Curry Flow, as well as the Metaverse shoe holders (Sandbox,
                Decentraland, RKL, Gala Games X Town Star), holders will be able to claim a free NF3 Basketball and a
                free Serum based on the rarity of your Genesis Curry Flow!
                <br />
                <br />
                <b>Snapshot 1: From June 9th at 5:00:00 PST to June 11th at 5:00:00 PST.</b>
                <br />
                This snapshot is for Genesis Curry Flow holders. If you are a holder before the snapshot time on June
                9th at 5:00:00 PST, you will have 48 hours to claim a free NF3.
                <br />
                <br />
                <b>Snapshot 2: From June 13th at 5:00:00 PST to June 15th at 5:00:00 PST.</b>
                <br />
                This snapshot is for the GCF Metaverse Partner shoes. If you are a holder of the partner shoes (Sandbox,
                Decentraland, RKL, Gala Games X Town Star) before the snapshot time on June 13th at 5:00:00 PST, you
                will have 48 hours to mint an NF3 Basketball.
            </Typography>
        ),
    },
    {
        img: '/assets/roadmap/05.png',
        title: '05/ MUTATE THE GAME',
        desc: (
            <Typography>
                Bringing together the NF3 and traits from our community partners, serums from each partner will be
                available for purchase from our store. So buy up to three and mix them together in our high-tech lab to
                create your very own unique and generative 'Basketball Head' avatar.
                <br />
                <br />
                <b>NF3 Basketballs General Mints open on June 16th at 5:00:00 PST.</b>
                <br />
                <b>Serum purchasing is available on June 28th at 5:00:00 PST.</b>
            </Typography>
        ),
    },
    {
        img: '/assets/roadmap/06.png',
        title: `06/ WHAT'S NEXT`,
        desc: (
            <Typography>
                State-of-the-art 3D apparel locker, interoperable avatars, 3D file usage, real-life merchandise in the
                likeness of your avatar? Coming soon…
            </Typography>
        ),
    },
    // {
    //     img: '/assets/roadmap/curry.png',
    //     title: `07/ WHAT'S NEXT`,
    //     desc: 'State-of-the-art 3D apparel locker, interoperable avatars, 3D file usage, real-life merchandise in the likeness of your avatar? Coming soon…',
    // },
];

const q3_22 = [
    {
        img: '/assets/roadmap/curry.png',
        title: '08/ WEARABLE CREATION',
        desc: 'Community partners get permission to create wearables for their community so that assets are interoperable between our collection and theirs',
    },
    {
        img: '/assets/roadmap/curry.png',
        title: '09/ WEARABLE MANUFACTURING',
        desc: 'Manufacturing of goods for items that avatars are wearing (Sold in limited quantities)',
    },
    {
        img: '/assets/roadmap/curry.png',
        title: '10/ THE VIEWER',
        desc: 'Avatars will be able to exchange what they are wearing for new goods: The way we create our clothing is that avatar wearables are plug and play! You can dress up your Basketball Head with purchase-able wearables on top of them in future drops.',
    },
];

const q4_22 = [
    {
        img: '/assets/roadmap/curry.png',
        title: '11/ CLOTHING DROP 1',
        desc: '',
    },
    {
        img: '/assets/roadmap/curry.png',
        title: '12/ COMPATIBLE WEARABLES',
        desc: 'Compatible wearable for partner communities',
    },
    {
        img: '/assets/roadmap/curry.png',
        title: '13/ CLOTHING DROP 2',
        desc: '',
    },
    {
        img: '/assets/roadmap/curry.png',
        title: '14/ METAVERSE LAND INTEGRATION',
        desc: 'Metaverse land integration for avatars and ecommerce shop with discount for holders',
    },
    {
        img: '/assets/roadmap/curry.png',
        title: '15/ CLOTHING DROP 3',
        desc: '',
    },
];

const RoadmapPageContainer: React.FC = (): JSX.Element => {
    return (
        <Box position="relative">
            <Stack position="absolute" top={0} left={0} right={0} zIndex={-10}>
                <Image src={BackgroundImg} layout="responsive" alt="" />
                <GradientBox />
            </Stack>
            <Container sx={{ paddingY: 8 }}>
                <Stack spacing={8}>
                    <Typography fontSize={48} fontWeight={900} lineHeight={1} className="neueplak_condensed">
                        ROADMAP
                    </Typography>
                    {/* <Typography fontSize={48} fontWeight={900} lineHeight={1} className="neueplak_condensed">
                    PHASE 1
                </Typography> */}
                    <Stack spacing={2}>
                        {/* <Typography>Q4 2021</Typography> */}
                        <Stack spacing={3}>
                            {/* {q4_21.map((item, index) => (
                            <RoadmapItemBox
                                img={item.img}
                                title={item.title}
                                desc={item.desc}
                                key={`q4_21_roadmap_item_${index}`}
                            />
                        ))} */}
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
                    {/* <Stack spacing={2}>
                    <Typography>Q2 2022</Typography>
                    <Stack spacing={3}>
                        {q2_22.map((item, index) => (
                            <RoadmapItemBox
                                img={item.img}
                                title={item.title}
                                desc={item.desc}
                                key={`q2_22_roadmap_item_${index}`}
                            />
                        ))}
                    </Stack>
                </Stack> */}
                    {/* <Typography fontSize={48} fontWeight={900} lineHeight={1} className="neueplak_condensed">
                    PHASE 2
                </Typography>
                <Stack spacing={2}>
                    <Typography>Q3 2022</Typography>
                    <Stack spacing={3}>
                        {q3_22.map((item, index) => (
                            <RoadmapItemBox
                                img={item.img}
                                title={item.title}
                                desc={item.desc}
                                key={`q3_22_roadmap_item_${index}`}
                            />
                        ))}
                    </Stack>
                </Stack>
                <Stack spacing={2}>
                    <Typography>Q4 2022</Typography>
                    <Stack spacing={3}>
                        {q4_22.map((item, index) => (
                            <RoadmapItemBox
                                img={item.img}
                                title={item.title}
                                desc={item.desc}
                                key={`q4_22_roadmap_item_${index}`}
                            />
                        ))}
                    </Stack>
                </Stack> */}
                </Stack>
            </Container>
        </Box>
    );
};

export default RoadmapPageContainer;
