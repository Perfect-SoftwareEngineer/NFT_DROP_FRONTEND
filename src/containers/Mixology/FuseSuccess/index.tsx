import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppContext } from '../../../context/AppContext';
import { MutantImgBox, GotoLabBtn, BackToMixRoom, EmailTextField, SubmitBtn } from './styles';
import Link from 'next/link';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { registerEmail } from '../../../services/api/email';
import { validEmail } from '../../../services/common';
import { useWeb3React } from '@web3-react/core';

enum RegisterStatus {
    INIT,
    INPROGRESS,
    SUCCESS,
    FAILED
}

const FuseSuccess: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();
    const { account } = useWeb3React();

    const { width, height } = useWindowSize();

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [regState, setRegState] = useState<RegisterStatus>(RegisterStatus.INIT);

    const onBackToMixologyRoom = () => {
        setAppState({
            ...appState,
            mixologyCurStep: 0,
            selectedBasketball: false,
            selectedSerumCount: {},
            selectedSerumId: []
        });
    };

    const onRegisterEmail = () => {
        setRegState(RegisterStatus.INIT);

        let isEmailValid = validEmail(email);
        setEmailError(!isEmailValid);

        if (isEmailValid) {
            setRegState(RegisterStatus.INPROGRESS);

            registerEmail(account!, email, appState.jwtToken)
                .then(async (response: any) => {
                    console.log('registerEmail response:', response);
                    setRegState(RegisterStatus.SUCCESS);
                })
                .catch((error: any) => {
                    console.log('registerEmail error:', error);
                    setRegState(RegisterStatus.FAILED);
                });
        }
    };

    return (
        <Stack height="100%" justifyContent="center">
            <Stack alignItems="center" spacing={{ xs: 3, md: 6 }} marginX={4} marginTop={{ xs: -34, md: -30 }}>
                <Typography fontSize={48} fontWeight={700} lineHeight={1} textAlign="center">
                    You have successfully minted your
                    <br />
                    <span style={{ color: '#FFCA21' }}>Basketball Headz Avatar</span>
                </Typography>
                {/* <MutantImgBox marginTop={6}>
                    <Image src="/assets/nft-items/mutant.png" width={320} height={320} alt="" className="mutant_img" />
                </MutantImgBox> */}
                <Typography width={{ xs: '100%', md: '40%' }} textAlign="center" lineHeight={1.2}>
                    Avatar generation is done on a First-come-First Serve basis. Your avatar will be created anywhere
                    within 48 hours. Go to the Lab to see all your Under Armour and Steph Curry goods!
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
            <Stack
                position="absolute"
                bottom={{ xs: 20, md: 40 }}
                left={{ xs: 20, md: 0 }}
                right={{ xs: 20, md: 0 }}
                alignItems="center"
            >
                <Stack padding={{ xs: 2, md: 4 }} borderRadius={2} sx={{ background: '#1B1C22' }}>
                    <Typography
                        fontSize={{ xs: 32, md: 48 }}
                        fontWeight={800}
                        lineHeight={1}
                        textAlign="center"
                        className="neueplak_condensed"
                    >
                        RECEIVE EMAIL NOTIFICATION
                    </Typography>
                    <Typography width={{ xs: '100%', md: 576 }} textAlign="center" marginTop={3}>
                        Receive an email notification for when your avatar generation is done. This submission will only
                        notify you of this specific transaction.
                    </Typography>
                    <Stack direction="row" spacing={2} marginTop={3}>
                        <EmailTextField
                            fullWidth
                            value={email}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setEmail(event.target.value);
                            }}
                        />
                        <SubmitBtn onClick={onRegisterEmail}>SUBMIT</SubmitBtn>
                    </Stack>
                    {emailError && (
                        <Typography textAlign="center" color="#EB5757" marginTop={1}>
                            Email address is not valid format.
                        </Typography>
                    )}
                    {regState === RegisterStatus.SUCCESS && (
                        <Typography textAlign="center" color="#4CAF50" marginTop={1}>
                            Email is registered successfully.
                        </Typography>
                    )}
                </Stack>
            </Stack>
            <Confetti width={width - 32} height={height - 100} />
        </Stack>
    );
};

export default FuseSuccess;
