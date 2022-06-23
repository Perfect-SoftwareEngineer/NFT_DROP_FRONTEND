import React from 'react';
import { Stack, Typography } from '@mui/material';
import BasketballBox from '../../../components/Mixology/BasketballBox';
import { useAppContext } from '../../../context/AppContext';
import { BasketballTokenInfoType } from '../../../types';

type ComponentProps = {
    data: BasketballTokenInfoType;
};

const SelectBasketball: React.FC<ComponentProps> = ({ data }): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    const onItemSelect = (selected: boolean) => {
        setAppState({ ...appState, selectedBasketball: selected });
    };

    return (
        <Stack spacing={4}>
            <Typography fontSize={48} fontWeight={700}>
                Select a Basketball
            </Typography>
            <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent={{ xs: 'center', sm: 'flex-start' }}
                paddingBottom={20}
                columnGap={3}
                rowGap={3}
            >
                <BasketballBox data={data} selected={appState.selectedBasketball} onSelect={onItemSelect} />
            </Stack>
        </Stack>
    );
};

export default SelectBasketball;
