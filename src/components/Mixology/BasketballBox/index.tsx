import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Container } from './styles';
import { BasketballTokenInfoType } from '../../../types';
import { useAppContext } from '../../../context/AppContext';

type ComponentProps = {
    data: BasketballTokenInfoType;
    selected?: boolean;
    onSelect: (selected: boolean) => void;
};

const BasketballBox: React.FC<ComponentProps> = ({ data, selected = false, onSelect }): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    return (
        <Container spacing={2} selected={selected} onClick={() => onSelect(!selected)}>
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
