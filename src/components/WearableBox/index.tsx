import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { Container } from './styles';
import { WearableItemType } from '../../types';
import { useAppContext } from '../../context/AppContext';

type ComponentProps = {
    item: WearableItemType;
    selected?: boolean;
    selectable?: boolean;
    onSelect?: (id: number) => void;
};

const WearableBox: React.FC<ComponentProps> = ({
    item,
    selected = false,
    selectable = false,
    onSelect,
}): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    return (
        <Container
            spacing={2}
            selected={selected}
            onClick={selectable && onSelect && item ? () => onSelect(item.id) : undefined}
            selectable={selectable}
        >
            <Image src={item.url} width={166} height={166} alt="" className="wearable_img" />
            <Stack spacing={1}>
                <Typography fontSize={16} fontWeight={700}>
                    {item.title}
                </Typography>
                <Typography fontSize={16} fontWeight={400} color="#979797">
                    {item.desc}
                </Typography>
            </Stack>
        </Container>
    );
};

export default WearableBox;
