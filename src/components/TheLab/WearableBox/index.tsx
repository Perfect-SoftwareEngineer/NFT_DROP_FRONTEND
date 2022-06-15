import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Container } from './styles';
import { MetaverseShoesTokenInfoType } from '../../../types';

type ComponentProps = {
    data: MetaverseShoesTokenInfoType;
};

const WearableBox: React.FC<ComponentProps> = ({ data }): JSX.Element => {
    return (
        <Container spacing={2}>
            <img src={data.image} width={166} height={166} alt="" className="wearable_img" />
            <Stack spacing={1}>
                <Typography fontSize={16} fontWeight={700}>
                    {data.title}
                </Typography>
                <Typography fontSize={16} fontWeight={400} color="#979797">
                    {data.count}
                </Typography>
            </Stack>
        </Container>
    );
};

export default WearableBox;
