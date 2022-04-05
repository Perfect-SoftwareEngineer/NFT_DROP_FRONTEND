import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { AmountInputWrapper, AmountInputTextField, MintBtn, ReserveBtn, ClaimBtn, MoreDetailsBtn } from './styles';
import InfoIcon from '../../../assets/curryshop/info.svg';

type ComponentProps = {
    type: number;
    disabled?: boolean;
    title: string;
    amountLeft: number;
    inputFieldTitle?: string;
    img: StaticImageData;
};

const ItemBox: React.FC<ComponentProps> = ({
    type,
    disabled = false,
    title,
    amountLeft,
    inputFieldTitle = '',
    img,
}): JSX.Element => {
    return (
        <Stack width="100%" padding={2} borderRadius={2} sx={{ background: '#1B1C22' }}>
            <Box>
                <Image src={img} layout="responsive" alt="" />
            </Box>
            <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={16} fontWeight={700} color="white">
                    {title}
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
            {(type === 0 || type === 1) && (
                <Stack spacing={1} marginTop={3}>
                    <Typography fontSize={14} fontWeight={400} color="white">
                        {inputFieldTitle}
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
            )}
            <Stack spacing={1} marginTop={type === 2 ? 5 : 2}>
                <Typography fontSize={16} fontWeight={700} color="white">
                    {disabled ? 'Currently Unavailable' : 'You have 10/10 reserve mints'}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                    {(type === 0 || type === 1) && (
                        <>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <MintBtn disabled={disabled}>Mint</MintBtn>
                                <ReserveBtn disabled={disabled}>Reserve</ReserveBtn>
                            </Stack>
                            <InfoIcon />
                        </>
                    )}
                    {type === 2 && (
                        <>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <ClaimBtn>Claim</ClaimBtn>
                                <MoreDetailsBtn>More details</MoreDetailsBtn>
                            </Stack>
                            <InfoIcon />
                        </>
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ItemBox;
