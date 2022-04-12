import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import BasketballHeadABI from '../../lib/ABI/BasketBallHead.json'
import { Stack, Box, Typography } from '@mui/material';
import Container from '../Container';
import SupplyBox from '../../components/CurryShop/SupplyBox';
import CounterBox from '../../components/CounterBox';
import BasketballMintBox from '../../components/CurryShop/BasketballMintBox';
import SerumMintBox from '../../components/CurryShop/SerumMintBox';
import CurryFlowClaimBox from '../../components/CurryShop/CurryFlowClaimBox';

const CurryShopPageContainer: React.FC = (): JSX.Element => {
    const { active, account, library, activate } = useWeb3React();
    const [balance, setBalance] = useState<number>(0);
    const [supplyLeft, setSupplyLeft] = useState<number>(0);

    React.useEffect(() => {
        async function updateAppState() {
            const nftContract = new library.eth.Contract(
                BasketballHeadABI,
                process.env.NEXT_PUBLIC_ENV == 'production' ? '' : '0xEAE623fc7c98a15ddB372d951355d68BE8134B83'
            );

            const balance = await nftContract.methods.balanceOf(account, 1).call({ from: account });
            setBalance(parseInt(balance));

            const maxsupply = await nftContract.methods.maxsupply().call({ from: account });
            const totalsupply = await nftContract.methods.totalsupply().call({ from: account });
            const freeMintSupply = await nftContract.methods.freeMintSupply().call({ from: account });

            setSupplyLeft(parseInt(maxsupply) - parseInt(totalsupply) - parseInt(freeMintSupply));
        }
        if(account) {
            updateAppState();
        }
    }, [account]);

    return (
        <>
            <Box sx={{ background: '#1B1C22' }}>
                <Container>
                    <Stack paddingY={5} spacing={2}>
                        <Typography fontSize={16} fontWeight={600} color="white">
                            Currently available
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <SupplyBox amount={20000} label="Basketballs supply" headColor="#FFCA21" />
                            <SupplyBox amount={60000} label="Serum supply" headColor="#B8FF97" />
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Container sx={{ marginY: 4 }}>
                <Stack direction="row" spacing={2}>
                    <CounterBox title="MY BASKETBALLS" value={balance} />
                    <CounterBox title="MY SERUMS" value={0} />
                </Stack>
                <Stack marginTop={4} spacing={3}>
                    <Typography fontSize={48} fontWeight={700} color="white">
                        Get a Basketball or Serum
                    </Typography>
                    <Stack>
                        <Typography fontSize={16} fontWeight={400} color="white">
                            ° Mint a Basketball or Serum, make sure you have a Metamask ready.
                        </Typography>
                        <Typography fontSize={16} fontWeight={400} color="white">
                            ° You can burn your Genesis Curry Flow NFT for a special Basketball.
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="flex-start" spacing={4} marginTop={6}>
                    <BasketballMintBox amountLeft={supplyLeft} />
                    <SerumMintBox amountLeft={1000} disabled />
                    <CurryFlowClaimBox amountLeft={2974} disabled />
                </Stack>
            </Container>
        </>
    );
};

export default CurryShopPageContainer;
