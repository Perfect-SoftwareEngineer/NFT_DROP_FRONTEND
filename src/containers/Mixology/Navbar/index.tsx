import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { BackBtn, NextBtn } from './styles';
import { useAppContext } from '../../../context/AppContext';

type ComponentProps = {
    onSelectNF3BasketballNext: () => void;
    onSelectSerumNext: () => void;
    onFuseEvolve: () => void;
};

const MixologyNavBar: React.FC<ComponentProps> = ({
    onSelectNF3BasketballNext,
    onSelectSerumNext,
    onFuseEvolve,
}): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    let curStep = appState.mixologyCurStep;

    let showBackBtn: boolean = curStep > 0;
    let disableNextBtn: boolean = curStep === 0 && !appState.selectedBasketball;

    const onBack = () => {
        setAppState({ ...appState, mixologyCurStep: curStep - 1 });
    };

    const onNext = () => {
        if (curStep === 0) {
            onSelectNF3BasketballNext();
        } else if (curStep === 1) {
            onSelectSerumNext();
        } else if (curStep === 2) {
            onFuseEvolve();
        }
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
                {curStep < 2 ? 'Next' : 'Fuse'}
            </NextBtn>
        </Stack>
    );
};

export default MixologyNavBar;
