import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import BasketballHeadABI from '../../lib/ABI/BasketBallHead.json';
import { Stack, Box, Grid, Typography } from '@mui/material';
import Container from '../Container';
import SupplyBox from '../../components/CurryShop/SupplyBox';
import CounterBox from '../../components/CounterBox';
import BasketballMintBox from '../../components/CurryShop/BasketballMintBox';
import SerumMintBox from '../../components/CurryShop/SerumMintBox';
import CurryFlowClaimBox from '../../components/CurryShop/CurryFlowClaimBox';
import CommunityMintBox from '../../components/CurryShop/CommunityMintBox';
import { claimGCF, claimCommunityNFT } from '../../services/fetch';
import StatusBox from '../../components/CurryShop/StatusBox';

const mintBoxes = [
    {
        img: '/assets/curryshop/gcf-claim.png',
        title: 'Genesis Curry Flow Claims',
        desc: 'If you are a GCF NFT Holder, mint a free NFT3 Basketball',
        dateList: [
            'Snapshot Date: June 3, 2022 at 5PM PST',
            'Start Date: June 3, 2022 at 5PM PST',
            'End Date: June 5, 2022 at 5PM PST',
        ],
    },
    {
        img: '/assets/curryshop/mintlist-general-mint.svg',
        title: 'Mintlist Mint',
        desc: 'Our Community Holders will be able to mint before the Public Mint',
        dateList: ['Start Date: XXX, 2022 at 5PM PST', 'End Date: XXX, 2022 at 5PM PST'],
    },
    {
        img: '/assets/curryshop/mintlist-general-mint.svg',
        title: 'General Mint',
        desc: 'Public sale to mint or reserve mint an NF3 Basketball',
        dateList: ['Start Date: XXX, 2022 at 5PM PST', 'End Date: XXX, 2022 at 5PM PST'],
    },
];

const CurryShopPageContainer: React.FC = (): JSX.Element => {
    const { active, account, library, activate } = useWeb3React();
    const [balance, setBalance] = useState<number>(0);
    const [supplyLeft, setSupplyLeft] = useState<number>(0);

    const [dropPhase, setDropPhase] = useState<number>(0);
    const [gcfOwnedCount, setGCFOwnedCount] = useState<number>(0);
    const [communityOwnedCount, setCommunityOwnedCount] = useState<number>(0);
    const [hexProofForGCFClaim, setHexProofForGCFClaim] = React.useState<any[]>([]);

    const [hexProofForCommunityClaim, setHexProofForCommunityClaim] = React.useState<any[]>([]);

    React.useEffect(() => {
        async function updateAppState() {
            const nftContract = new library.eth.Contract(
                BasketballHeadABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? '0xC57C94346b466bED19438c195ad78CAdC7D09473'
                    : '0xb627Cd8E908EDfde1494304168AF6f59ADcB410E'
            );
            let _dropPhase = await nftContract.methods.dropPhase().call({ from: account });
            setDropPhase(parseInt(_dropPhase));

            const balance = await nftContract.methods.balanceOf(account, 1).call({ from: account });
            setBalance(parseInt(balance));

            const maxsupply = await nftContract.methods.maxsupply().call({ from: account });
            const totalsupply = await nftContract.methods.totalsupply().call({ from: account });

            setSupplyLeft(parseInt(maxsupply) - parseInt(totalsupply));
        }
        if (account) {
            updateAppState();

            claimGCF(account)
                .then((response: any) => {
                    // console.log('response:', response);
                    setGCFOwnedCount(response.quantity);
                    setHexProofForGCFClaim(response.hexProof);
                })
                .catch((error) => {
                    setGCFOwnedCount(0);
                    setHexProofForGCFClaim([]);
                });

            claimCommunityNFT(account)
                .then((response: any) => {
                    // console.log('response:', response);
                    setCommunityOwnedCount(response.quantity);
                    setHexProofForCommunityClaim(response.hexProof);
                })
                .catch((error) => {
                    setCommunityOwnedCount(0);
                    setHexProofForCommunityClaim([]);
                });
        }
    }, [account]);

    const dropBox = () => {
        if (dropPhase == 1) {
            return (
                <Grid item xs={12} md={6} lg={4}>
                    <CurryFlowClaimBox
                        amountLeft={2974}
                        gcfOwnedCount={gcfOwnedCount}
                        hexProofForGCFClaim={hexProofForGCFClaim}
                    />
                </Grid>
            );
        } else if (dropPhase == 2) {
            return (
                <Grid item xs={12} md={6} lg={4}>
                    <CommunityMintBox
                        communityOwnedCount={communityOwnedCount}
                        hexProofForCommunityClaim={hexProofForCommunityClaim}
                    />
                </Grid>
            );
        } else if (dropPhase == 3) {
            return (
                <>
                    <Grid item xs={12} md={6} lg={4}>
                        <BasketballMintBox amountLeft={supplyLeft} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <SerumMintBox amountLeft={1000} disabled />
                    </Grid>
                </>
            );
        }
    };

    return (
        <>
            <Box sx={{ background: '#1B1C22' }}>
                <Container>
                    <Stack paddingY={5} spacing={2}>
                        <Typography fontSize={16} fontWeight={600}>
                            Currently available
                        </Typography>
                        <Box>
                            <Grid container columnSpacing={2} maxWidth={540}>
                                <Grid item xs={6}>
                                    <SupplyBox amount={20000} label="Basketballs supply" headColor="#FFCA21" />
                                </Grid>
                                <Grid item xs={6}>
                                    <SupplyBox amount={60000} label="Serum supply" headColor="#B8FF97" />
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Container sx={{ marginY: 4 }}>
                <Stack direction="row" spacing={2}>
                    <CounterBox title="MY BASKETBALLS" value={balance} />
                    <CounterBox title="MY SERUMS" value={0} />
                </Stack>
                <Stack marginTop={4} spacing={3}>
                    <Typography fontSize={48} fontWeight={800} lineHeight={1} className="neueplak_condensed">
                        CURRY SHOP
                    </Typography>
                    <Typography width="40%">
                        The next iteration of Curry Brand's effort to create the most positive Basketball community of
                        all time, championed by the greatest shooter of all time
                    </Typography>
                </Stack>
                <Grid container columnSpacing={4} rowGap={4} marginTop={6}>
                    <Grid item xs={5}>
                        <Stack spacing={3}>
                            {mintBoxes.map((item, index) => (
                                <StatusBox {...item} selected={index === 0} key={`status_box_key${index}`} />
                            ))}
                        </Stack>
                    </Grid>
                    <Grid item xs={7}></Grid>
                </Grid>
            </Container>
        </>
    );
};

export default CurryShopPageContainer;
