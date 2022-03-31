import React from 'react';
import { Stack, Grid, Typography } from '@mui/material';
import BasketballBox from '../../../components/BasketballBox';
import { useAppContext } from '../../../context/AppContext';

const SelectBasketball: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    const onItemSelect = (id: number) => {
        let selectedId = id;
        if (appState.selectedBasketballId === id) selectedId = -1;
        setAppState({ ...appState, selectedBasketballId: selectedId });
    };

    return (
        <Stack spacing={4}>
            <Typography fontSize={48} fontWeight={700}>
                Select a Basketball
            </Typography>
            <Stack direction="row" spacing={3}>
                {appState.basketballsList.map((item) => (
                    <BasketballBox
                        item={item}
                        selected={appState.selectedBasketballId === item.id}
                        selectable
                        onSelect={onItemSelect}
                    />
                ))}
            </Stack>
        </Stack>
    );
};

export default SelectBasketball;
