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
            padding="4px 16px 8px"
            justifyContent="space-between"
            sx={{ background: '#32343F' }}
        >
            <Typography fontSize={16} fontWeight={400}>
                {title}
            </Typography>
            <Typography fontSize={16} fontWeight={700}>
                {value}
            </Typography>
        </Stack>
    );
};

export default CounterBox;
