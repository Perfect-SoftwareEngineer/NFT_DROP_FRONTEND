import React from 'react';
import { Stack, Typography } from '@mui/material';
import { CurryShopBtn, CurryCounterBtn, OpenseaBtn } from './styles';
import Link from 'next/link';

const NotOwnSerum: React.FC = (): JSX.Element => {
    return (
        <Stack spacing={{ xs: 3, sm: 4 }} paddingBottom={15}>
            <Stack spacing={2}>
                <Typography
                    fontSize={48}
                    fontWeight={800}
                    lineHeight={1}
                    textTransform="uppercase"
                    className="neueplak_condensed"
                >
                    Select up to 3 Serums
                </Typography>
                <Typography width={{ xs: '100%', sm: '85%', md: '70%' }}>
                    <b>Note:</b> Every serum selected guarantees your avatar will have one trait from the serum type
                    selected, with a possibility of two traits.
                </Typography>
            </Stack>
            <Stack spacing={2}>
                <Typography fontSize={32} fontWeight={700} lineHeight={1.1} color="#FFCA21">
                    You currently do not own any Serums.
                </Typography>
                <Typography fontSize={16} fontWeight={400} width={{ xs: '100%', sm: '85%', md: '70%' }}>
                    You do not own any Serums, but Serums are not required. However, if you want to customize your
                    avatar, you can purchase Community Serums through OpenSea.
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
                <Link href="https://opensea.io/collection/basketball-headz-serums" passHref>
                    <a target="_blank" rel="noopener noreferrer">
                        <CurryShopBtn>OpenSea</CurryShopBtn>
                    </a>
                </Link>
            </Stack>
        </Stack>
    );
};

export default NotOwnSerum;
