import React, {useState} from 'react';
import { useWeb3React } from '@web3-react/core';
import web3 from 'web3';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { ClaimBtn, MoreDetailsBtn } from './styles';
import BasketballHeadABI from '../../../lib/ABI/BasketBallHead.json';
import InfoIcon from '../../../assets/curryshop/info.svg';
import GenersisCurryFlowImg from '../../../assets/curryshop/genesis-curry-flow.png';

type ComponentProps = {
    amountLeft: number;
    gcfOwnedCount: number;
    hexProofForGCFClaim: any[];
};

const CurryFlowClaimBox: React.FC<ComponentProps> = ({ amountLeft, gcfOwnedCount, hexProofForGCFClaim }): JSX.Element => {
    const {  account, library } = useWeb3React();
    const [ count, setCount ] = useState<number>(gcfOwnedCount);

    const mint = async () => {
        if (!account) return;

        const nftContract = new library.eth.Contract(
            BasketballHeadABI,
            process.env.NEXT_PUBLIC_ENV == 'production'
                ? '0xC57C94346b466bED19438c195ad78CAdC7D09473'
                : '0xb627Cd8E908EDfde1494304168AF6f59ADcB410E'
        );

        nftContract.methods
            .mint(count, hexProofForGCFClaim)
            .send({ from: account, value: 0 })
            .then(
                //to do : update db
            )
            .catch((e : any) => console.log(e))
            
    };
    return (
        <Stack width="100%" height="100%" padding={2} borderRadius={2} sx={{ background: '#1B1C22' }}>
            <Box>
                <Image src={GenersisCurryFlowImg} layout="responsive" alt="" />
            </Box>
            <Stack height="100%" spacing={3} marginTop={2}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography fontWeight={700}>Claim your Genesis Curry Flow Serum</Typography>
                    <Box>
                        <Typography fontWeight={700}>{`${amountLeft.toLocaleString()} left`}</Typography>
                    </Box>
                </Stack>
                <Stack height="100%" justifyContent="space-between">
                    <Typography fontWeight={700}>Free Mints for GCF NFT Holders</Typography>
                    <Stack spacing={1}>
                        <Typography fontWeight={700}>{`You own ${count} Genesis Curry Flow`}</Typography>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <ClaimBtn onClick={mint}>Claim</ClaimBtn>
                                <MoreDetailsBtn>More details</MoreDetailsBtn>
                            </Stack>
                            <InfoIcon />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default CurryFlowClaimBox;
