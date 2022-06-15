import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { Container } from './styles';
import { SerumItemType } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { SelectItemType } from '../../types';

type ComponentProps = {
    item?: SelectItemType;
    selected?: boolean;
    selectable?: boolean;
    onSelect?: (id: number) => void;
};

const SerumBox: React.FC<ComponentProps> = ({ item, selected = false, selectable = false, onSelect }): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    return (
        <Container
            spacing={2}
            selected={selected}
            // onClick={selectable && onSelect && item ? () => onSelect(item.id) : undefined}
            selectable={selectable}
        >
            <Image src="/assets/nft-items/serum.png" width={166} height={166} alt="" className="serum_img" />
            <Stack spacing={1}>
                <Typography fontSize={16} fontWeight={700}>
                    {item?.label}
                </Typography>
                <Typography fontSize={16} fontWeight={400} color="#979797">
                    1x
                </Typography>
            </Stack>
        </Container>
    );
};

export default SerumBox;
