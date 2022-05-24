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
        desc: 'This NFT was built in 5 unique versions, each assigned a class of rarity. Upon delivery of the NFT, discover which version you have unlocked! As the owner of the Genesis Curry Flow, you will be entitled to claim Metaverse Curry Flows from each of our partners; Decentraland, Sandbox and Gala Games.',
    },
    {
        img: '/assets/roadmap/02.png',
        title: '02/ NF3 COUNTER',
        desc: `NF3 Counter is an interactive fan tool to reward the biggest Stephen Curry fans as he battles his way through the Playoffs. The premise is simple: for every three-pointer, Curry makes in a playoff game, three free digital Basketballs are claimable by the most engaged fans. Score to Mint kicks off the next iteration of Curry Brand's effort to create the most positive Basketball community of all time, championed by the greatest shooter of all time.`,
    },
    {
        img: '/assets/roadmap/03.png',
        title: '03/ COMMUNITY REVEAL',
        desc: 'We will be partnering with the biggest NFT communities. We will reveal them soon.',
    },
    {
        img: '/assets/roadmap/04.png',
        title: '04/ NF3 BASKETBALL SALE',
        desc: `There will be a general mint in the coming future. Follow our Twitter and join Discord to stay posted.`,
    },
    {
        img: '/assets/roadmap/05.png',
        title: '05/ SERUM SHOP OPENS',
        desc: 'There will be a general mint in the coming future. Follow our Twitter and join Discord to stay posted.',
    },
    {
        img: '/assets/roadmap/06.png',
        title: '06/ MIXOLOGY ROOM',
        desc: 'Mixology open and avatars are created',
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
