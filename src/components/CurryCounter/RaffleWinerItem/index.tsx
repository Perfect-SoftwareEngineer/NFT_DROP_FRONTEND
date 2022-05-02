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
    let date = new Date(data.updatedAt);
    const pst = date.toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
    });

    return (
        <Grid item container columns={{ xs: 7, md: 14 }} alignItems="center">
            <Grid item xs={1}>
                <Typo>{index}</Typo>
            </Grid>
            <Grid item xs={3}>
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                    <Image
                        src={'/assets/currycounter/curry-brand.png'}
                        width={32}
                        height={32}
                        style={{ borderRadius: '50%' }}
                    />
                    <Typo>NF3 Basketball</Typo>
                </Stack>
            </Grid>
            <Grid item xs={4} display={{ xs: 'none', md: 'block' }}>
                <Typo>{pst}</Typo>
            </Grid>
            <Grid item xs={3} md={4}>
                {data.wallet ? <AddressTypo>{reduceHexAddress(data.wallet, 4)}</AddressTypo> : <Typo>-</Typo>}
            </Grid>
            <Grid item xs={2} display={{ xs: 'none', md: 'block' }}>
                <Typo>{data.claimed ? 'Minted' : 'Reserved'}</Typo>
            </Grid>
        </Grid>
    );
};

export default RaffleWinnerItem;
