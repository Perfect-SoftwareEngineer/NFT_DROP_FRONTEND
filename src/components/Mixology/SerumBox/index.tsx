import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { Container } from './styles';
import { SerumTokenInfoType } from '../../../types';
import { useAppContext } from '../../../context/AppContext';

type ComponentProps = {
    item: SerumTokenInfoType;
    selected?: boolean;
    onSelect?: (id: number) => void;
};

const SerumBox: React.FC<ComponentProps> = ({ item, selected = false, onSelect }): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    return (
        <Container
            spacing={2}
            selected={selected}
            // onClick={selectable && onSelect && item ? () => onSelect(item.id) : undefined}
        >
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
