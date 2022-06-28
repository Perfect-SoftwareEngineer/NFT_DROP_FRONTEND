import React, { useState } from 'react';
import { Stack, Box, Grid, Typography, Dialog, CircularProgress, FormControlLabel, Checkbox } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import SerumABI from '../../../../lib/ABI/Serum.json';
import Image from 'next/image';
import { AmountInputWrapper, AmountInputTextField, MaxBtn, MintBtn, ReserveBtn } from '../../styles';
import { SelectItemType } from '../../../../types';
import SerumTypeSelect from '../../SerumTypeSelect';
import SupplyBox from '../../SupplyBox';
import serumTokensList, { serumTokensColor } from '../../../../constants/serumTokenData';
import CompleteIcon from '@mui/icons-material/CheckCircleOutline';
import Link from 'next/link';

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

    const [agreeTermsConditions, setAgreeTermsConditions] = React.useState(false);

    const [mintAmount, setMintAmount] = useState<string>('');
    const [mintPrice, setMintPrice] = useState<number>(0);
    const [reservedAmount, setReservedAmount] = useState<number>(0);
    const [claimedAmount, setclaimedAmount] = useState<number>(0);
    const [supplyLeft, setSupplyLeft] = useState<number>(0);

    const [mintState, setMintState] = useState<MintStatus>(MintStatus.NOT_MINTED);
    const [reserveState, setReserveState] = useState<ReserveStatus>(ReserveStatus.NOT_RESERVED);

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
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? process.env.NEXT_PUBLIC_MAINNET_SERUM_CONTRACT_ADDRESS
                    : process.env.NEXT_PUBLIC_TESTNET_SERUM_CONTRACT_ADDRESS
            );

            const reservedCount = await nftContract.methods
                .reserveCount(account, serumType?.value)
                .call({ from: account });
            setReservedAmount(parseInt(reservedCount));

            const mPrice = await nftContract.methods.mintprice().call({ from: account });
            setMintPrice(parseInt(mPrice));

            const maxSupply = await nftContract.methods.maxsupplyById(serumType?.value).call({ from: account });
            const totalSupply = await nftContract.methods.totalsupplyById(serumType?.value).call({ from: account });
            const totalReservedSupply = await nftContract.methods
                .totalReservedSupplyById(serumType?.value)
                .call({ from: account });

            setSupplyLeft(parseInt(maxSupply) - parseInt(totalSupply) - parseInt(totalReservedSupply));
        }
    }

    const mint = async () => {
        if (!account) return;

        setMintState(MintStatus.MINTING);

        const nftContract = new library.eth.Contract(
            SerumABI,
            process.env.NEXT_PUBLIC_ENV == 'production'
                ? process.env.NEXT_PUBLIC_MAINNET_SERUM_CONTRACT_ADDRESS
                : process.env.NEXT_PUBLIC_TESTNET_SERUM_CONTRACT_ADDRESS
        );

        try {
            let reservedCount = await nftContract.methods
                .reserveCount(account, serumType?.value)
                .call({ from: account });

            if (parseInt(reservedCount)) {
                await nftContract.methods.mint(serumType?.value, mintAmount, []).send({ from: account, value: 0 });
            } else {
                await nftContract.methods
                    .mint(serumType?.value, mintAmount, [])
                    .send({ from: account, value: mintPrice * parseInt(mintAmount) });
            }

            setclaimedAmount(parseInt(mintAmount));
            setMintAmount('');
            setMintState(MintStatus.MINT_SUCCESS);
            setNeedUpdateInfo(true);

            updateAppState();

            setTimeout(() => setMintState(MintStatus.NOT_MINTED), 3000);
        } catch (err: any) {
            setMintState(MintStatus.MINT_FAILED);
            console.error(err);
        }
    };

    const reserve = async () => {
        if (!account) return;

        setReserveState(ReserveStatus.RESERVING);

        const nftContract = new library.eth.Contract(
            SerumABI,
            process.env.NEXT_PUBLIC_ENV == 'production'
                ? process.env.NEXT_PUBLIC_MAINNET_SERUM_CONTRACT_ADDRESS
                : process.env.NEXT_PUBLIC_TESTNET_SERUM_CONTRACT_ADDRESS
        );

        try {
            await nftContract.methods
                .reserve(serumType?.value, mintAmount)
                .send({ from: account, value: mintPrice * parseInt(mintAmount) });

            setReserveState(ReserveStatus.RESERVE_SUCCESS);
            setNeedUpdateInfo(true);

            updateAppState();
        } catch (err: any) {
            setReserveState(ReserveStatus.RESERVE_FAILED);
            console.error(err);
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
                            <Stack direction="row" flexWrap="wrap" gap={2}>
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={agreeTermsConditions}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setAgreeTermsConditions(event.target.checked);
                                        }}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        sx={{ color: '#9E9E9E', marginLeft: '-12px' }}
                                    />
                                }
                                label={
                                    <Typography marginBottom="6px">
                                        I agree that by checking this box, I agree to Under Armour's{' '}
                                        <Link href="/legal/terms-and-conditions" passHref>
                                            <a rel="noopener noreferrer" target="_blank">
                                                <Typography color="#FFCA21" display="inline">
                                                    {`Terms & Conditions`}
                                                </Typography>
                                            </a>
                                        </Link>
                                        .
                                    </Typography>
                                }
                                sx={{ marginTop: 3 }}
                            />
                            <Stack spacing={1}>
                                <Typography fontWeight={700} color="white">
                                    {`You have ${reservedAmount} reserve mints`}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <MintBtn
                                            disabled={
                                                !agreeTermsConditions ||
                                                mintAmount === '' ||
                                                mintAmount === '0' ||
                                                (supplyLeft === 0 && reservedAmount === 0)
                                            }
                                            onClick={mint}
                                        >
                                            MINT
                                        </MintBtn>
                                        <ReserveBtn
                                            disabled={
                                                !agreeTermsConditions ||
                                                mintAmount === '' ||
                                                mintAmount === '0' ||
                                                supplyLeft === 0
                                            }
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
                            {`You have claimed ${claimedAmount} Serums, please check your `}
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
