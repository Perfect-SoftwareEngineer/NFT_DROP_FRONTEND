import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { ClaimBtn, MoreDetailsBtn } from './styles';
import InfoIcon from '../../../assets/curryshop/info.svg';
import GenersisCurryFlowImg from '../../../assets/curryshop/genesis-curry-flow.png';

type ComponentProps = {
    amountLeft: number;
    gcfOwnedCount: number;
};

const CurryFlowClaimBox: React.FC<ComponentProps> = ({ amountLeft, gcfOwnedCount }): JSX.Element => {
    return (
        <Stack width="100%" padding={2} borderRadius={2} sx={{ background: '#1B1C22' }}>
            <Box>
                <Image src={GenersisCurryFlowImg} layout="responsive" alt="" />
            </Box>
            <Stack direction="row" justifyContent="space-between" marginTop={2}>
                <Typography fontSize={16} fontWeight={700} color="white">
                    Claim your Genesis Curry Flow Serum
                </Typography>
                <Box>
                    <Typography fontSize={16} fontWeight={700} color="white">
                        {`${amountLeft.toLocaleString()} left`}
                    </Typography>
                </Box>
            </Stack>
            <Stack spacing={1} marginTop={5}>
                <Typography fontSize={16} fontWeight={700} color="white">
                    {`You own ${gcfOwnedCount} Genesis Curry Flow`}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <ClaimBtn disabled={!gcfOwnedCount}>Claim</ClaimBtn>
                        <MoreDetailsBtn>More details</MoreDetailsBtn>
                    </Stack>
                    <InfoIcon />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default CurryFlowClaimBox;
