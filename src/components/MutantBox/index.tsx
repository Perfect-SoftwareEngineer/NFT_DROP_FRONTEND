import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { Container } from './styles';
import { MutantItemType } from '../../types';

type ComponentProps = {
    item: MutantItemType;
    selected?: boolean;
    selectable?: boolean;
    onSelect?: (id: number) => void;
};

const MutantBox: React.FC<ComponentProps> = ({ item, selected = false, selectable = false, onSelect }): JSX.Element => {
    return (
        <Container
            spacing={2}
            selected={selected}
            onClick={selectable && onSelect ? () => onSelect(item.id) : undefined}
            selectable={selectable}
        >
            <Image src="/assets/nft-items/mutant.png" width={166} height={166} alt="" className="mutant_img" />
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

export default MutantBox;
