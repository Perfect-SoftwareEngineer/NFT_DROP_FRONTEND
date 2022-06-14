import React, { useState } from 'react';
import { Stack, Typography, Link } from '@mui/material';
import Container from '../Container';
import { CodeInputField, ConnectWalletBtn, SubmitBtn } from './styles';
import CompleteIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { useWeb3React } from '@web3-react/core';
import { connect } from '../../web3/connect';
import { getStatus, getFtx, setFtx } from '../../services/api/ftx';
import { useAppContext } from '../../context/AppContext';
import { reduceHexAddress } from '../../services/common';

enum SubmitResult {
    NONE,
    SUCCESS,
    CODE_INVALID,
    CODE_ALREADY_USED,
}

const FTXHoldersPageContainer: React.FC = (): JSX.Element => {
    const { active, account, library, activate } = useWeb3React();
    const [appState, setAppState] = useAppContext();
    const [ftxInfo, setFtxInfo] = useState<any>();
    const [code, setCode] = useState<string>('');
    const [submitResult, setSubmitResult] = useState<SubmitResult>(SubmitResult.NONE);
    const [enableSubmit, setEnableSubmit] = useState<boolean>(false);

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    };

    const onSubmit = () => {
        if (!account) return;

        setFtx(account, code, appState.jwtToken)
            .then((response: any) => {
                // console.log('setFtx response:', response);
                setSubmitResult(SubmitResult.SUCCESS);
            })
            .catch((error: any) => {
                // console.log('error:', error);
                if (error === 'Code invalid') {
                    setSubmitResult(SubmitResult.CODE_INVALID);
                } else if (error === 'Code already used') {
                    setSubmitResult(SubmitResult.CODE_ALREADY_USED);
                }
            });
    };

    React.useEffect(() => {
        async function updateAppState() {
            const response = await getStatus();
            setEnableSubmit(response);
        }

        updateAppState();
    }, []);

    // React.useEffect(() => {
    //     async function updateAppState() {
    //         if (!account) return;

    //         const response = await getFtx(account);
    //         console.log('getFtx response:', response);
    //         if (response !== '') setFtxInfo(response);
    //     }

    //     updateAppState();
    // }, [account]);

    return (
        <Container sx={{ paddingY: 8 }}>
            <Stack width={600} spacing={3}>
                <Typography fontSize={48} fontWeight={800} className="neueplak_condensed">
                    FTX 2974 HOLDERS
                </Typography>
                <Typography>
                    All FTX 2974 Holders can join the NF3 Basketball mintlist by inputting their code into the box
                    below. One mintlist spot per code.
                </Typography>
                <Stack spacing={3} padding={4} borderRadius={4} sx={{ background: '#1B1C22BF' }}>
                    <Typography fontSize={32} fontWeight={800} className="neueplak_condensed">
                        JOIN THE NF3 BASKETBALL MINTLIST
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        borderRadius={8}
                        paddingX={2}
                        paddingY={1}
                        sx={{ background: '#32343F' }}
                    >
                        <Typography>MY WALLET ADDRESS:</Typography>
                        <Typography fontWeight={800}>
                            {account ? reduceHexAddress(account, 4) : 'Wallet not connected'}
                        </Typography>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography fontSize={14}>Enter Code</Typography>
                        <CodeInputField value={code} onChange={handleCodeChange} />
                    </Stack>
                    <Stack spacing={3}>
                        {account ? (
                            <>
                                <SubmitBtn disabled={!enableSubmit} onClick={onSubmit}>
                                    SUBMIT
                                </SubmitBtn>
                                {submitResult === SubmitResult.SUCCESS && (
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        padding={2}
                                        borderRadius={1}
                                        sx={{ background: '#EDF7ED' }}
                                    >
                                        <CompleteIcon sx={{ marginTop: 0.5, color: '#4CAF50' }} />
                                        <Stack>
                                            <Typography fontWeight={700} color="#1E4620">
                                                You have successfully joined the Mintlist.
                                            </Typography>
                                            <Typography fontSize={14} fontWeight={500} color="#1E4620">
                                                You have 1 Mintlist spot. Mint your NF3 Basketball in the Curry Shop.
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                )}
                                {(submitResult === SubmitResult.CODE_INVALID ||
                                    submitResult === SubmitResult.CODE_ALREADY_USED) && (
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        padding={2}
                                        borderRadius={1}
                                        sx={{ background: '#FEECEB' }}
                                    >
                                        <ErrorIcon sx={{ marginTop: 0.5, color: '#F44336' }} />
                                        <Stack>
                                            <Typography fontWeight={700} color="#621B16">
                                                Error
                                            </Typography>
                                            <Typography fontSize={14} fontWeight={500} color="#621B16">
                                                {submitResult === SubmitResult.CODE_INVALID
                                                    ? 'You have entered an invalid code. Please try again.'
                                                    : 'This code has already been used. '}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                )}
                            </>
                        ) : (
                            <ConnectWalletBtn onClick={() => connect(activate)}>CONNECT WALLET</ConnectWalletBtn>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    );
};

export default FTXHoldersPageContainer;
