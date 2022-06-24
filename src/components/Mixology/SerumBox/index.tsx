import React, { useState, useRef } from 'react';
import { Stack, Box, Button, Typography } from '@mui/material';
import { Container, AddTokenBox } from './styles';
import { SerumTokenInfoType } from '../../../types';
import { useAppContext } from '../../../context/AppContext';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

type ComponentProps = {
    item: SerumTokenInfoType;
};

const SerumBox: React.FC<ComponentProps> = ({ item }): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    const nodeTokenBox = useRef<HTMLDivElement>(null);
    const [showTokenBox, setShowTokenBox] = useState<boolean>(false);
    useOnClickOutside(nodeTokenBox, () => setShowTokenBox(false));

    let count = !!appState.selectedSerumCount[item.tokenId] ? appState.selectedSerumCount[item.tokenId] : 0;
    let totalSelectedCount =
        Object.keys(appState.selectedSerumCount).length > 0
            ? Object.values(appState.selectedSerumCount).reduce((prev, cur) => prev + cur)
            : 0;

    const onAddToken = () => {
        if (count < item.count && totalSelectedCount < 3) {
            let newData = { ...appState.selectedSerumCount };
            newData[item.tokenId] = count + 1;
            setAppState({ ...appState, selectedSerumCount: newData });
        }
    };

    const onDeleteToken = () => {
        let newData = { ...appState.selectedSerumCount };
        delete newData[item.tokenId];
        setAppState({ ...appState, selectedSerumCount: newData });
    };

    return (
        <Container spacing={2} selected={count > 0}>
            <img src={item.image} width={166} height={210} alt="" className="serum_img" />
            <Stack spacing={1}>
                <Typography fontSize={16} fontWeight={700}>
                    {item.title}
                </Typography>
                <Typography fontSize={16} fontWeight={400} color="#979797">
                    {item.count}
                </Typography>
            </Stack>
            <AddTokenBox direction="row-reverse" spacing={2} ref={nodeTokenBox} count={count}>
                <Stack sx={{ cursor: 'pointer' }} onClick={onAddToken}>
                    <AddIcon sx={{ fontSize: 22 }} className="add_icon" />
                    <Typography className="count_label">{count}</Typography>
                </Stack>
                <Typography padding="0 0 4px">{count}</Typography>
                <Stack sx={{ cursor: 'pointer' }} onClick={onDeleteToken}>
                    <DeleteIcon sx={{ color: 'white', fontSize: 20 }} />
                </Stack>
            </AddTokenBox>
        </Container>
    );
};

export default SerumBox;
