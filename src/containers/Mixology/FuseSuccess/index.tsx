import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppContext } from '../../../context/AppContext';
import { MutantImgBox, GotoLabBtn, BackToMixRoom } from './styles';
import Image from 'next/image';
import Link from 'next/link';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const FuseSuccess: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    const { width, height } = useWindowSize();

    const onBackToMixologyRoom = () => {
        setAppState({
            ...appState,
            mixologyCurStep: 0,
            selectedBasketball: false,
            selectedSerumCount: {},
            selectedSerumId: [],
        });
    };

    return (
        <>
            <Stack alignItems="center" spacing={6} marginX={4}>
                <Typography fontSize={48} fontWeight={700} lineHeight={1} textAlign="center">
                    You have successfully minted your
                    <br />
                    <span style={{ color: '#FFCA21' }}>Basketball Headz Avatar</span>
                </Typography>
                {/* <MutantImgBox marginTop={6}>
                <Image src="/assets/nft-items/mutant.png" width={320} height={320} alt="" className="mutant_img" />
            </MutantImgBox> */}
                <Typography width={{ xs: '90%', md: '30%' }} textAlign="center" lineHeight={1.2}>
                    Please wait up to 24 hours for your Basketball Headz to reveal. Go to the Lab to see all your Under
                    Armour and Steph Curry goods!
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Link href="/lab" passHref>
                        <a rel="noopener noreferrer">
                            <GotoLabBtn>Go to The Lab</GotoLabBtn>
                        </a>
                    </Link>
                    <BackToMixRoom onClick={onBackToMixologyRoom}>Back to the Mixology Room</BackToMixRoom>
                </Stack>
            </Stack>
            <Confetti width={width - 32} height={height - 100} />
        </>
    );
};

export default FuseSuccess;
