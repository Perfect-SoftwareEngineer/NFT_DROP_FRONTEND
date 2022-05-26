import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import BasketballHeadABI from '../../lib/ABI/BasketBallHead.json';
import { Stack, Box, Grid, Typography } from '@mui/material';
import Container from '../Container';
import SupplyBox from '../../components/CurryShop/SupplyBox';
import CounterBox from '../../components/CounterBox';
import NF3GCFClaimBox from '../../components/CurryShop/NF3Basketball/GCFClaimBox';
import NF3MintlistMintBox from '../../components/CurryShop/NF3Basketball/MintlistMintBox';
import NF3GeneralMintBox from '../../components/CurryShop/NF3Basketball/GeneralMintBox';
import SerumGCFClaimBox from '../../components/CurryShop/Serums/GCFClaimBox';
import SerumMintlistMintBox from '../../components/CurryShop/Serums/MintlistMintBox';
import SerumGeneralMintBox from '../../components/CurryShop/Serums/GeneralMintBox';
import { claimGCF, claimCommunityNFT } from '../../services/fetch';
import StatusBox from '../../components/CurryShop/StatusBox';
import { ConnectMetamaskBtn, CategoryBtn } from './styles';
import Image from 'next/image';
import MetamaskImg from '../../assets/metamask.png';
import { connect } from '../../web3/connect';
import { useAppContext } from '../../context/AppContext';

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
        dropPhase: 1,
    },
    {
        img: '/assets/curryshop/mintlist-general-mint.svg',
        title: 'Mintlist Mint',
        desc: 'Our Community Holders will be able to mint before the Public Mint',
        dateList: ['Start Date: XXX, 2022 at 5PM PST', 'End Date: XXX, 2022 at 5PM PST'],
        dropPhase: 2,
    },
    {
        img: '/assets/curryshop/mintlist-general-mint.svg',
        title: 'General Mint',
        desc: 'Public sale to mint or reserve mint an NF3 Basketball',
        dateList: ['Start Date: XXX, 2022 at 5PM PST', 'End Date: XXX, 2022 at 5PM PST'],
        dropPhase: 3,
    },
];

enum CategoryType {
    NF3_BASKETBALL,
    SERUMS,
}

const CurryShopPageContainer: React.FC = (): JSX.Element => {
    const { active, account, library, activate } = useWeb3React();
    const [appState, setAppState] = useAppContext();

    const [selCategory, setSelCategory] = useState<CategoryType>(CategoryType.NF3_BASKETBALL);

    const [balance, setBalance] = useState<number>(0);
    const [supplyLeft, setSupplyLeft] = useState<number>(0);

    const [dropPhase, setDropPhase] = useState<number>(0);
    const [gcfOwnedCount, setGCFOwnedCount] = useState<number>(0);
    const [communityOwnedCount, setCommunityOwnedCount] = useState<number>(0);
    const [hexProofForGCFClaim, setHexProofForGCFClaim] = React.useState<any[]>([]);

    const [hexProofForCommunityClaim, setHexProofForCommunityClaim] = React.useState<any[]>([]);

    const [needUpdateInfo, setNeedUpdateInfo] = useState<boolean>(true);

    React.useEffect(() => {
        async function updateAppState() {
            const nftContract = new library.eth.Contract(
                BasketballHeadABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? '0xC57C94346b466bED19438c195ad78CAdC7D09473'
                    : '0xdb52bBC7bc3312B815E2978Aed339987D95D0444'
            );
            let _dropPhase = await nftContract.methods.dropPhase().call({ from: account });
            setDropPhase(parseInt(_dropPhase));

            const balance = await nftContract.methods.balanceOf(account, 1).call({ from: account });
            setBalance(parseInt(balance));

            const maxsupply = await nftContract.methods.maxsupply().call({ from: account });
            const totalsupply = await nftContract.methods.totalsupply().call({ from: account });
            const totalReservedSupply = await nftContract.methods.totalReservedSupply().call({ from: account });

            const GCFFlag = await nftContract.methods.mintedForGCF(account).call({ from: account });

            if (GCFFlag == true) {
                setGCFOwnedCount(0);
                setHexProofForGCFClaim([]);
            } else {
                if (account) {
                    const response = await claimGCF(account);
                    setGCFOwnedCount(response.quantity);
                    setHexProofForGCFClaim(response.hexProof);
                }
            }

            const CommunityFlag = await nftContract.methods.mintedForCommunity(account).call({ from: account });

            if (CommunityFlag == true) {
                setCommunityOwnedCount(0);
                setHexProofForCommunityClaim([]);
            } else {
                if (account) {
                    const response = await claimCommunityNFT(account);
                    setCommunityOwnedCount(response.quantity);
                    setHexProofForCommunityClaim(response.hexProof);
                }
            }

            setSupplyLeft(parseInt(maxsupply) - parseInt(totalsupply) - parseInt(totalReservedSupply));
        }

        if (account && needUpdateInfo) {
            updateAppState();

            setNeedUpdateInfo(false);
        }
    }, [account, needUpdateInfo]);

    const dropBox = () => {
        if (!appState.jwtToken) return '';
        else if (dropPhase === 1) {
            return selCategory === CategoryType.NF3_BASKETBALL ? (
                <NF3GCFClaimBox
                    gcfOwnedCount={gcfOwnedCount}
                    hexProofForGCFClaim={hexProofForGCFClaim}
                    setNeedUpdateInfo={setNeedUpdateInfo}
                />
            ) : (
                <SerumGCFClaimBox
                    gcfOwnedCount={gcfOwnedCount}
                    hexProofForGCFClaim={hexProofForGCFClaim}
                    setNeedUpdateInfo={setNeedUpdateInfo}
                />
            );
        } else if (dropPhase === 2) {
            return (
                <NF3MintlistMintBox
                    communityOwnedCount={communityOwnedCount}
                    hexProofForCommunityClaim={hexProofForCommunityClaim}
                    setNeedUpdateInfo={setNeedUpdateInfo}
                />
            );
        } else if (dropPhase === 3) {
            return (
                <>
                    <NF3GeneralMintBox amountLeft={supplyLeft} setNeedUpdateInfo={setNeedUpdateInfo} />
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
                                    <SupplyBox amount={supplyLeft} label="Basketballs supply" headColor="#FFCA21" />
                                </Grid>
                                <Grid item xs={6}>
                                    <SupplyBox amount={60000} label="Serum supply" headColor="#B8FF97" />
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Container sx={{ marginY: 4, overflow: 'visible' }}>
                <Stack direction="row" spacing={2}>
                    <CounterBox title="MY BASKETBALLS" value={balance} />
                    <CounterBox title="MY SERUMS" value={0} />
                </Stack>
                <Stack marginTop={4} spacing={3}>
                    <Typography fontSize={48} fontWeight={800} lineHeight={1} className="neueplak_condensed">
                        CURRY SHOP
                    </Typography>
                    <Typography width={{ xs: '100%', sm: '80%', md: '40%' }}>
                        The next iteration of Curry Brand's effort to create the most positive Basketball community of
                        all time, championed by the greatest shooter of all time
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1} marginTop={2}>
                    <CategoryBtn
                        selected={selCategory === CategoryType.NF3_BASKETBALL}
                        onClick={() => setSelCategory(CategoryType.NF3_BASKETBALL)}
                    >
                        NF3 Basketball
                    </CategoryBtn>
                    <CategoryBtn
                        selected={selCategory === CategoryType.SERUMS}
                        onClick={() => setSelCategory(CategoryType.SERUMS)}
                    >
                        Serums
                    </CategoryBtn>
                </Stack>
                <Grid container columnSpacing={4} rowGap={4} marginTop={6}>
                    <Grid item xs={12} md={5}>
                        <Stack spacing={3}>
                            {mintBoxes.map((item, index) => (
                                <StatusBox
                                    {...item}
                                    selected={!!appState.jwtToken && item.dropPhase === dropPhase}
                                    key={`status_box_key${index}`}
                                />
                            ))}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        {account ? (
                            dropBox()
                        ) : (
                            <Stack marginLeft={3}>
                                <Typography fontSize={48} fontWeight={700}>
                                    Connect MetaMask Wallet
                                </Typography>
                                <Typography marginTop={2}>
                                    Make sure to download Metamask. Once you create or connect your MetaMask account,
                                    connect your wallet.
                                </Typography>
                                <ConnectMetamaskBtn sx={{ marginTop: 5 }} onClick={() => connect(activate)}>
                                    <Image src={MetamaskImg} width={56} height={56} />
                                    <Typography
                                        fontSize={{ xs: 22, sm: 26, md: 32 }}
                                        fontWeight={600}
                                        lineHeight={1.1}
                                        marginLeft={{ xs: 1, sm: 2, md: 4 }}
                                        sx={{ padding: '0 0 8px' }}
                                    >
                                        Connect Metamask
                                    </Typography>
                                </ConnectMetamaskBtn>
                            </Stack>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default CurryShopPageContainer;
