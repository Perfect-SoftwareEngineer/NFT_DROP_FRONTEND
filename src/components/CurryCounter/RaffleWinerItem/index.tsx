import React from 'react';
import { Stack, Grid } from '@mui/material';
import Image from 'next/image';
import { RaffleWinnerItemType } from '../../../types';
import { Typo, AddressTypo } from './styles';
import { reduceHexAddress } from '../../../services/common';

type ComponentProps = {
    data: RaffleWinnerItemType;
};

const RaffleWinnerItem: React.FC<ComponentProps> = ({ data }): JSX.Element => {
    return (
        <Grid item container columns={14} alignItems="center">
            <Grid item xs={1}>
                <Typo>{data.id}</Typo>
            </Grid>
            <Grid item xs={3}>
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                    <Image src={data.url} width={32} height={32} style={{ borderRadius: '50%' }} />
                    <Typo>{data.name}</Typo>
                </Stack>
            </Grid>
            <Grid item xs={3}>
                <Typo>{data.date}</Typo>
            </Grid>
            <Grid item xs={5}>
                {data.address ? <AddressTypo>{reduceHexAddress(data.address, 4)}</AddressTypo> : <Typo>-</Typo>}
            </Grid>
            <Grid item xs={2}>
                <Typo>{data.status}</Typo>
            </Grid>
        </Grid>
    );
};

export default RaffleWinnerItem;
