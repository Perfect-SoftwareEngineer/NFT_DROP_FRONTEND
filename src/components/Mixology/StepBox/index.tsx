import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';
import StepCompleteIcon from '../../../assets/mixology/step-complete.svg';
import { useAppContext } from '../../../context/AppContext';

type ComponentProps = {
    step: number;
};

const stepsList = [
    { img: '/assets/mixology/basketball.png', title: 'Select an NF3 Basketball' },
    { img: '/assets/mixology/serum.png', title: 'Select up to 3 Serums' },
    { img: '/assets/mixology/mutant.png', title: 'Fuse to Mutate' },
];

const StepBox: React.FC<ComponentProps> = ({ step }): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    let selected = step === appState.mixologyCurStep;
    let showCompleteIcon = step < 2 && step < appState.mixologyCurStep;

    return (
        <Stack
            direction="row"
            alignItems="center"
            padding={2}
            paddingRight={4}
            spacing={3}
            borderRadius={2}
            sx={{ background: selected ? '#FFCA21' : '#1B1C22' }}
        >
            <Box width={80} height={80} borderRadius={2} overflow="hidden">
                <Image src={stepsList[step].img} width={80} height={80} alt="" />
            </Box>
            <Stack flexGrow={1}>
                <Typography fontSize={16} fontWeight={400} color={selected ? 'black' : 'white'}>
                    {`STEP ${step + 1}`}
                </Typography>
                <Typography fontSize={16} fontWeight={700} color={selected ? 'black' : 'white'}>
                    {stepsList[step].title}
                </Typography>
            </Stack>
            <Box display={showCompleteIcon ? 'block' : 'none'}>
                <StepCompleteIcon />
            </Box>
        </Stack>
    );
};

export default StepBox;
