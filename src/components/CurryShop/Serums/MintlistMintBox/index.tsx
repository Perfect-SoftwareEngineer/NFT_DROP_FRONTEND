import React, { useState } from 'react';
import { Stack, Box, Grid, Typography, Dialog, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { useWeb3React } from '@web3-react/core';
import web3 from 'web3';
import SerumABI from '../../../../lib/ABI/Serum.json';
import { MintBtn } from './styles';
import CompleteIcon from '@mui/icons-material/CheckCircleOutline';
// import { confirmClaimSerumCommunity } from '../../../../services/api/curryshop';
import { useAppContext } from '../../../../context/AppContext';
import { SelectItemType } from '../../../../types';
import SerumTypeSelect from '../../SerumTypeSelect';
import SupplyBox from '../../SupplyBox';
import serumTokensList, { serumTokensColor } from '../../../../constants/serumTokenData';

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

    const [mintPrice, setMintPrice] = useState<number>(0);
    const [supplyLeft, setSupplyLeft] = useState<number>(0);

    async function updateAppState() {
        if (serumType !== undefined) {
            const nftContract = new library.eth.Contract(
                SerumABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? process.env.NEXT_PUBLIC_MAINNET_SERUM_CONTRACT_ADDRESS
                    : process.env.NEXT_PUBLIC_TESTNET_SERUM_CONTRACT_ADDRESS
            );

            const mPrice = await nftContract.methods.mintprice().call({ from: account });
            setMintPrice(parseInt(mPrice));

            const maxsupply2 = await nftContract.methods.maxsupplyById(serumType?.value).call({ from: account });
            const totalsupply2 = await nftContract.methods.totalsupplyById(serumType?.value).call({ from: account });
            const totalReservedSupply2 = await nftContract.methods
                .totalReservedSupplyById(serumType?.value)
                .call({ from: account });

            setSupplyLeft(parseInt(maxsupply2) - parseInt(totalsupply2) - parseInt(totalReservedSupply2));
        } else {
            const nftContract = new library.eth.Contract(
                SerumABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? process.env.NEXT_PUBLIC_MAINNET_SERUM_CONTRACT_ADDRESS
                    : process.env.NEXT_PUBLIC_TESTNET_SERUM_CONTRACT_ADDRESS
            );

            const mPrice = await nftContract.methods.mintprice().call({ from: account });
            setMintPrice(parseInt(mPrice));

            const maxsupply = await nftContract.methods.maxsupply().call({ from: account });
            const totalsupply = await nftContract.methods.totalsupply().call({ from: account });
            const totalReservedSupply = await nftContract.methods.totalReservedSupply().call({ from: account });

            setSupplyLeft(parseInt(maxsupply) - parseInt(totalsupply) - parseInt(totalReservedSupply));
        }
    }

    React.useEffect(() => {
        async function updateSerumTokenList() {
            const nftContract = new library.eth.Contract(
                SerumABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? process.env.NEXT_PUBLIC_MAINNET_SERUM_CONTRACT_ADDRESS
                    : process.env.NEXT_PUBLIC_TESTNET_SERUM_CONTRACT_ADDRESS
            );

            let serumOptions: Array<SelectItemType> = [];

            for (let id in mintData) {
                let minted = await nftContract.methods.mintedForCommunity(account, id).call({ from: account });
                if (!minted) {
                    serumOptions = [...serumOptions, serumTokensList[id]];
                }
            }

            setSerumTypeOptions(serumOptions);

            if (serumOptions.length > 0) {
                setSerumType(serumOptions[0]);
            } else {
                setSerumType(undefined);
            }
        }
        if (!!mintData) {
            updateSerumTokenList();
        }
    }, [mintData]);

    React.useEffect(() => {
        if (!!serumType) {
            setCommunityOwnedCount(mintData[serumType.value].quantity);
            setCommunityClaimHexProof(mintData[serumType.value].hexProof);
            updateAppState();
        } else {
            setCommunityOwnedCount(0);
            setCommunityClaimHexProof([]);
            updateAppState();
        }
    }, [serumType]);

    const mint = async () => {
        if (!account) return;

        setMintState(MintStatus.MINTING);

        const nftContract = new library.eth.Contract(
            SerumABI,
            process.env.NEXT_PUBLIC_ENV == 'production'
                ? process.env.NEXT_PUBLIC_MAINNET_SERUM_CONTRACT_ADDRESS
                : process.env.NEXT_PUBLIC_TESTNET_SERUM_CONTRACT_ADDRESS
        );

        let value = (mintPrice * communityOwnedCount).toString();
        nftContract.methods
            .mint(serumType?.value, communityOwnedCount, communityClaimHexProof)
            .send({ from: account, value: value })
            .then(
                //to do : update db
                () => {
                    setclaimedCount(communityOwnedCount);
                    setMintState(MintStatus.MINT_SUCCESS);
                    setNeedUpdateInfo(true);

                    updateAppState();
                    setTimeout(() => setMintState(MintStatus.NOT_MINTED), 3000);

                    // confirmClaimSerumCommunity(account, appState.jwtToken)
                    //     .then((response: any) => {
                    //         // console.log('resonse:', response);
                    //     })
                    //     .catch((error) => {
                    //         // console.log(error);
                    //     });
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
                        <img
                            src={`/assets/curryshop/serumtypes/${serumType ? serumType.value : 'default'}.png`}
                            width="100%"
                            style={{ borderRadius: 16 }}
                        />
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
                            <SupplyBox
                                amount={supplyLeft}
                                label="Serums"
                                headColor={serumType ? serumTokensColor[serumType.value] : '#018FB3'}
                            />
                            <Typography color="#969AA1">
                                Early purchasing is open to community partner mintlists and Discord mintlist spots.
                            </Typography>
                            <Typography fontSize={32} fontWeight={700}>
                                PRICE: 0.027 ETH{' '}
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
                                    // mintState === MintStatus.MINT_SUCCESS ? 0 : communityOwnedCount
                                    communityOwnedCount
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
                            {`You have claimed ${claimedCount} Serums, please check your `}
                            <a href="https://opensea.io/" target="_blank" style={{ color: '#2986F2' }}>
                                Opensea
                            </a>{' '}
                            profile to check if the Serums is in your wallet
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
