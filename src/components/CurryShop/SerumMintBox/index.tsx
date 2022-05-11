import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { AmountInputWrapper, AmountInputTextField, MaxBtn, MintBtn, ReserveBtn } from '../styles';
import InfoIcon from '../../../assets/curryshop/info.svg';
import SerumImg from '../../../assets/curryshop/serum.png';

type ComponentProps = {
    amountLeft: number;
    disabled?: boolean;
};

const MAX_VAL = 6;

const SerumMintBox: React.FC<ComponentProps> = ({ amountLeft, disabled = false }): JSX.Element => {
    const [mintAmount, setMintAmount] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!isNaN(Number(value)) && Number(value) <= MAX_VAL) setMintAmount(value);
    };

    return (
        <Stack width="100%" padding={2} borderRadius={2} sx={{ background: '#1B1C22' }}>
            <Box>
                <Image src={SerumImg} layout="responsive" alt="" />
            </Box>
            <Stack spacing={3} marginTop={2}>
                <Stack direction="row" justifyContent="space-between">
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
                <Typography fontWeight={700}>Price: 0.03 ETH</Typography>
                <Stack spacing={1}>
                    <Typography fontSize={14} fontWeight={400} color="white">
                        # of Serums (Max 6)
                    </Typography>
                    <AmountInputWrapper sx={{ width: 184 }}>
                        <AmountInputTextField value={mintAmount} onChange={handleInputChange} />
                        <MaxBtn onClick={() => setMintAmount(MAX_VAL.toString())}>Max</MaxBtn>
                    </AmountInputWrapper>
                </Stack>
                <Stack spacing={1}>
                    <Typography fontSize={16} fontWeight={700} color="white">
                        {disabled ? 'Coming soon' : 'You have 10/10 reserve mints'}
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
        </Stack>
    );
};

export default SerumMintBox;
