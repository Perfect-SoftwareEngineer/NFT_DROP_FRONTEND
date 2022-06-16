import React, { useState } from 'react';
import { Stack, Box, Grid, Typography, Dialog, CircularProgress } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import SerumABI from '../../../../lib/ABI/Serum.json';
import Image from 'next/image';
import { AmountInputWrapper, AmountInputTextField, MaxBtn, MintBtn, ReserveBtn } from '../../styles';
import { SelectItemType } from '../../../../types';
import SerumTypeSelect from '../../SerumTypeSelect';
import SupplyBox from '../../SupplyBox';
import serumTokensList, { serumTokensColor } from '../../../../constants/serumTokenData';
import CompleteIcon from '@mui/icons-material/CheckCircleOutline';

type ComponentProps = {
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

const SerumGeneralMintBox: React.FC<ComponentProps> = ({ setNeedUpdateInfo }): JSX.Element => {
    const { active, account, library, activate } = useWeb3React();

    const [mintAmount, setMintAmount] = useState<string>('');
    const [mintPrice, setMintPrice] = useState<number>(0);
    const [reservedAmount, setReservedAmount] = useState<number>(0);

    const [mintState, setMintState] = useState<MintStatus>(MintStatus.NOT_MINTED);
    const [reserveState, setReserveState] = useState<ReserveStatus>(ReserveStatus.NOT_RESERVED);

    const [claimedCount, setclaimedCount] = useState<number>(0);

    const [supplyLeft, setSupplyLeft] = useState<number>(0);

    const [serumTypeOptions, setSerumTypeOptions] = useState<Array<SelectItemType>>([
        serumTokensList['6'],
        serumTokensList['7'],
        serumTokensList['8'],
        serumTokensList['9'],
        serumTokensList['10'],
        serumTokensList['11'],
    ]);
    const [serumType, setSerumType] = useState<SelectItemType>(serumTypeOptions[0]);

    async function updateAppState() {
        if (serumType !== undefined) {
            const nftContract = new library.eth.Contract(
                SerumABI,
                process.env.NEXT_PUBLIC_ENV == 'production' ? '' : '0x0ec788eA9C07dB16374B4bddd4Fd586a8844B4dE'
            );

            const reservedCount = await nftContract.methods
                .reserveCount(account, serumType?.value)
                .call({ from: account });

            const mPrice = await nftContract.methods.mintprice().call({ from: account });
            setReservedAmount(parseInt(reservedCount));
            setMintPrice(parseInt(mPrice));

            const maxsupply2 = await nftContract.methods.maxsupplyById(serumType?.value).call({ from: account });
            const totalsupply2 = await nftContract.methods.totalsupplyById(serumType?.value).call({ from: account });
            const totalReservedSupply2 = await nftContract.methods
                .totalReservedSupplyById(serumType?.value)
                .call({ from: account });

            setSupplyLeft(parseInt(maxsupply2) - parseInt(totalsupply2) - parseInt(totalReservedSupply2));
        }
    }

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
                await nftContract.methods.mint(serumType?.value, mintAmount, []).send({ from: account, value: 0 });
                reservedCount = await nftContract.methods
                    .reserveCount(account, serumType?.value)
                    .call({ from: account });
                setReservedAmount(parseInt(reservedCount));
            } else {
                await nftContract.methods
                    .mint(serumType?.value, mintAmount, [])
                    .send({ from: account, value: mintPrice * parseInt(mintAmount) });
            }

            setclaimedCount(parseInt(mintAmount));
            setMintAmount('');
            setMintState(MintStatus.MINT_SUCCESS);
            setNeedUpdateInfo(true);

            updateAppState();

            setTimeout(() => setMintState(MintStatus.NOT_MINTED), 2000);
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
            updateAppState();
        } catch (err: any) {
            setReserveState(ReserveStatus.RESERVE_FAILED);
            console.error(err);
            return;
        }
    };

    React.useEffect(() => {
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
                        <img
                            src={`/assets/curryshop/serumtypes/${serumType.value}.png`}
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
                                SERUM GENERAL MINT
                            </Typography>
                            <SupplyBox
                                amount={supplyLeft}
                                label="Serums"
                                headColor={serumTokensColor[serumType.value]}
                            />
                            <Typography color="#969AA1">
                                Press <span style={{ color: '#FFCA21' }}>"Reserve"</span> to purchase the amount of NFTs
                                you have selected. Mint your reserved NFTs at any time, without limitation.
                            </Typography>
                            <Typography fontSize={32} fontWeight={700}>
                                PRICE: 0.027 ETH{' '}
                                <Typography fontWeight={700} display="inline">
                                    (+GAS FEE)
                                </Typography>
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
                                    {`You have ${reservedAmount} reserve mints`}
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
