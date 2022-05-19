import React, { useState } from 'react';
import { Stack, Box, Grid, Typography } from '@mui/material';
import Container from '../Container';
import RoadmapItemBox from '../../components/Roadmap/ItemBox';

const q4_21 = [
    {
        img: '/assets/roadmap/genesis-curry-flow.png',
        title: '01/ GENESIS CURRY FLOW',
        desc: 'This NFT was built in 5 unique versions, each assigned a class of rarity. Upon delivery of the NFT, holders discovered which versions they unlocked. As the owner of the Genesis Curry Flow, you will be entitled to claim Metaverse Curry Flows from each of our partners; Decentraland, Sandbox, and RKL. Utility for all the Curry Flows are now introduced once again → read more below!',
    },
];

const q2_22 = [
    {
        img: '/assets/roadmap/curry-counter.png',
        title: '02/ NF3 COUNTER',
        desc: `NF3 Counter is an interactive fan tool to reward the biggest Stephen Curry fans as he battles his way through the Playoffs. The premise is simple: for every three-pointer, Curry makes in a playoff game, three free digital Basketballs (NF3s) are claimable by the most engaged fans. Score to Mint kicks off the next iteration of Curry Brand's effort to create the most positive Basketball community of all time, championed by the greatest shooter of all time.`,
    },
    {
        img: '/assets/roadmap/curry.png',
        title: '03/ COMMUNITY REVEAL',
        desc: 'We are partnering with some of the biggest NFT communities championing utility and positivity. We hope to bridge new and existing communities within the NFT space through these long-term partnerships to build a community of basketball lovers. We will be revealing our 5 partners very soon. Join our Discord for the announcement!',
    },
    {
        img: '/assets/roadmap/nf3-basketball.png',
        title: '04/ NF3 BASKETBALL Claim and Whitelist',
        desc: `Previously, we gave away free NF3 basketballs based on Steph Curry's performance. Now, we want to reward our loyal holders of the Genesis Curry Flow holders as well as the Metaverse shoe holders (Sandbox, Decentraland, RKL, Gala Games X Town Star). Genesis Curry Flow holders will be able to claim a free NF3 Basketball and a free Serum based on the rarity of your Genesis Curry Flow! A snapshot for claiming will be taken on June 3rd and opened for claiming on June 3rd.
        <br/><br/>Mintlist (aka whitelist) spots will also be given to all Metaverse shoe holders. The mintlist snapshot will be taken on DATE_FOR_MINTLIST_SNAPSHOT and opened to purchase on DATE_FOR_MINTLIST_OPEN. Essentially, mintlist participants will be able to purchase before everyone else!`,
    },
    {
        img: '/assets/roadmap/serum-shop.png',
        title: '05/ SERUM & NF3 BASKETBALL SHOP OPENS',
        desc: 'To bring NF3 Basketballs to life, special Serums guarantee certain trait styles on your Basketball Head based on the Serum variety you own. There are 12 different types of Serums — you can fuse anywhere between 1-3 Serums with your NF3 Basketball to bring a Basketball Head to life. Serums take after popular NFT collections mixed with the unique style of Stephen Curry and Under Armour.The Partner NFT collections will be announced soon! General minting for Serums and NF3 Basketballs open on DATE_TIME_FOR_SHOP_OPEN.',
    },
    {
        img: '/assets/roadmap/curry.png',
        title: '06/ MIXOLOGY ROOM',
        desc: 'With the launch of the Mixology Room, NF3 Basketball and Serum holders will be able to fuse their them together to create a Basketball Head Avatar. Simply put:<br/><br/>1 Basketball Headz Avatar = 1 NF3 Basketball + 0-3 Serums<br/>1 Serum = 1-2 traits of the NFT community/brand traits GUARANTEED to be on your avatar<br/><br/>To create your Basketball Head Avatar, simply insert your NF3 Basketball, select up to three Serums you own, and morph them together in the Mixology Room. Be careful - the likeness of your Basketball Headz are in your own hands!',
    },
    {
        img: '/assets/roadmap/curry.png',
        title: `07/ WHAT'S NEXT`,
        desc: 'State-of-the-art 3D apparel locker, interoperable avatars, 3D file usage, real-life merchandise in the likeness of your avatar? Coming soon…',
    },
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
        <Container sx={{ marginY: 5 }}>
            <Stack spacing={5}>
                <Typography fontSize={48} fontWeight={900} lineHeight={1} className="neueplak_condensed">
                    ROADMAP
                </Typography>
                {/* <Typography fontSize={48} fontWeight={900} lineHeight={1} className="neueplak_condensed">
                    PHASE 1
                </Typography> */}
                <Stack spacing={2}>
                    {/* <Typography>Q4 2021</Typography> */}
                    <Stack spacing={3}>
                        {q4_21.map((item, index) => (
                            <RoadmapItemBox
                                img={item.img}
                                title={item.title}
                                desc={item.desc}
                                key={`q4_21_roadmap_item_${index}`}
                            />
                        ))}
                        {q2_22.map((item, index) => (
                            <RoadmapItemBox
                                img={item.img}
                                title={item.title}
                                desc={item.desc}
                                key={`q2_22_roadmap_item_${index}`}
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
    );
};

export default RoadmapPageContainer;
