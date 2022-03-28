import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Container from '../Container';
import SupplyBox from '../../components/CurryShop/SupplyBox';
import CounterBox from '../../components/CounterBox';
import ItemBox from '../../components/CurryShop/ItemBox';
import BasketballImg from '../../assets/curryshop/basketball.png';
import SerumImg from '../../assets/curryshop/serum.png';
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
                            <SupplyBox type={0} amount={10000} />
                            <SupplyBox type={1} amount={30000} />
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
                    <ItemBox type={0} title="Mint a Basketball" amountLeft={4000} img={BasketballImg} />
                    <ItemBox type={1} title="Mint a Serum" amountLeft={1000} img={SerumImg} />
                    <ItemBox
                        type={2}
                        title="Claim your Genesis Curry Flow Seru,"
                        amountLeft={2974}
                        img={GenersisCurryFlowImg}
                    />
                </Stack>
            </Container>
        </>
    );
};

export default CurryShopPageContainer;
