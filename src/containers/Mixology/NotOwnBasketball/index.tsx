import React from 'react';
import { Stack, Grid, Typography } from '@mui/material';
import { CurryShopBtn, CurryCounterBtn } from './styles';
import Link from 'next/link';

const NotOwnBasketball: React.FC = (): JSX.Element => {
    return (
        <Stack spacing={{ xs: 3, sm: 4 }} paddingBottom={15}>
            <Typography fontSize={48} fontWeight={700} lineHeight={1}>
                Select a Basketball
            </Typography>
            <Stack spacing={2}>
                <Typography fontSize={32} fontWeight={700} lineHeight={1.1} color="#FFCA21">
                    You currently do not own any Basketballs.
                </Typography>
                <Typography fontSize={16} fontWeight={400} width={{ xs: '100%', sm: '85%', md: '70%' }}>
                    You cannot start the Mixology process without owning a Basketball or Serum. You can either mint a
                    Basketball or Serum, mint after every 3 point shot Stephen Curry makes, or buy them off the
                    secondary market in{' '}
                    <a href="https://opensea.io/" target="_blank" style={{ color: '#FFCA21' }}>
                        Opensea
                    </a>
                    .
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
                <Link href="/curryshop" passHref>
                    <a rel="noopener noreferrer">
                        <CurryShopBtn>Curry Shop</CurryShopBtn>
                    </a>
                </Link>
                <Link href="/currycounter" passHref>
                    <a rel="noopener noreferrer">
                        <CurryCounterBtn>Curry Counter</CurryCounterBtn>
                    </a>
                </Link>
            </Stack>
        </Stack>
    );
};

export default NotOwnBasketball;
