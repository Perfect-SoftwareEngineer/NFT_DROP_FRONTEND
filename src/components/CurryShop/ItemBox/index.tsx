import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { AmountInputWrapper, AmountInputTextField, MintBtn, ReserveBtn, ClaimBtn, MoreDetailsBtn } from './styles';
import InfoIcon from '../../../assets/curryshop/info.svg';

type ComponentProps = {
    type: number;
    title: string;
    amountLeft: number;
    img: StaticImageData;
};

const ItemBox: React.FC<ComponentProps> = ({ type, title, amountLeft, img }): JSX.Element => {
    return (
        <Stack width="100%" padding={2} borderRadius={2} sx={{ background: '#1B1C22' }}>
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
            {(type === 0 || type === 1) && (
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
                            borderRadius={0.5}
                            sx={{ background: '#F3F3F3' }}
                        >
                            Max
                        </Typography>
                    </AmountInputWrapper>
                </Stack>
            )}
            <Stack spacing={1} marginTop={type === 2 ? 5 : 2}>
                <Typography fontSize={16} fontWeight={700} color="white">
                    You have 10/10 reserve mints
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                    {(type === 0 || type === 1) && (
                        <>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <MintBtn>Mint</MintBtn>
                                <ReserveBtn>Reserve</ReserveBtn>
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
