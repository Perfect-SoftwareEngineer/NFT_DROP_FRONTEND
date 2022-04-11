import React from 'react';
import { Stack, Box, Typography } from '@mui/material';

type ComponentProps = {
    amount: number;
    label: string;
    headColor: string;
};

const SupplyBox: React.FC<ComponentProps> = ({ amount, label, headColor }): JSX.Element => {
    return (
        <Stack
            width={256}
            height={102}
            direction="row"
            alignItems="center"
            spacing={{ xs: 3, sm: 4, md: 5 }}
            borderRadius={2}
            overflow="hidden"
            sx={{ background: 'black' }}
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
