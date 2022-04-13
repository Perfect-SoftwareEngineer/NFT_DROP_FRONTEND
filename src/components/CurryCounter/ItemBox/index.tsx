import React from 'react';
import { Stack, Grid, Typography } from '@mui/material';
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
            columns={{ xs: 12, md: 24 }}
            alignItems="center"
            columnSpacing={2}
            rowGap={3}
            padding={2}
            borderRadius={2}
            sx={{ background: '#1B1C22' }}
        >
            <Grid item xs={12} md={9}>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Image
                        src="/assets/nft-items/basketball.png"
                        width={80}
                        height={80}
                        alt=""
                        style={{ borderRadius: 8 }}
                    />
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
            <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                    <Typography fontSize={16} fontWeight={600} color="#979797" display={{ xs: 'block', md: 'none' }}>
                        Opponent Team
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Image src={data.opponentTeamLogo} width={40} height={40} alt="" />
                        <Typography fontSize={16} fontWeight={600} color="white">
                            {data.opponentTeam}
                        </Typography>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={4} md={3}>
                <Stack spacing={1}>
                    <Typography fontSize={16} fontWeight={600} color="#979797" display={{ xs: 'block', md: 'none' }}>
                        Date
                    </Typography>
                    <Typography fontSize={16} fontWeight={600} color="white" textAlign={{ xs: 'left', md: 'right' }}>
                        {data.date}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={4} md={3}>
                <Stack spacing={1}>
                    <Typography fontSize={16} fontWeight={600} color="#979797" display={{ xs: 'block', md: 'none' }}>
                        Cost
                    </Typography>
                    <Typography fontSize={16} fontWeight={600} color="white" textAlign={{ xs: 'left', md: 'right' }}>
                        {`${data.cost} ETH`}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={4} display={{ xs: 'block', md: 'none' }}></Grid>
            <Grid item xs={3} display="flex" flexDirection="row" justifyContent={{ xs: 'auto', md: 'flex-end' }}>
                <ReserveBtn disabled={data.reserveDisabled}>RESERVE</ReserveBtn>
            </Grid>
            <Grid item xs={2} md={1} display="flex" flexDirection="row" justifyContent={{ xs: 'auto', md: 'flex-end' }}>
                <InfoIcon />
            </Grid>
        </Grid>
    );
};

export default CurryCounterItem;
