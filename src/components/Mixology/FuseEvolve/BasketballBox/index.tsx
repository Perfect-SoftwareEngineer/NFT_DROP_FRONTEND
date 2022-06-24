import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Container } from './styles';
import basketballTokenData from '../../../../constants/basketballTokenData';

type ComponentProps = {};

const BasketballBox: React.FC<ComponentProps> = (): JSX.Element => {
    return (
        <Container justifyContent="space-between" spacing={2} selected>
            <img src={basketballTokenData.image} width={166} height={166} alt="" className="basketball_img" />
            <Stack spacing={1}>
                <Typography fontSize={16} fontWeight={700}>
                    {basketballTokenData.title}
                </Typography>
                {/* <Typography fontSize={16} fontWeight={400} color="#979797">
                    You own {data.count}
                </Typography> */}
            </Stack>
        </Container>
    );
};

export default BasketballBox;
