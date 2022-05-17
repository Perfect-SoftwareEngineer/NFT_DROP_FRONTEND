import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import web3 from 'web3';
import { Stack, Typography, Dialog, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { MintBtn } from './styles';
import BasketballHeadABI from '../../../lib/ABI/BasketBallHead.json';
import CompleteIcon from '@mui/icons-material/CheckCircleOutline';
import { confirmClaimGCF } from '../../../services/fetch';
import { useAppContext } from '../../../context/AppContext';

type ComponentProps = {
    gcfOwnedCount: number;
    hexProofForGCFClaim: any[];
    setNeedUpdateInfo: (value: boolean) => void;
};

enum MintStatus {
    NOT_MINTED,
    MINTING,
    MINT_FAILED,
    MINT_SUCCESS,
}

const GCFClaimBox: React.FC<ComponentProps> = ({
    gcfOwnedCount,
    hexProofForGCFClaim,
    setNeedUpdateInfo,
}): JSX.Element => {
    const { account, library } = useWeb3React();
    const [appState, setAppState] = useAppContext();

    const [mintState, setMintState] = useState<MintStatus>(MintStatus.NOT_MINTED);

    const mint = async () => {
        if (!account) return;

        setMintState(MintStatus.MINTING);

        const nftContract = new library.eth.Contract(
            BasketballHeadABI,
            process.env.NEXT_PUBLIC_ENV == 'production'
                ? '0xC57C94346b466bED19438c195ad78CAdC7D09473'
                : '0xb627Cd8E908EDfde1494304168AF6f59ADcB410E'
        );

        nftContract.methods
            .mint(gcfOwnedCount, hexProofForGCFClaim)
            .send({ from: account, value: 0 })
            .then(
                //to do : update db
                () => {
                    setMintState(MintStatus.MINT_SUCCESS);
                    setNeedUpdateInfo(true);

                    confirmClaimGCF(account, appState.jwtToken)
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
            <Stack padding={4} borderRadius={2} sx={{ background: '#1B1C22' }}>
                <Typography fontSize={48} fontWeight={700} lineHeight={1.1}>
                    Genesis Curry Flow Claims
                </Typography>
                <Typography fontWeight={700} marginTop={2}>
                    Free NF3 Basketball Mint for every GCF NFT Holders
                </Typography>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} marginTop={3}>
                    <Image
                        src={'/assets/currycounter/curry-brand.png'}
                        layout="fixed"
                        width={160}
                        height={160}
                        style={{ borderRadius: 16 }}
                    />
                    <Stack>
                        <Typography fontWeight={700}>How it works:</Typography>
                        <Typography marginTop={2}>° A snapshot will be taken on XXX, 2022 at 5PM PST</Typography>
                        <Typography>
                            ° On XXX, 2022 at 5PM PST, you may mint an NF3 Basketball for every GCF you hold
                        </Typography>
                        <Typography>
                            ° Please Note: You will need enough Ethereum in your wallet to pay for the gas fee.
                        </Typography>
                    </Stack>
                </Stack>
                <Stack marginTop={5}>
                    <Typography fontWeight={700}>{`You own ${
                        mintState === MintStatus.MINT_SUCCESS ? 0 : gcfOwnedCount
                    } Genesis Curry Flow`}</Typography>
                    <MintBtn
                        sx={{ marginTop: 1 }}
                        disabled={mintState === MintStatus.MINT_SUCCESS || !gcfOwnedCount}
                        onClick={mint}
                    >
                        MINT
                    </MintBtn>
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
                                You have claimed 1 NF3 Basketball, please check your{' '}
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

export default GCFClaimBox;
