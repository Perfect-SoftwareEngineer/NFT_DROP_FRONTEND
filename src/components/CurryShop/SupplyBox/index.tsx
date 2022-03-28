import React from 'react';
import { Stack, Box, Typography } from '@mui/material';

type ComponentProps = {
    type: number;
    amount: number;
};

const styles = [
    { headColor: '#FFCA21', label: 'Basketballs supply' },
    { headColor: '#B8FF97', label: 'Serum supply' },
];

const SupplyBox: React.FC<ComponentProps> = ({ type, amount }): JSX.Element => {
    return (
        <Stack
            width={256}
            height={102}
            direction="row"
            alignItems="center"
            spacing={5}
            borderRadius={2}
            overflow="hidden"
            sx={{ background: 'black' }}
        >
            <Box width={8} height="100%" sx={{ background: styles[type].headColor }}></Box>
            <Stack>
                <Typography fontSize={32} fontWeight={700} lineHeight={1.1} color="white">
                    {amount.toLocaleString()}
                </Typography>
                <Typography fontSize={16} fontWeight={400} lineHeight={1.1} color="#979797">
                    {styles[type].label}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default SupplyBox;
