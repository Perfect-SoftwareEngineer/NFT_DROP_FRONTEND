import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Container } from './styles';
import { BasketballTokenInfoType } from '../../../types';

type ComponentProps = {
    item: BasketballTokenInfoType;
};

const BasketballBox: React.FC<ComponentProps> = ({ item }): JSX.Element => {
    return (
        <Container
            selectable
            spacing={2}
            onClick={() => window.open('https://opensea.io/collection/nf3-basketball', '_blank', 'noopener,noreferrer')}
        >
            <img src={item.image} width={166} height={166} alt="" className="basketball_img" />
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

export default BasketballBox;
