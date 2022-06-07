import React from 'react';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { MintStatusTypo } from './styles';

type ComponentProps = {
    selected: number;
};

const SerumStatusBox: React.FC<ComponentProps> = ({ selected }): JSX.Element => {
    return (
        <Stack borderRadius={2} sx={{ background: '#1B1C22' }}>
            <Stack direction="row" padding={2} spacing={2}>
                <Image
                    src="/assets/curryshop/serum-mintlist-general-mint.png"
                    width={80}
                    height={80}
                    alt=""
                    style={{ borderRadius: 8 }}
                />
                <Stack spacing={1}>
                    <Typography fontSize={20} fontWeight={800}>
                        Serum Sales
                    </Typography>
                    <Typography>Our Community Holders will be able to mint before the Public Mint</Typography>
                </Stack>
            </Stack>
            <Stack paddingBottom={2}>
                <MintStatusTypo selected={selected === 0}>Free Claims</MintStatusTypo>
                <MintStatusTypo selected={selected === 1}>Mintlist</MintStatusTypo>
                <MintStatusTypo selected={selected === 2}>General Mints</MintStatusTypo>
            </Stack>
        </Stack>
    );
};

export default SerumStatusBox;
