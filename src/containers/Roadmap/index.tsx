import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Container from '../Container';
import RoadmapItemBox from '../../components/Roadmap/ItemBox';
import { GradientBox } from './styles';
import roadmapLists from '../../constants/roadmapData';

const RoadmapPageContainer: React.FC = (): JSX.Element => {
    return (
        <Box position="relative">
            <Stack position="absolute" top={0} left={0} right={0} zIndex={-10}>
                <img src="/assets/roadmap/background.png" alt="" />
                <GradientBox />
            </Stack>
            <Container sx={{ paddingY: 8 }}>
                <Stack spacing={8}>
                    <Typography fontSize={48} fontWeight={900} lineHeight={1} className="neueplak_condensed">
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
        </Box>
    );
};

export default RoadmapPageContainer;
