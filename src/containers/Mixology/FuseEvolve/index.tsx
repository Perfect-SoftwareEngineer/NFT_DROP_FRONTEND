import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppContext } from '../../../context/AppContext';
import BasketballBox from '../../../components/Mixology/FuseEvolve/BasketballBox';
import SerumBox from '../../../components/Mixology/FuseEvolve/SerumBox';

const FuseEvolve: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    React.useEffect(() => {
        let selectedSerumId: string[] = [];
        Object.keys(appState.selectedSerumCount).map((key) => {
            let count = appState.selectedSerumCount[key];
            selectedSerumId = [...selectedSerumId, ...Array(count).fill(key)];
        });
        setAppState({ ...appState, selectedSerumId });
    }, []);

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
                <BasketballBox />
                {appState.selectedSerumId
                    // .sort((a, b) => a - b)
                    .map((tokenId, index) => (
                        <SerumBox tokenId={tokenId} key={`serum_box_key_${index}`} />
                    ))}
            </Stack>
        </Stack>
    );
};

export default FuseEvolve;
