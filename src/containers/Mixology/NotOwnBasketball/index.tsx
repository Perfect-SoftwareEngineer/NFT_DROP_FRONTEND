import React from 'react';
import { Stack, Grid, Typography } from '@mui/material';
import { CurryShopBtn, CurryCounterBtn, OpenseaBtn } from './styles';
import Link from 'next/link';

const NotOwnBasketball: React.FC = (): JSX.Element => {
    return (
        <Stack spacing={{ xs: 3, sm: 4 }} paddingBottom={15}>
            <Typography
                fontSize={48}
                fontWeight={800}
                lineHeight={1}
                textTransform="uppercase"
                className="neueplak_condensed"
            >
                SELECT AN NF3 BASKETBALL
            </Typography>
            <Stack spacing={2}>
                <Typography fontSize={32} fontWeight={700} lineHeight={1.1} color="#FFCA21">
                    You currently do not own any NF3 Basketballs.
                </Typography>
                <Typography width={{ xs: '100%', sm: '85%', md: '70%' }}>
                    You cannot start the Mixology process without owning an NF3 Basketball. Purchase an NF3 Basketball
                    from the secondary market in Opensea.
                </Typography>
            </Stack>
            {/* <Stack direction="row" spacing={1}>
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
            </Stack> */}
            <Stack width="fit-content">
                <Link href="https://opensea.io/collection/nf3-basketball" passHref>
                    <a target="_blank" rel="noopener noreferrer">
                        <CurryShopBtn>OpenSea</CurryShopBtn>
                    </a>
                </Link>
            </Stack>
        </Stack>
    );
};

export default NotOwnBasketball;
