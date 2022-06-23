import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { BackBtn, NextBtn } from './styles';
import { useAppContext } from '../../../context/AppContext';

const MixologyNavBar: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    let showBackBtn: boolean = appState.mixologyCurStep > 0;
    let disableNextBtn: boolean =
        (appState.mixologyCurStep === 0 && !appState.selectedBasketball) ||
        (appState.mixologyCurStep === 1 && appState.selectedSerumId.length === 0);

    const onBack = () => {
        setAppState({ ...appState, mixologyCurStep: appState.mixologyCurStep - 1 });
    };

    const onNext = () => {
        setAppState({ ...appState, mixologyCurStep: appState.mixologyCurStep + 1 });
    };

    return (
        <Stack
            position="fixed"
            bottom={0}
            width="100%"
            height={120}
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ background: '#1B1C22' }}
        >
            <BackBtn sx={{ display: showBackBtn ? 'inline-flex' : 'none' }} onClick={onBack}>
                Back
            </BackBtn>
            <NextBtn disabled={disableNextBtn} onClick={onNext}>
                Next
            </NextBtn>
        </Stack>
    );
};

export default MixologyNavBar;
