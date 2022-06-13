import React, { useState } from 'react';
import { Stack, Box, Grid, Typography, Dialog, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { useWeb3React } from '@web3-react/core';
import web3 from 'web3';
import BasketballHeadABI from '../../../../lib/ABI/BasketBallHead.json';
import { MintBtn } from './styles';
import CompleteIcon from '@mui/icons-material/CheckCircleOutline';
import { confirmClaimSerumCommunity } from '../../../../services/api/curryshop';
import { useAppContext } from '../../../../context/AppContext';
import { SelectItemType } from '../../../../types';
import SerumTypeSelect from '../../SerumTypeSelect';
import SupplyBox from '../../SupplyBox';
import serumTokensList from '../../../../constants/serumTokenData';

type ComponentProps = {
    mintData: any;
    setNeedUpdateInfo: (value: boolean) => void;
};

enum MintStatus {
    NOT_MINTED,
    MINTING,
    MINT_FAILED,
    MINT_SUCCESS,
}

const SerumMintlistMintBox: React.FC<ComponentProps> = ({ mintData, setNeedUpdateInfo }): JSX.Element => {
    const { account, library } = useWeb3React();
    const [appState, setAppState] = useAppContext();

    const [communityOwnedCount, setCommunityOwnedCount] = useState<number>(0);
    const [communityClaimHexProof, setCommunityClaimHexProof] = useState<any[]>([]);

    const [mintState, setMintState] = useState<MintStatus>(MintStatus.NOT_MINTED);
    const [claimedCount, setclaimedCount] = useState<number>(0);

    const [serumTypeOptions, setSerumTypeOptions] = useState<Array<SelectItemType>>([]);
    const [serumType, setSerumType] = useState<SelectItemType>();

    React.useEffect(() => {
        if (!!mintData) {
            // console.log('mintData keys:', Object.keys(mintData));
            let serumOptions: Array<SelectItemType> = [];

            Object.keys(mintData).map((id) => {
                serumOptions = [...serumOptions, serumTokensList[id]];
            });
            setSerumTypeOptions(serumOptions);

            if (serumOptions.length > 0) setSerumType(serumOptions[0]);
        }
    }, [mintData]);

    React.useEffect(() => {
        if (!!serumType) {
            // console.log('serumType:', serumType);

            setCommunityOwnedCount(mintData[serumType.value].quantity);
            setCommunityClaimHexProof(mintData[serumType.value].hexProof);
        }
    }, [serumType]);

    const mint = async () => {
        if (!account) return;

        setMintState(MintStatus.MINTING);

        const nftContract = new library.eth.Contract(
            BasketballHeadABI,
            process.env.NEXT_PUBLIC_ENV == 'production'
                ? '0x75615677d9cd50cb5D9660Ffb84eCd4d333E0B76'
                : '0x22899ed83366ef867265A98413f1f332aD4Aa168'
        );

        let _mintPrice = 0.07;
        let value = (_mintPrice * communityOwnedCount).toString();
        value = web3.utils.toWei(value, 'ether');
        await nftContract.methods
            .mint(communityOwnedCount, communityClaimHexProof)
            .send({ from: account, value: value })
            .then(
                //to do : update db
                () => {
                    setclaimedCount(communityOwnedCount);
                    setMintState(MintStatus.MINT_SUCCESS);
                    setNeedUpdateInfo(true);

                    confirmClaimSerumCommunity(account, appState.jwtToken)
                        .then((response: any) => {
                            // console.log('resonse:', response);
                        })
                        .catch((error) => {
                            // console.log(error);
                        });
                }
            )
            .catch((e: any) => {
                setMintState(MintStatus.MINT_FAILED);
                // console.log(e);
            });
    };

    return (
        <>
            <Stack spacing={4} padding={{ xs: 2, md: 4 }} borderRadius={2} sx={{ background: '#1B1C22' }}>
                <Grid container columns={8} columnSpacing={4} rowGap={2}>
                    <Grid item xs={8} md={3}>
                        <img src="/assets/curryshop/serum-box.png" width="100%" style={{ borderRadius: 16 }} />
                    </Grid>
                    <Grid item xs={8} md={5}>
                        <Stack spacing={3}>
                            <Typography
                                fontSize={48}
                                fontWeight={800}
                                lineHeight={1.1}
                                textTransform="uppercase"
                                className="neueplak_condensed"
                            >
                                SERUM MINTLIST
                            </Typography>
                            <SupplyBox amount={0} label="Serums" headColor="#018FB3" />
                            <Typography color="#969AA1">
                                Got a mintlist spot? We open up early purchasing to community partner mintlists and
                                Discord mintlist spots.
                            </Typography>
                            <Typography fontSize={32} fontWeight={700}>
                                PRICE: 0.03 ETH{' '}
                                <Typography fontWeight={700} display="inline">
                                    (+GAS FEE)
                                </Typography>
                            </Typography>
                            <Stack spacing={1}>
                                <Typography fontSize={14}>Serum Type</Typography>
                                <SerumTypeSelect
                                    serumType={serumType}
                                    setSerumType={setSerumType}
                                    serumTypeOptions={serumTypeOptions}
                                />
                            </Stack>
                            <Stack>
                                <Typography fontWeight={700}>{`You have ${
                                    mintState === MintStatus.MINT_SUCCESS ? 0 : communityOwnedCount
                                } Mintlist Spots`}</Typography>
                                <MintBtn
                                    sx={{ marginTop: 1 }}
                                    disabled={mintState === MintStatus.MINT_SUCCESS || !communityOwnedCount}
                                    onClick={mint}
                                >
                                    MINT
                                </MintBtn>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
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

export default SerumMintlistMintBox;
