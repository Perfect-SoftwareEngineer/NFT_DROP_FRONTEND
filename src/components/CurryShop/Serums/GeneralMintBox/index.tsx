import React, { useState } from 'react';
import { Stack, Box, Grid, Typography, Dialog, CircularProgress } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import SerumABI from '../../../../lib/ABI/Serum.json';
import Image from 'next/image';
import { AmountInputWrapper, AmountInputTextField, MaxBtn, MintBtn, ReserveBtn } from '../../styles';
import { SelectItemType } from '../../../../types';
import SerumTypeSelect from '../../SerumTypeSelect';
import SupplyBox from '../../SupplyBox';
import serumTokensList from '../../../../constants/serumTokenData';

type ComponentProps = {
    mintData: any;
    amountLeft: number;
    disabled?: boolean;
    setNeedUpdateInfo: (value: boolean) => void;
};

const MAX_VAL = 6;

enum MintStatus {
    NOT_MINTED,
    MINTING,
    MINT_FAILED,
    MINT_SUCCESS,
}

enum ReserveStatus {
    NOT_RESERVED,
    RESERVING,
    RESERVE_FAILED,
    RESERVE_SUCCESS,
}

const SerumGeneralMintBox: React.FC<ComponentProps> = ({
    mintData,
    amountLeft,
    disabled = false,
    setNeedUpdateInfo,
}): JSX.Element => {
    const { active, account, library, activate } = useWeb3React();

    const [communityOwnedCount, setCommunityOwnedCount] = useState<number>(0);
    const [communityClaimHexProof, setCommunityClaimHexProof] = useState<any[]>([]);

    const [mintAmount, setMintAmount] = useState<string>('');
    const [mintPrice, setMintPrice] = useState<number>(0);
    const [reservedAmount, setReservedAmount] = useState<number>(0);

    const [mintState, setMintState] = useState<MintStatus>(MintStatus.NOT_MINTED);
    const [reserveState, setReserveState] = useState<ReserveStatus>(ReserveStatus.NOT_RESERVED);

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
            SerumABI,
            process.env.NEXT_PUBLIC_ENV == 'production' ? '' : '0x0ec788eA9C07dB16374B4bddd4Fd586a8844B4dE'
        );

        try {
            let reservedCount = await nftContract.methods
                .reserveCount(account, serumType?.value)
                .call({ from: account });
            if (parseInt(reservedCount)) {
                await nftContract.methods
                    .mint(serumType?.value, mintAmount, communityClaimHexProof)
                    .send({ from: account, value: 0 });
                reservedCount = await nftContract.methods
                    .reserveCount(account, serumType?.value)
                    .call({ from: account });
                setReservedAmount(parseInt(reservedCount));
            } else {
                await nftContract.methods
                    .mint(serumType?.value, mintAmount, communityClaimHexProof)
                    .send({ from: account, value: mintPrice * parseInt(mintAmount) });
            }

            setNeedUpdateInfo(true);
            setMintState(MintStatus.MINT_SUCCESS);
        } catch (err: any) {
            setMintState(MintStatus.MINT_FAILED);
            console.error(err);
            return;
        }
    };

    const reserve = async () => {
        if (!account) return;

        setReserveState(ReserveStatus.RESERVING);

        const nftContract = new library.eth.Contract(
            SerumABI,
            process.env.NEXT_PUBLIC_ENV == 'production' ? '' : '0x0ec788eA9C07dB16374B4bddd4Fd586a8844B4dE'
        );

        try {
            await nftContract.methods
                .reserve(serumType?.value, mintAmount)
                .send({ from: account, value: mintPrice * parseInt(mintAmount) });
            const reservedCount = await nftContract.methods
                .reserveCount(account, serumType?.value)
                .call({ from: account });
            setReservedAmount(parseInt(reservedCount));
            setNeedUpdateInfo(true);
            setReserveState(ReserveStatus.RESERVE_SUCCESS);
        } catch (err: any) {
            setReserveState(ReserveStatus.RESERVE_FAILED);
            console.error(err);
            return;
        }
    };

    React.useEffect(() => {
        async function updateAppState() {
            if (serumType != undefined) {
                const nftContract = new library.eth.Contract(
                    SerumABI,
                    process.env.NEXT_PUBLIC_ENV == 'production' ? '' : '0x0ec788eA9C07dB16374B4bddd4Fd586a8844B4dE'
                );

                const reservedCount = await nftContract.methods
                    .reserveCount(account, serumType?.value)
                    .call({ from: account });

                console.log(reservedCount);
                // console.log('reservedCount:', reservedCount);
                const mPrice = await nftContract.methods.mintprice().call({ from: account });
                setReservedAmount(parseInt(reservedCount));
                setMintPrice(parseInt(mPrice));
            }
        }
        if (account) {
            updateAppState();
        }
    }, [account, serumType]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (isNaN(Number(value))) return;

        const maxCount = reservedAmount === 0 || reservedAmount >= MAX_VAL ? MAX_VAL : reservedAmount;
        setMintAmount(Math.min(Number(value), maxCount).toString());
    };

    const setMaxMintCount = () => {
        setMintAmount(
            reservedAmount === 0 || reservedAmount >= MAX_VAL ? MAX_VAL.toString() : reservedAmount.toString()
        );
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
                                SERUM GENERAL MINT
                            </Typography>
                            <SupplyBox amount={0} label="Serums" headColor="#018FB3" />
                            <Typography color="#969AA1">
                                Press <span style={{ color: '#FFCA21' }}>"Reserve"</span> to trigger a transaction where
                                you pay for the amount of NFTs you specify. Mint your reserved NFTs at a later time. No
                                time limits for when you can mint your reserved NFTs.
                            </Typography>
                            <Typography fontSize={32} fontWeight={700}>
                                PRICE: 0.03 ETH{' '}
                                <Typography fontWeight={700} display="inline">
                                    (+GAS FEE)
                                </Typography>
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Stack spacing={1}>
                                    <Typography fontSize={14}>Serum Type</Typography>
                                    <SerumTypeSelect
                                        serumType={serumType}
                                        setSerumType={setSerumType}
                                        serumTypeOptions={serumTypeOptions}
                                    />
                                </Stack>
                                <Stack spacing={1}>
                                    <Typography fontSize={14} fontWeight={400} color="white">
                                        # of Serums (Max 6)
                                    </Typography>
                                    <AmountInputWrapper sx={{ width: 184 }}>
                                        <AmountInputTextField value={mintAmount} onChange={handleInputChange} />
                                        <MaxBtn onClick={setMaxMintCount}>Max</MaxBtn>
                                    </AmountInputWrapper>
                                </Stack>
                            </Stack>
                            <Stack spacing={1}>
                                <Typography fontWeight={700} color="white">
                                    {disabled
                                        ? 'Currently Unavailable'
                                        : 'You have ' + reservedAmount + ' reserve mints'}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <MintBtn disabled={mintAmount === '' || mintAmount === '0'} onClick={mint}>
                                            MINT
                                        </MintBtn>
                                        <ReserveBtn
                                            disabled={mintAmount === '' || mintAmount === '0'}
                                            onClick={reserve}
                                        >
                                            RESERVE
                                        </ReserveBtn>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
            <Dialog
                open={mintState === MintStatus.MINTING || reserveState === ReserveStatus.RESERVING}
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

export default SerumGeneralMintBox;
