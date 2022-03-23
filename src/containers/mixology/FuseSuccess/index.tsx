import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppContext } from '../../../context/AppContext';
import { MutantImgBox, GotoLabBtn, BackToMixRoom } from './styles';
import Image from 'next/image';
import MutantImg from '../../../assets/items/mutant.png';

const FuseSuccess: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    return (
        <Stack justifyContent="center" alignItems="center" minHeight="calc(100vh - 72px)">
            <Typography fontSize={48} fontWeight={700} lineHeight={1.1} textAlign="center">
                You have successfully fused here is your{' '}
                <Typography fontSize={48} fontWeight={700} lineHeight={1.1} color="#FFCA21">
                    Mutant Basketball
                </Typography>
            </Typography>
            <MutantImgBox marginTop={6}>
                <Image src={MutantImg} width={360} height={360} alt="" className="mutant_img" />
            </MutantImgBox>
            <Stack direction="row" spacing={2} marginTop={3.5}>
                <GotoLabBtn>Go to The Lab</GotoLabBtn>
                <BackToMixRoom>Back to the Mixology Room</BackToMixRoom>
            </Stack>
        </Stack>
    );
};

export default FuseSuccess;
