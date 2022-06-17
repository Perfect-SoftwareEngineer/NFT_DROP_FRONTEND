import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Container } from './styles';
import { SerumTokenInfoType } from '../../../types';

type ComponentProps = {
    item: SerumTokenInfoType;
};

const SerumBox: React.FC<ComponentProps> = ({ item }): JSX.Element => {
    return (
        <Container spacing={2}>
            <img src={item.image} width={166} height={210} alt="" className="serum_img" />
            <Stack spacing={1}>
                <Typography fontSize={16} fontWeight={700}>
                    {item.title}
                </Typography>
                <Typography fontSize={16} fontWeight={400} color="#979797">
                    {item.count}
                </Typography>
            </Stack>
        </Container>
    );
};

export default SerumBox;
