import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';
import CommunityImg from '../../../assets/curryshop/community.png';
import { ClaimBtn } from './styles';

type ComponentProps = {};

const CommunityMintBox: React.FC<ComponentProps> = (): JSX.Element => {
    return (
        <Stack width={432} padding={2} borderRadius={2} sx={{ background: '#1B1C22' }}>
            <Box>
                <Image src={CommunityImg} layout="responsive" alt="" />
            </Box>
            <Stack spacing={3} marginTop={2}>
                <Typography fontWeight={700} color="white">
                    Mintlist
                </Typography>
                <Typography fontWeight={700} color="white">
                    Price: 0.07 ETH
                </Typography>
                <Stack spacing={1}>
                    <Typography fontSize={16} fontWeight={700} color="white">
                        You own 0 Genesis Curry Flow
                    </Typography>
                    <ClaimBtn disabled>Claim</ClaimBtn>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default CommunityMintBox;
