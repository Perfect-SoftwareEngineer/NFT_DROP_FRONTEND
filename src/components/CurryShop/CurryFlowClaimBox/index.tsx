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
        <Stack width={432} padding={2} borderRadius={2} sx={{ background: '#1B1C22' }}>
            <Box>
                <Image src={GenersisCurryFlowImg} layout="responsive" alt="" />
            </Box>
            <Stack height="100%" spacing={3} marginTop={2}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography fontWeight={700}>Claim your Genesis Curry Flow Serum</Typography>
                    <Box>
                        <Typography fontWeight={700}>{`${amountLeft.toLocaleString()} left`}</Typography>
                    </Box>
                </Stack>
                <Stack height="100%" justifyContent="space-between">
                    <Typography fontWeight={700}>Free Mints for GCF NFT Holders</Typography>
                    <Stack spacing={1}>
                        <Typography fontWeight={700}>{`You own ${gcfOwnedCount} Genesis Curry Flow`}</Typography>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <ClaimBtn disabled={!gcfOwnedCount}>Claim</ClaimBtn>
                                <MoreDetailsBtn>More details</MoreDetailsBtn>
                            </Stack>
                            <InfoIcon />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default CurryFlowClaimBox;
