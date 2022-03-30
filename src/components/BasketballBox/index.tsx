import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { Container } from './styles';
import BasketballImg from '../../assets/items/basketball.png';
import { BasketballItemType } from '../../types';
import { useAppContext } from '../../context/AppContext';

type ComponentProps = {
    item: BasketballItemType;
    selectable?: boolean;
};

const BasketballBox: React.FC<ComponentProps> = ({ item, selectable = false }): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    const onItemselect = () => {
        let selectedId = item.id;
        if (appState.selectedBasketballId === item.id) selectedId = -1;
        setAppState({ ...appState, selectedBasketballId: selectedId });
    };

    return (
        <Container
            spacing={2}
            selected={appState.selectedBasketballId === item.id}
            onClick={selectable ? onItemselect : undefined}
            selectable={selectable}
        >
            <Image src={BasketballImg} width={166} height={166} alt="" className="basketball_img" />
            <Stack spacing={1}>
                <Typography fontSize={16} fontWeight={700}>
                    {item.title}
                </Typography>
                <Typography fontSize={16} fontWeight={400} color="#979797">
                    No traits
                </Typography>
            </Stack>
        </Container>
    );
};

export default BasketballBox;
