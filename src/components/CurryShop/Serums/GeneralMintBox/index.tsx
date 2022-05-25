import React, { useState } from 'react';
import { Stack, Box, Typography, Dialog, CircularProgress } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import BasketballHeadABI from '../../../../lib/ABI/BasketBallHead.json';
import Image from 'next/image';
import { AmountInputWrapper, AmountInputTextField, MaxBtn, MintBtn, ReserveBtn } from '../../styles';

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

const SerumGeneralMintBox: React.FC<ComponentProps> = ({ amountLeft, disabled = false, setNeedUpdateInfo }): JSX.Element => {
    const { active, account, library, activate } = useWeb3React();
    const [mintAmount, setMintAmount] = useState<string>('');
    const [mintPrice, setMintPrice] = useState<number>(0);
    const [reservedAmount, setReservedAmount] = useState<number>(0);

    const [mintState, setMintState] = useState<MintStatus>(MintStatus.NOT_MINTED);
    const [reserveState, setReserveState] = useState<ReserveStatus>(ReserveStatus.NOT_RESERVED);

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
                ? '0xC57C94346b466bED19438c195ad78CAdC7D09473'
                : '0xdb52bBC7bc3312B815E2978Aed339987D95D0444'
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
                ? '0xC57C94346b466bED19438c195ad78CAdC7D09473'
                : '0xdb52bBC7bc3312B815E2978Aed339987D95D0444'
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
                    ? '0xC57C94346b466bED19438c195ad78CAdC7D09473'
                    : '0xdb52bBC7bc3312B815E2978Aed339987D95D0444'
            );

            const reservedCount = await nftContract.methods.reserveCount(account).call({ from: account });
            console.log('reservedCount:', reservedCount);
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
            <Stack borderRadius={2} overflow="hidden" sx={{ background: '#1B1C22' }}>
                <Box position="relative" width="100%" height={{ xs: 160, md: 220 }}>
                    <Image src={'/assets/roadmap/curry-counter.png'} layout="fill" objectFit="cover" />
                </Box>
                <Stack spacing={3} padding={{ xs: 2, md: 4 }}>
                    <Typography
                        fontSize={48}
                        fontWeight={800}
                        lineHeight={1.1}
                        textTransform="uppercase"
                        className="neueplak_condensed"
                    >
                        General Mint
                    </Typography>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} marginTop={3}>
                        <Box minWidth={240} width={240} height={240} position="relative">
                            <Image
                                src={'/assets/currycounter/curry-brand.png'}
                                layout="fill"
                                style={{ borderRadius: 16 }}
                            />
                        </Box>
                        <Stack>
                            <Typography fontSize={20} fontWeight={700}>
                                NFT3 BASKETBALL
                            </Typography>
                            <Typography fontSize={32} fontWeight={700} marginTop={2}>
                                PRICE: 0.07 ETH{' '}
                                <Typography fontWeight={700} display="inline">
                                    (+GAS FEE)
                                </Typography>
                            </Typography>
                            <Stack spacing={1} marginTop={3}>
                                <Typography fontSize={14} fontWeight={400} color="white">
                                    # of Basketball Heads (Max 3)
                                </Typography>
                                <AmountInputWrapper sx={{ width: 184 }}>
                                    <AmountInputTextField value={mintAmount} onChange={handleInputChange} />
                                    <MaxBtn onClick={setMaxMintCount}>Max</MaxBtn>
                                </AmountInputWrapper>
                            </Stack>
                            <Stack spacing={1} marginTop={2}>
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
                    </Stack>
                </Stack>
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
