import React from 'react';
import { Stack, Grid, Typography, Link } from '@mui/material';
import { CurryShopBtn, CurryCounterBtn } from './styles';

const NotOwnBasketball: React.FC = (): JSX.Element => {
    return (
        <Stack spacing={4}>
            <Typography fontSize={48} fontWeight={700}>
                Select a Basketball
            </Typography>
            <Stack spacing={2}>
                <Typography fontSize={32} fontWeight={700} color="#FFCA21">
                    You currently do not own any Basketballs.
                </Typography>
                <Typography fontSize={16} fontWeight={400} width="70%">
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

export default NotOwnBasketball;
