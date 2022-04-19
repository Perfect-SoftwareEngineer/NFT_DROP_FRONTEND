import React from 'react';
import { Stack, Grid } from '@mui/material';
import Image from 'next/image';
import { RaffleWinnerItemType } from '../../../types';
import { Typo, AddressTypo } from './styles';

type ComponentProps = {
    data?: RaffleWinnerItemType;
};

const RaffleWinnerItem: React.FC<ComponentProps> = ({ data }): JSX.Element => {
    return (
        <Grid item container columns={14} alignItems="center" rowGap={3}>
            <Grid item xs={1}>
                <Typo>1</Typo>
            </Grid>
            <Grid item xs={3}>
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                    <Image
                        src="/assets/currycounter/curry-brand.png"
                        width={32}
                        height={32}
                        style={{ borderRadius: '50%' }}
                    />
                    <Typo>Basketball</Typo>
                </Stack>
            </Grid>
            <Grid item xs={3}>
                <Typo>23/04/22</Typo>
            </Grid>
            <Grid item xs={5}>
                <AddressTypo>0x3ace...0fbd</AddressTypo>
            </Grid>
            <Grid item xs={2}>
                <Typo>Available</Typo>
            </Grid>
        </Grid>
    );
};

export default RaffleWinnerItem;
