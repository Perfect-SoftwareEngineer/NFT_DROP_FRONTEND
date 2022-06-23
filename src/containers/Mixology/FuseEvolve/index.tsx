import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppContext } from '../../../context/AppContext';
import BasketballBox from '../../../components/Mixology/BasketballBox';
import SerumBox from '../../../components/Mixology/SerumBox';

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
            <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent={{ xs: 'center', sm: 'flex-start' }}
                paddingBottom={20}
                columnGap={3}
                rowGap={3}
            >
                {/* <BasketballBox
                    item={appState.basketballsList.find((item) => item.id === appState.selectedBasketballId)}
                    selected={true}
                />
                {appState.selectedSerumId
                    .sort((a, b) => a - b)
                    .map((serumId) => (
                        <SerumBox item={appState.serumsList.find((item) => item.id === serumId)} selected={true} />
                    ))} */}
            </Stack>
        </Stack>
    );
};

export default FuseEvolve;
