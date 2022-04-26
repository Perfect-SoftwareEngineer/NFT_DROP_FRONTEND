import React from 'react';
import { Stack, Grid } from '@mui/material';
import Image from 'next/image';
import { RaffleWinnerItemType } from '../../../types';
import { Typo, AddressTypo } from './styles';
import { reduceHexAddress } from '../../../services/common';

type ComponentProps = {
    data: RaffleWinnerItemType;
    index: number;
};

const RaffleWinnerItem: React.FC<ComponentProps> = ({ data, index }): JSX.Element => {
    return (
        <Grid item container columns={{ xs: 7, md: 14 }} alignItems="center">
            <Grid item xs={1}>
                <Typo>{index + 1}</Typo>
            </Grid>
            <Grid item xs={3}>
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                    <Image
                        src={'/assets/currycounter/curry-brand.png'}
                        width={32}
                        height={32}
                        style={{ borderRadius: '50%' }}
                    />
                    <Typo>Basketball</Typo>
                </Stack>
            </Grid>
            <Grid item xs={3} display={{ xs: 'none', md: 'block' }}>
                <Typo>{data.createdAt.slice(0, 10)}</Typo>
            </Grid>
            <Grid item xs={3} md={5}>
                {data.wallet ? <AddressTypo>{reduceHexAddress(data.wallet, 4)}</AddressTypo> : <Typo>-</Typo>}
            </Grid>
            <Grid item xs={2} display={{ xs: 'none', md: 'block' }}>
                <Typo>{data.claimed ? 'Minted' : 'Reserved'}</Typo>
            </Grid>
        </Grid>
    );
};

export default RaffleWinnerItem;
