import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppContext } from '../../../context/AppContext';
import SerumBox from '../../../components/SerumBox';

const SelectSerum: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    return (
        <Stack spacing={3}>
            <Stack spacing={2}>
                <Typography fontSize={48} fontWeight={700}>
                    Select up to 3 Serums
                </Typography>
                <Typography fontSize={16} fontWeight={500} width={480}>
                    <Typography fontSize={16} fontWeight={700} display="inline">
                        Note:
                    </Typography>{' '}
                    Every Serum selected guarentees you 2 traits of the Serum Type you select. So if you select 3
                    serums, you get 6 traits.
                </Typography>
            </Stack>
            <Stack spacing={2}>
                <Typography fontSize={16} fontWeight={700}>
                    Currently{' '}
                    <Typography fontSize={16} fontWeight={700} display="inline" color="#FFCA21">
                        {`${appState.selectedSerumId.length} Serums`}
                    </Typography>{' '}
                    selected.
                </Typography>
                <Stack direction="row" spacing={3}>
                    {appState.serumsList.map((item) => (
                        <SerumBox item={item} selectable />
                    ))}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default SelectSerum;
