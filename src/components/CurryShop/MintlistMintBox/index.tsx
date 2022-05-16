import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useWeb3React } from '@web3-react/core';
import web3 from 'web3';
import BasketballHeadABI from '../../../lib/ABI/BasketBallHead.json';
import CommunityImg from '../../../assets/curryshop/community.png';
import { ClaimBtn } from './styles';

type ComponentProps = {
    // amountLeft: number;
    communityOwnedCount: number;
    hexProofForCommunityClaim: any[];
};

const MintlistMintBox: React.FC<ComponentProps> = ({communityOwnedCount, hexProofForCommunityClaim}): JSX.Element => {
    const {  account, library } = useWeb3React();
 
    const mint = async () => {
        if (!account) return;

        const nftContract = new library.eth.Contract(
            BasketballHeadABI,
            process.env.NEXT_PUBLIC_ENV == 'production'
                ? '0xC57C94346b466bED19438c195ad78CAdC7D09473'
                : '0xb627Cd8E908EDfde1494304168AF6f59ADcB410E'
        );

        let _mintPrice = 0.07;
        let value = (_mintPrice * communityOwnedCount).toString();
        value = web3.utils.toWei(value, 'ether');
        await nftContract.methods
            .mint(communityOwnedCount, hexProofForCommunityClaim)
            .send({ from: account, value: value })
            .then(
                //to do : update db
            )
            .catch((e : any) => console.log(e))
    };
    return (
        <Stack width="100%" padding={2} borderRadius={2} sx={{ background: '#1B1C22' }}>
            <Box>
                <Image src={CommunityImg} layout="responsive" alt="" />
            </Box>
            <Stack spacing={3} marginTop={2}>
                <Typography fontWeight={700} color="white">
                    Mintlist
                </Typography>
                <Typography fontWeight={700} color="white">
                    Price: 0.07 ETH
                </Typography>
                <Stack spacing={1}>
                    <Typography fontSize={16} fontWeight={700} color="white">
                        You own {communityOwnedCount} Genesis Curry Flow
                    </Typography>
                    <ClaimBtn onClick={mint}>Mint</ClaimBtn>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default MintlistMintBox;
