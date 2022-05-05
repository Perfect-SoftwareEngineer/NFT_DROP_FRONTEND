import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import BasketballHeadABI from '../../../lib/ABI/BasketBallHead.json'
import Image from 'next/image';
import { AmountInputWrapper, AmountInputTextField, MaxBtn, MintBtn, ReserveBtn } from '../styles';
import InfoIcon from '../../../assets/curryshop/info.svg';
import BasketballImg from '../../../assets/curryshop/basketball.png';
import Web3 from 'web3';


type ComponentProps = {
    amountLeft: number;
    disabled?: boolean;
};

const MAX_VAL = 3;

const BasketballMintBox: React.FC<ComponentProps> = ({ amountLeft, disabled = false }): JSX.Element => {
    const { active, account, library, activate } = useWeb3React();
    const [mintAmount, setMintAmount] = useState<string>('');
    const [mintPrice, setMintPrice] = useState<number>(0);
    const [reservedAmount, setReservedAmount] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!isNaN(Number(value)) && Number(value) <= MAX_VAL) setMintAmount(value);
    };

    const mint = async () => {
        const nftContract = new library.eth.Contract(
            BasketballHeadABI,
            process.env.NEXT_PUBLIC_ENV == 'production' ? '0xC57C94346b466bED19438c195ad78CAdC7D09473' : '0x1d42BCE7Ef74E7699F6De85F8C753ddd8aB7C16B'
        );

        try {
            let dropPhase = await nftContract.methods.dropPhase().call({ from: account })
            if(parseInt(dropPhase) == 1) {
                // switch [] to hexproof of GCF
                await nftContract.methods.mint(mintAmount, []).send({ from: account, value: mintPrice * parseInt(mintAmount) });
            } else if(parseInt(dropPhase) == 2) {
                // switch [] to hexproof of whiltelist
                await nftContract.methods.mint(mintAmount, []).send({ from: account, value: mintPrice * parseInt(mintAmount) });
            } else if(parseInt(dropPhase) == 3) {
                let reservedCount = await nftContract.methods.reserveCount().call(account, { from: account });
                if(parseInt(reservedCount)) {
                    await nftContract.methods.mint(mintAmount, []).send({ from: account, value: 0 });
                    reservedCount = await nftContract.methods.reserveCount().call(account, { from: account });
                    setReservedAmount(reservedCount);
                } else {
                    await nftContract.methods.mint(mintAmount, []).send({ from: account, value: mintPrice * parseInt(mintAmount) });
                }
            }
        } catch (err: any) {   
            console.error(err);
            return;
        }

    };

    const reserve = async () => {
        const nftContract = new library.eth.Contract(
            BasketballHeadABI,
            process.env.NEXT_PUBLIC_ENV == 'production' ? '0xC57C94346b466bED19438c195ad78CAdC7D09473' : '0x1d42BCE7Ef74E7699F6De85F8C753ddd8aB7C16B'
        );

        try {
            await nftContract.methods.reserve(mintAmount).send({ from: account, value: mintPrice * parseInt(mintAmount) });
            const reservedCount = await nftContract.methods.reserveCount().call(account, { from: account });
            setReservedAmount(reservedCount);
        } catch (err: any) {   
            console.error(err);
            return;
        }

    };

    React.useEffect(() => {
        async function updateAppState() {
            const nftContract = new library.eth.Contract(
                BasketballHeadABI,
                process.env.NEXT_PUBLIC_ENV == 'production' ? '0xC57C94346b466bED19438c195ad78CAdC7D09473' : '0x1d42BCE7Ef74E7699F6De85F8C753ddd8aB7C16B'
            );

            const reservedCount = await nftContract.methods.reserveCount().call(account, { from: account });
            const mPrice = await nftContract.methods.mintprice().call({ from: account });
            setReservedAmount(reservedCount);
            setMintPrice(parseInt(mPrice));
        }
        if(account) {
            updateAppState();
        }
    }, [account]);

    return (
        <Stack width="100%" padding={2} borderRadius={2} sx={{ background: '#1B1C22' }}>
            <Box>
                <Image src={BasketballImg} layout="responsive" alt="" />
            </Box>
            <Stack direction="row" justifyContent="space-between" marginTop={2}>
                <Typography fontSize={16} fontWeight={700} color="white">
                    Mint or Reserve a Basketball
                    {disabled && (
                        <Typography fontSize={16} fontWeight={700} color="#FFCA21" display="inline">
                            {` (Coming Soon)`}
                        </Typography>
                    )}
                </Typography>
                <Box>
                    <Typography fontSize={16} fontWeight={700} color="white">
                        {`${amountLeft.toLocaleString()} left`}
                    </Typography>
                </Box>
            </Stack>
            <Stack spacing={1} marginTop={3}>
                <Typography fontSize={14} fontWeight={400} color="white">
                    # of Basketball Heads (Max 3)
                </Typography>
                <AmountInputWrapper sx={{ width: 184 }}>
                    <AmountInputTextField value={mintAmount} onChange={handleInputChange} />
                    <MaxBtn onClick={() => setMintAmount(MAX_VAL.toString())}>Max</MaxBtn>
                </AmountInputWrapper>
            </Stack>
            <Stack spacing={1} marginTop={2}>
                <Typography fontSize={16} fontWeight={700} color="white">
                    {disabled ? 'Currently Unavailable' : 'You have ' + reservedAmount + ' reserve mints'}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <MintBtn disabled={disabled} onClick={mint}>Mint</MintBtn>
                        <ReserveBtn disabled={disabled} onClick={reserve}>Reserve</ReserveBtn>
                    </Stack>
                    <InfoIcon />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default BasketballMintBox;
