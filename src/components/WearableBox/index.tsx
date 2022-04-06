import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { Container } from './styles';
import { SerumItemType } from '../../types';
import { useAppContext } from '../../context/AppContext';

type ComponentProps = {
    item?: SerumItemType;
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
            <Image src="/assets/nft-items/decentraland.png" width={166} height={166} alt="" className="wearable_img" />
            <Stack spacing={1}>
                <Typography fontSize={16} fontWeight={700}>
                    Genesis Curry Flow
                </Typography>
                <Typography fontSize={16} fontWeight={400} color="#979797">
                    Sandbox
                </Typography>
            </Stack>
        </Container>
    );
};

export default WearableBox;
