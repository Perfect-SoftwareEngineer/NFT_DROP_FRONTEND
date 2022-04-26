import React from 'react';
import { Stack, Typography } from '@mui/material';

type ComponentProps = {
    title: string;
    value: number;
};

const CounterBox: React.FC<ComponentProps> = ({ title, value }): JSX.Element => {
    return (
        <Stack
            direction="row"
            width={265}
            height={38}
            padding="0 16px"
            justifyContent="space-between"
            alignItems="center"
            sx={{ background: '#32343F' }}
        >
            <Typography fontSize={{ xs: 14, sm: 16 }} fontWeight={400}>
                {title}
            </Typography>
            <Typography fontSize={{ xs: 14, sm: 16 }} fontWeight={700}>
                {value}
            </Typography>
        </Stack>
    );
};

export default CounterBox;
