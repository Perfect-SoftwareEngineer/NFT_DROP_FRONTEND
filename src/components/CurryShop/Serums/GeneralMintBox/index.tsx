import React, { useState } from 'react';
import { Stack, Box, Grid, Typography, Dialog, CircularProgress } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import BasketballHeadABI from '../../../../lib/ABI/BasketBallHead.json';
import Image from 'next/image';
import { AmountInputWrapper, AmountInputTextField, MaxBtn, MintBtn, ReserveBtn } from '../../styles';
import { SelectItemType } from '../../../../types';
import SerumTypeSelect from '../../SerumTypeSelect';
import SupplyBox from '../../SupplyBox';

type ComponentProps = {
    amountLeft: number;
    disabled?: boolean;
    setNeedUpdateInfo: (value: boolean) => void;
};

const MAX_VAL = 3;

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

export const serumTypeOptions: Array<SelectItemType> = [
    {
        label: 'Smilesss',
        value: '6',
        icon: <img src="/assets/curryshop/serumtypes/unanimous.png" width={24} height={24} />,
    },
    {
        label: 'Chibi Dinos',
        value: '7',
        icon: <img src="/assets/curryshop/serumtypes/unanimous.png" width={24} height={24} />,
    },
    {
        label: 'Hape',
        value: '8',
        icon: <img src="/assets/curryshop/serumtypes/unanimous.png" width={24} height={24} />,
    },
    {
        label: 'CyberKongz',
        value: '9',
        icon: <img src="/assets/curryshop/serumtypes/unanimous.png" width={24} height={24} />,
    },
    {
        label: 'Under Armour',
        value: '10',
        icon: <img src="/assets/curryshop/serumtypes/unanimous.png" width={24} height={24} />,
    },
    {
        label: 'Curry Brand',
        value: '11',
        icon: <img src="/assets/curryshop/serumtypes/unanimous.png" width={24} height={24} />,
    },
];

const SerumGeneralMintBox: React.FC<ComponentProps> = ({
    amountLeft,
    disabled = false,
    setNeedUpdateInfo,
}): JSX.Element => {
    const { active, account, library, activate } = useWeb3React();
    const [mintAmount, setMintAmount] = useState<string>('');
    const [mintPrice, setMintPrice] = useState<number>(0);
    const [reservedAmount, setReservedAmount] = useState<number>(0);

    const [mintState, setMintState] = useState<MintStatus>(MintStatus.NOT_MINTED);
    const [reserveState, setReserveState] = useState<ReserveStatus>(ReserveStatus.NOT_RESERVED);

    const [serumType, setSerumType] = useState<SelectItemType>(serumTypeOptions[0]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (isNaN(Number(value))) return;

        const maxCount = reservedAmount === 0 || reservedAmount >= MAX_VAL ? MAX_VAL : reservedAmount;
        setMintAmount(Math.min(Number(value), maxCount).toString());
    };

    const mint = async () => {
        if (!account) return;

        setMintState(MintStatus.MINTING);

        const nftContract = new library.eth.Contract(
            BasketballHeadABI,
            process.env.NEXT_PUBLIC_ENV == 'production'
                ? '0x75615677d9cd50cb5D9660Ffb84eCd4d333E0B76'
                : '0x22899ed83366ef867265A98413f1f332aD4Aa168'
        );

        try {
            let reservedCount = await nftContract.methods.reserveCount(account).call({ from: account });
            if (parseInt(reservedCount)) {
                await nftContract.methods.mint(mintAmount, []).send({ from: account, value: 0 });
                reservedCount = await nftContract.methods.reserveCount(account).call({ from: account });
                setReservedAmount(parseInt(reservedCount));
            } else {
                await nftContract.methods
                    .mint(mintAmount, [])
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
            BasketballHeadABI,
            process.env.NEXT_PUBLIC_ENV == 'production'
                ? '0x75615677d9cd50cb5D9660Ffb84eCd4d333E0B76'
                : '0x22899ed83366ef867265A98413f1f332aD4Aa168'
        );

        try {
            await nftContract.methods
                .reserve(mintAmount)
                .send({ from: account, value: mintPrice * parseInt(mintAmount) });
            const reservedCount = await nftContract.methods.reserveCount(account).call({ from: account });
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
            const nftContract = new library.eth.Contract(
                BasketballHeadABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? '0x75615677d9cd50cb5D9660Ffb84eCd4d333E0B76'
                    : '0x22899ed83366ef867265A98413f1f332aD4Aa168'
            );

            const reservedCount = await nftContract.methods.reserveCount(account).call({ from: account });
            // console.log('reservedCount:', reservedCount);
            const mPrice = await nftContract.methods.mintprice().call({ from: account });
            setReservedAmount(parseInt(reservedCount));
            setMintPrice(parseInt(mPrice));
        }
        if (account) {
            updateAppState();
        }
    }, [account]);

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
                                        # of Basketball Heads (Max 3)
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
                                        <MintBtn disabled={disabled} onClick={mint}>
                                            MINT
                                        </MintBtn>
                                        <ReserveBtn disabled={disabled} onClick={reserve}>
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
