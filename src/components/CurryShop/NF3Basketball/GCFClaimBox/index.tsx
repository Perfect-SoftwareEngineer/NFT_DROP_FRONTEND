import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import web3 from 'web3';
import { Stack, Box, Typography, Dialog, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { MintBtn } from './styles';
import BasketballHeadABI from '../../../../lib/ABI/BasketBallHead.json';
import CompleteIcon from '@mui/icons-material/CheckCircleOutline';
import { confirmClaimNF3GCF } from '../../../../services/fetch';
import { useAppContext } from '../../../../context/AppContext';

type ComponentProps = {
    gcfOwnedCount: number;
    gcfClaimHexProof: any[];
    setNeedUpdateInfo: (value: boolean) => void;
};

enum MintStatus {
    NOT_MINTED,
    MINTING,
    MINT_FAILED,
    MINT_SUCCESS,
}

const NF3GCFClaimBox: React.FC<ComponentProps> = ({
    gcfOwnedCount,
    gcfClaimHexProof,
    setNeedUpdateInfo,
}): JSX.Element => {
    const { account, library } = useWeb3React();
    const [appState, setAppState] = useAppContext();

    const [mintState, setMintState] = useState<MintStatus>(MintStatus.NOT_MINTED);
    const [claimedCount, setclaimedCount] = useState<number>(0);

    const mint = async () => {
        if (!account) return;

        setMintState(MintStatus.MINTING);

        const nftContract = new library.eth.Contract(
            BasketballHeadABI,
            process.env.NEXT_PUBLIC_ENV == 'production'
                ? '0xC57C94346b466bED19438c195ad78CAdC7D09473'
                : '0xdb52bBC7bc3312B815E2978Aed339987D95D0444'
        );

        nftContract.methods
            .mint(gcfOwnedCount, gcfClaimHexProof)
            .send({ from: account, value: 0 })
            .then(
                //to do : update db
                () => {
                    setclaimedCount(gcfOwnedCount);
                    setMintState(MintStatus.MINT_SUCCESS);
                    setNeedUpdateInfo(true);

                    confirmClaimNF3GCF(account, appState.jwtToken)
                        .then((response: any) => {
                            console.log('resonse:', response);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            )
            .catch((e: any) => {
                setMintState(MintStatus.MINT_FAILED);
                console.log(e);
            });
    };

    return (
        <>
            <Stack borderRadius={2} overflow="hidden" sx={{ background: '#1B1C22' }}>
                <Box position="relative" width="100%" height={{ xs: 160, md: 220 }}>
                    <Image src={'/assets/curryshop/gcf-claim-banner.png'} layout="fill" objectFit="cover" />
                </Box>
                <Stack spacing={3} padding={{ xs: 2, md: 4 }}>
                    <Typography
                        fontSize={48}
                        fontWeight={800}
                        lineHeight={1.1}
                        textTransform="uppercase"
                        className="neueplak_condensed"
                    >
                        Genesis Curry Flow Claims
                    </Typography>
                    <Typography fontWeight={700}>
                        Genesis Curry Flow holders will be able to claim a free NF3 Basketball
                    </Typography>
                    <Stack>
                        <Typography>° A snapshot for claiming will be taken on XXX, 2022 at 5PM PST</Typography>
                        <Typography>
                            ° On XXX, 2022 at 5PM PST, you may mint an NF3 Basketball for every GCF you hold
                        </Typography>
                        <Typography>
                            ° Please Note: You will need enough Ethereum in your wallet to pay for the gas fee.
                        </Typography>
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        alignItems={{ xs: 'flex-start', md: 'center' }}
                        spacing={4}
                        marginTop={3}
                    >
                        <Box minWidth={240} width={240} height={240} position="relative">
                            <Image
                                src={'/assets/curryshop/nf3-basketball-box.png'}
                                layout="fill"
                                style={{ borderRadius: 16 }}
                            />
                        </Box>
                        <Stack>
                            <Typography fontSize={20} fontWeight={700}>
                                NFT3 BASKETBALL
                            </Typography>
                            <Typography fontSize={32} fontWeight={700} marginTop={2}>
                                PRICE: FREE{' '}
                                <Typography fontWeight={700} display="inline">
                                    (+GAS FEE)
                                </Typography>
                            </Typography>
                            <Typography fontWeight={700} marginTop={3}>{`You have ${
                                mintState === MintStatus.MINT_SUCCESS ? 0 : gcfOwnedCount
                            } Genesis Curry Flow claims`}</Typography>
                            <MintBtn
                                sx={{ marginTop: 1 }}
                                disabled={mintState === MintStatus.MINT_SUCCESS || !gcfOwnedCount}
                                onClick={mint}
                            >
                                MINT
                            </MintBtn>
                        </Stack>
                    </Stack>
                    {mintState === MintStatus.MINT_SUCCESS && (
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                            padding={2}
                            borderRadius={1}
                            marginTop={3}
                            sx={{ background: '#FFFFFFE5' }}
                        >
                            <CompleteIcon sx={{ color: '#4CAF50' }} />
                            <Typography fontSize={14} fontWeight={500} color="#1E4620">
                                {`You have claimed ${claimedCount} NF3 Basketball, please check your `}
                                <a href="https://opensea.io/" target="_blank" style={{ color: '#2986F2' }}>
                                    Opensea
                                </a>{' '}
                                profile to check if the NF3 Basketball is in your wallet
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </Stack>
            <Dialog
                open={mintState === MintStatus.MINTING}
                maxWidth="lg"
                PaperProps={{
                    sx: {
                        padding: 4,
                        background: 'none',
                    },
                }}
            >
                <CircularProgress />
            </Dialog>
        </>
    );
};

export default NF3GCFClaimBox;
