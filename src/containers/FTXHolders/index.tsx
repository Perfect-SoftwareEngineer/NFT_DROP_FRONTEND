import React from 'react';
import { Stack, Typography, Link } from '@mui/material';
import Container from '../Container';
import { CodeInputField, ConnectWalletBtn, SubmitBtn } from './styles';
import CompleteIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/ErrorOutline';

const FTXHoldersPageContainer: React.FC = (): JSX.Element => {
    return (
        <Container sx={{ paddingY: 8 }}>
            <Stack width={600} spacing={3}>
                <Typography fontSize={48} fontWeight={800} className="neueplak_condensed">
                    FTX 2974 HOLDERS
                </Typography>
                <Typography>
                    All FTX 2974 Holders can join the NF3 mintlist by inputting a given code into the box below.
                </Typography>
                <Stack spacing={3} padding={4} borderRadius={4} sx={{ background: '#1B1C22BF' }}>
                    <Typography fontSize={32} fontWeight={800} className="neueplak_condensed">
                        JOIN NF3 MINTLIST
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
                        <Typography fontWeight={800}>Wallet not connected</Typography>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography fontSize={14}>Enter Code</Typography>
                        <CodeInputField />
                    </Stack>
                    <Stack spacing={3}>
                        <ConnectWalletBtn>CONNECT WALLET</ConnectWalletBtn>
                        <SubmitBtn>SUBMIT</SubmitBtn>
                        <Stack direction="row" spacing={2} padding={2} borderRadius={1} sx={{ background: '#EDF7ED' }}>
                            <CompleteIcon sx={{ marginTop: 0.5, color: '#4CAF50' }} />
                            <Stack>
                                <Typography fontWeight={700} color="#1E4620">
                                    You have successfully joined the Mintlist.
                                </Typography>
                                <Typography fontSize={14} fontWeight={500} color="#1E4620">
                                    You have 1 Mintlist spot. Mint your NFT3 Basketball in the Curry Shop.
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={2} padding={2} borderRadius={1} sx={{ background: '#FEECEB' }}>
                            <ErrorIcon sx={{ marginTop: 0.5, color: '#F44336' }} />
                            <Stack>
                                <Typography fontWeight={700} color="#621B16">
                                    Error
                                </Typography>
                                <Typography fontSize={14} fontWeight={500} color="#621B16">
                                    You have entered an invalid code. Please try again.
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    );
};

export default FTXHoldersPageContainer;
