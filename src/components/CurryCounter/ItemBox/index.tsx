import React from 'react';
import { Stack, Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { ReserveBtn } from './styles';
import InfoIcon from '../../../assets/currycounter/info.svg';
import { CurryCounterItemType } from '../../../types';

type ComponentProps = {
    data: CurryCounterItemType;
};

const CurryCounterItem: React.FC<ComponentProps> = ({ data }): JSX.Element => {
    return (
        <Grid
            item
            container
            columns={24}
            alignItems="center"
            columnSpacing={2}
            padding={2}
            borderRadius={2}
            sx={{ background: '#1B1C22' }}
        >
            <Grid item xs={9}>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Box width={80} height={80} borderRadius={2} position="relative" overflow="hidden">
                        <Image src="/assets/nft-items/basketball.png" layout="fill" alt="" />
                    </Box>
                    <Stack spacing={0.5}>
                        <Typography fontSize={16} fontWeight={600} color="white">
                            {data.name}
                        </Typography>
                        <Typography fontSize={14} fontWeight={400} color="white">
                            {data.label}
                        </Typography>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Image src={data.opponentTeamLogo} width={40} height={40} alt="" />
                    <Typography fontSize={16} fontWeight={600} color="white">
                        {data.opponentTeam}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={3}>
                <Typography fontSize={16} fontWeight={600} color="white" textAlign="right">
                    {data.date}
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography fontSize={16} fontWeight={600} color="white" textAlign="right">
                    {`${data.cost} ETH`}
                </Typography>
            </Grid>
            <Grid item xs={4} display="flex" flexDirection="row" justifyContent="flex-end">
                <ReserveBtn disabled={data.reserveDisabled}>RESERVE</ReserveBtn>
            </Grid>
            <Grid item xs={1} display="flex" flexDirection="row" justifyContent="center">
                <InfoIcon />
            </Grid>
        </Grid>
    );
};

export default CurryCounterItem;
