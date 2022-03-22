import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppContext } from '../../../context/AppContext';
import BasketballBox from '../../../components/BasketballBox';
import SerumBox from '../../../components/SerumBox';

const FuseEvolve: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    return (
        <Stack spacing={3}>
            <Stack spacing={2}>
                <Typography fontSize={48} fontWeight={700}>
                    Fuse to Evolve
                </Typography>
                <Typography fontSize={16} fontWeight={500} width={480}>
                    Make sure you have selected the correct components.{' '}
                    <Typography fontSize={16} fontWeight={700} display="inline">
                        Once you fuse, you cannot unfuse your Mutant Basketball.
                    </Typography>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={3}>
                <BasketballBox item={appState.basketballsList[appState.selectedBasketballId]} />
                {appState.selectedSerumId
                    .sort((a, b) => a - b)
                    .map((item) => (
                        <SerumBox item={appState.serumsList[item]} />
                    ))}
            </Stack>
        </Stack>
    );
};

export default FuseEvolve;
