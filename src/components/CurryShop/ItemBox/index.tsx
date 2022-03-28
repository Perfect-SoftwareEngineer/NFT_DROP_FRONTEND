import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { MintBtn, ReserveBtn, ClaimBtn, MoreDetailsBtn } from './styles';

type ComponentProps = {
    type: number;
    title: string;
    amountLeft: number;
    img: StaticImageData;
};

const ItemBox: React.FC<ComponentProps> = ({ type, title, amountLeft, img }): JSX.Element => {
    return (
        <Stack width="100%" padding={2} spacing={2} borderRadius={2} sx={{ background: '#1B1C22' }}>
            <Box>
                <Image src={img} layout="responsive" alt="" />
            </Box>
            <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={16} fontWeight={700} color="white">
                    {title}
                </Typography>
                <Typography fontSize={16} fontWeight={700} color="white">
                    {`${amountLeft.toLocaleString()} left`}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
                {(type === 0 || type === 1) && (
                    <>
                        <MintBtn>Mint</MintBtn>
                        <ReserveBtn>Reserve</ReserveBtn>
                    </>
                )}
                {type === 2 && (
                    <>
                        <ClaimBtn>Claim</ClaimBtn>
                        <MoreDetailsBtn>More details</MoreDetailsBtn>
                    </>
                )}
            </Stack>
        </Stack>
    );
};

export default ItemBox;
