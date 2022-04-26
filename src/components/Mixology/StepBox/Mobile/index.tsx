import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useAppContext } from '../../../../context/AppContext';

type ComponentProps = {
    step: number;
};

const stepsList = [
    {
        title: 'Select a Basketball',
    },
    {
        title: 'Select up to 3 Serums',
    },
    {
        title: 'Fuse to Evolve',
    },
];

const StepBox: React.FC<ComponentProps> = ({ step }): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    let selected = step === appState.mixologyCurStep;
    let showCompleteIcon = step < 2 && step < appState.mixologyCurStep;

    return (
        <Box position="relative" minWidth={32} height={32}>
            <Image
                src={
                    showCompleteIcon
                        ? '/assets/mixology/mobile/step-complete.svg'
                        : '/assets/mixology/mobile/step-non-complete.svg'
                }
                layout="fill"
                alt=""
            />
            <Stack position="absolute" spacing={1} sx={{ left: 0, top: 48 }}>
                <Typography fontSize={16} fontWeight={400}>
                    {`STEP ${step + 1}`}
                </Typography>
                <Typography width="max-content" fontSize={16} fontWeight={700}>
                    {stepsList[step].title}
                </Typography>
            </Stack>
        </Box>
    );
};

export default StepBox;
