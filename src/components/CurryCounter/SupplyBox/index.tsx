import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { SxProps } from '@mui/system';

type ComponentProps = {
    amount: number;
    label: string;
    bgColor?: string;
    headColor: string;
    sx?: SxProps;
};

const SupplyBox: React.FC<ComponentProps> = ({ amount, label, bgColor = 'black', headColor, sx }): JSX.Element => {
    return (
        <Stack
            height={102}
            direction="row"
            alignItems="center"
            spacing={{ xs: 3, sm: 4, md: 5 }}
            borderRadius={2}
            overflow="hidden"
            sx={{ flexGrow: 1, background: bgColor, ...sx }}
        >
            <Box width={8} height="100%" sx={{ background: headColor }}></Box>
            <Stack>
                <Typography fontSize={32} fontWeight={700} lineHeight={1.1} color="white">
                    {amount.toLocaleString()}
                </Typography>
                <Typography fontSize={16} fontWeight={400} lineHeight={1.1} color="#979797">
                    {label}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default SupplyBox;
