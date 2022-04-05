import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { AmountInputWrapper, AmountInputTextField, MintBtn, ReserveBtn } from './styles';
import InfoIcon from '../../../assets/curryshop/info.svg';
import SerumImg from '../../../assets/curryshop/serum.png';

type ComponentProps = {
    amountLeft: number;
    disabled?: boolean;
};

const SerumMintBox: React.FC<ComponentProps> = ({ amountLeft, disabled = false }): JSX.Element => {
    return (
        <Stack width="100%" padding={2} borderRadius={2} sx={{ background: '#1B1C22' }}>
            <Box>
                <Image src={SerumImg} layout="responsive" alt="" />
            </Box>
            <Stack direction="row" justifyContent="space-between" marginTop={2}>
                <Typography fontSize={16} fontWeight={700} color="white">
                    Mint or Reserve a Serum
                    {disabled && (
                        <Typography fontSize={16} fontWeight={700} color="#FFCA21" display="inline">
                            {` (Coming Soon)`}
                        </Typography>
                    )}
                </Typography>
                <Box>
                    <Typography fontSize={16} fontWeight={700} color="white">
                        {`${amountLeft.toLocaleString()} left`}
                    </Typography>
                </Box>
            </Stack>
            <Stack spacing={1} marginTop={3}>
                <Typography fontSize={14} fontWeight={400} color="white">
                    # of Serums (Max 6)
                </Typography>
                <AmountInputWrapper sx={{ width: 184 }}>
                    <AmountInputTextField />
                    <Typography
                        fontSize={12}
                        fontWeight={400}
                        padding="0 2px 2px"
                        color="black"
                        borderRadius={1}
                        sx={{ background: '#F3F3F3' }}
                    >
                        Max
                    </Typography>
                </AmountInputWrapper>
            </Stack>
            <Stack spacing={1} marginTop={2}>
                <Typography fontSize={16} fontWeight={700} color="white">
                    {disabled ? 'Currently Unavailable' : 'You have 10/10 reserve mints'}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <MintBtn disabled={disabled}>Mint</MintBtn>
                        <ReserveBtn disabled={disabled}>Reserve</ReserveBtn>
                    </Stack>
                    <InfoIcon />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default SerumMintBox;
