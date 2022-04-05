import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Container from '../Container';
import SupplyBox from '../../components/CurryShop/SupplyBox';
import CounterBox from '../../components/CounterBox';
import ItemBox from '../../components/CurryShop/ItemBox';
import BasketballMintBox from '../../components/CurryShop/BasketballMintBox';
import SerumMintBox from '../../components/CurryShop/SerumMintBox';
import GenersisCurryFlowImg from '../../assets/curryshop/genesis-curry-flow.png';

const CurryShopPageContainer: React.FC = (): JSX.Element => {
    return (
        <>
            <Box sx={{ background: '#1B1C22' }}>
                <Container>
                    <Stack paddingY={5} spacing={2}>
                        <Typography fontSize={16} fontWeight={600} color="white">
                            Currently available
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <SupplyBox amount={10000} label="Basketballs supply" headColor="#FFCA21" />
                            <SupplyBox amount={30000} label="Serum supply" headColor="#B8FF97" />
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Container sx={{ marginY: 4 }}>
                <Stack direction="row" spacing={2}>
                    <CounterBox title="MY BASKETBALLS" value={0} />
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
                <Stack direction="row" spacing={4} marginTop={6}>
                    <BasketballMintBox amountLeft={4000} />
                    <SerumMintBox amountLeft={1000} disabled />
                    {/* <ItemBox
                        type={0}
                        title="Mint or Reserve a Basketball"
                        amountLeft={4000}
                        inputFieldTitle="# of Basketball Heads (Max 3)"
                        img={BasketballImg}
                    />
                    <ItemBox
                        type={1}
                        disabled
                        title="Mint or Reserve a Serum"
                        amountLeft={1000}
                        inputFieldTitle="# of Serums (Max 6)"
                        img={SerumImg}
                    />
                    <ItemBox
                        type={2}
                        title="Claim your Genesis Curry Flow Serum"
                        amountLeft={2974}
                        img={GenersisCurryFlowImg}
                    /> */}
                </Stack>
            </Container>
        </>
    );
};

export default CurryShopPageContainer;
