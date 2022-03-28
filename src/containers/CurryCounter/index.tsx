import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Container from '../Container';
import Image from 'next/image';
import BannerImg from '../../assets/currycounter/banner.png';
import { LeftGradientBox } from './styles';
import SupplyBox from '../../components/CurryShop/SupplyBox';

const CurryCounterPageContainer: React.FC = (): JSX.Element => {
    return (
        <>
            <Box position="relative">
                <Image src={BannerImg} layout="responsive" alt="" />
                <LeftGradientBox />
                <Stack position="absolute" justifyContent="center" sx={{ inset: 0 }}>
                    <Container>
                        <Typography fontSize={48} fontWeight={700}>
                            Curry Counter
                        </Typography>
                        <Typography fontSize={16} fontWeight={400} width="40%" marginTop={1}>
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
        </>
    );
};

export default CurryCounterPageContainer;
