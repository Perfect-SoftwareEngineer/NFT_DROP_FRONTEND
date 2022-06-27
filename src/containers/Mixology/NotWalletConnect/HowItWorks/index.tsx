import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { GradientBox } from './styles';
import { SxProps } from '@mui/system';
import Container from '../../../Container';

export interface ComponentProps {
    sx?: SxProps;
}

const HowItWorks: React.FC<ComponentProps> = ({ sx }): JSX.Element => {
    return (
        <Stack position="relative">
            <Box width="100%" height={720}></Box>
            <Stack position="relative">
                <img src="/assets/mixology/background1.png" width="100%" />
                <GradientBox />
            </Stack>
            <Container sx={{ position: 'absolute', inset: 0 }}>sdfafasdf</Container>
        </Stack>
    );
};

export default HowItWorks;
