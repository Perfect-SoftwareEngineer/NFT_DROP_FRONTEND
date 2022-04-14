import React from 'react';
import { Stack, Typography, Link } from '@mui/material';
import { CurryShopBtn, CurryCounterBtn } from './styles';

const NotOwnSerum: React.FC = (): JSX.Element => {
    return (
        <Stack spacing={{ xs: 3, sm: 4 }} paddingBottom={15}>
            <Stack spacing={2}>
                <Typography fontSize={48} fontWeight={700} lineHeight={1}>
                    Select up to 3 Serums
                </Typography>
                <Typography fontSize={16} fontWeight={500} width={{ xs: '100%', sm: '85%', md: '70%' }}>
                    <Typography fontSize={16} fontWeight={700} display="inline">
                        Note:
                    </Typography>{' '}
                    Every Serum selected guarentees you 2 traits of the Serum Type you select. So if you select 3
                    serums, you get 6 traits.
                </Typography>
            </Stack>
            <Stack spacing={2}>
                <Typography fontSize={32} fontWeight={700} lineHeight={1.1} color="#FFCA21">
                    You currently do not own any Serums.
                </Typography>
                <Typography fontSize={16} fontWeight={400} width={{ xs: '100%', sm: '85%', md: '70%' }}>
                    You cannot start the Mixology process without owning a Basketball or Serum. You can either mint a
                    Basketball or Serum, mint after every 3 point shot Stephen Curry makes, or buy them off the
                    secondary market in{' '}
                    <Link href="https://opensea.io" color="#FFCA21" underline="none" target="_blank">
                        OpenSea
                    </Link>
                    .
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
                <CurryShopBtn>Curry Shop</CurryShopBtn>
                <CurryCounterBtn>Curry Counter</CurryCounterBtn>
            </Stack>
        </Stack>
    );
};

export default NotOwnSerum;
