import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppContext } from '../../../context/AppContext';

const FuseSuccess: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    return (
        <Stack>
            <Typography fontSize={48} fontWeight={700} lineHeight={1.1} textAlign="center">
                You have successfully fused here is your{' '}
                <Typography fontSize={48} fontWeight={700} lineHeight={1.1} color="#FFCA21">
                    Mutant Basketball
                </Typography>
            </Typography>
        </Stack>
    );
};

export default FuseSuccess;
