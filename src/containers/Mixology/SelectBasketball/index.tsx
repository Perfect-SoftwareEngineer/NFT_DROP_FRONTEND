import React from 'react';
import { Stack, Typography } from '@mui/material';
import BasketballBox from '../../../components/Mixology/BasketballBox';
import { BasketballTokenInfoType } from '../../../types';

type ComponentProps = {
    data: BasketballTokenInfoType;
};

const SelectBasketball: React.FC<ComponentProps> = ({ data }): JSX.Element => {
    return (
        <Stack spacing={4}>
            <Typography
                fontSize={48}
                fontWeight={800}
                lineHeight={1}
                textTransform="uppercase"
                className="neueplak_condensed"
            >
                Select a Basketball
            </Typography>
            <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent={{ xs: 'center', sm: 'flex-start' }}
                paddingBottom={20}
                columnGap={3}
                rowGap={3}
            >
                <BasketballBox data={data} />
            </Stack>
        </Stack>
    );
};

export default SelectBasketball;
