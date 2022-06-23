import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Container } from './styles';
import { BasketballTokenInfoType } from '../../../types';
import { useAppContext } from '../../../context/AppContext';

type ComponentProps = {
    data: BasketballTokenInfoType;
};

const BasketballBox: React.FC<ComponentProps> = ({ data }): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    let selected = appState.selectedBasketball;

    const onSelect = () => {
        setAppState({ ...appState, selectedBasketball: !selected });
    };

    return (
        <Container spacing={2} selected={selected} onClick={onSelect}>
            <img src={data.image} width={166} height={166} alt="" className="basketball_img" />
            <Stack spacing={1}>
                <Typography fontSize={16} fontWeight={700}>
                    {data.title}
                </Typography>
                <Typography fontSize={16} fontWeight={400} color="#979797">
                    You own {data.count}
                </Typography>
            </Stack>
        </Container>
    );
};

export default BasketballBox;
