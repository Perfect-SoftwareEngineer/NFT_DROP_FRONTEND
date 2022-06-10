import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import BasketballHeadABI from '../../lib/ABI/BasketBallHead.json';
import { Stack, Box, Grid, Typography, Divider } from '@mui/material';
import Container from '../Container';
import SupplyBox from '../../components/CurryShop/SupplyBox';
import CounterBox from '../../components/CounterBox';
import NF3GCFClaimBox from '../../components/CurryShop/NF3Basketball/GCFClaimBox';
import NF3MintlistMintBox from '../../components/CurryShop/NF3Basketball/MintlistMintBox';
import NF3GeneralMintBox from '../../components/CurryShop/NF3Basketball/GeneralMintBox';
import SerumGCFClaimBox from '../../components/CurryShop/Serums/GCFClaimBox';
import SerumMintlistMintBox from '../../components/CurryShop/Serums/MintlistMintBox';
import SerumGeneralMintBox from '../../components/CurryShop/Serums/GeneralMintBox';
import { claimNF3GCF, claimSerumGCF, claimNF3CommunityNFT, claimSerumCommunityNFT } from '../../services/api/curryshop';
import NF3GCFInfoBox from '../../components/CurryShop/NF3InfoBox/GCFBox';
import SerumStatusBox from '../../components/CurryShop/SerumStatusBox';
import { ConnectMetamaskBtn, CategoryBtn, PhaseTypo } from './styles';
import Image from 'next/image';
import MetamaskImg from '../../assets/metamask.png';
import { connect } from '../../web3/connect';
import { useAppContext } from '../../context/AppContext';

// const nf3MintBoxes = [
//     {
//         img: '/assets/curryshop/gcf-claim.png',
//         title: 'Genesis Curry Flow Freebies',
//         desc: 'Introducing rarity to Genesis Curry Flows holders can claim one free NF3 basketball and one Serum tied to their traits. We will use a snapshot mechanism to open claiming for NF3 first and Serums at a later date!',
//         dateList: [
//             'Snapshot Date: June 9, 2022 at 5:00:00 PM PST',
//             'Start Date: June 9, 2022 at 5:00:00 PM PST',
//             'End Date: June 11, 2022 at 5:00:00 PM PST',
//         ],
//         dropPhase: 1,
//     },
//     {
//         img: '/assets/curryshop/nf3-mintlist-general-mint.svg',
//         title: 'Mintlist Mint',
//         desc: 'Our Community Holders will be able to mint before the Public Mint.',
//         dateList: ['Start Date: June 13, 2022 at 5:00:00 PM PST', 'End Date: June 15, 2022 at 5:00:00 PM PST'],
//         dropPhase: 2,
//     },
//     {
//         img: '/assets/curryshop/nf3-mintlist-general-mint.svg',
//         title: 'General Mint',
//         desc: 'Public sale to mint or reserve mint an NF3 Basketball.',
//         dateList: ['Start Date: June 16, 2022, at 5:00:00 PM PST'],
//         dropPhase: 3,
//     },
// ];

// const serumMintBoxes = [
//     {
//         img: '/assets/curryshop/gcf-claim.png',
//         title: 'Genesis Curry Flow Claims',
//         desc: 'If you are a GCF NFT Holder, mint a free NF3 Basketball',
//         dateList: [
//             'Snapshot Date: June 3, 2022 at 5PM PST',
//             'Start Date: June 3, 2022 at 5PM PST',
//             'End Date: June 5, 2022 at 5PM PST',
//         ],
//         dropPhase: 1,
//     },
//     {
//         img: '/assets/curryshop/serum-mintlist-general-mint.png',
//         title: 'Mintlist Mint',
//         desc: 'Our Community Holders will be able to mint before the Public Mint',
//         dateList: ['Start Date: XXX, 2022 at 5PM PST', 'End Date: XXX, 2022 at 5PM PST'],
//         dropPhase: 2,
//     },
//     {
//         img: '/assets/curryshop/serum-mintlist-general-mint.png',
//         title: 'General Mint',
//         desc: 'Public sale to mint or reserve mint an NF3 Basketball',
//         dateList: ['Start Date: XXX, 2022 at 5PM PST', 'End Date: XXX, 2022 at 5PM PST'],
//         dropPhase: 3,
//     },
// ];

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

    const [nf3GCFOwnedCount, setNF3GCFOwnedCount] = useState<number>(0);
    const [nf3GCFClaimHexProof, setNF3GCFClaimHexProof] = React.useState<any[]>([]);

    const [serumGCFOwnedCount, setSerumGCFOwnedCount] = useState<number>(0);
    const [serumGCFClaimHexProof, setSerumGCFClaimHexProof] = React.useState<any[]>([]);

    const [nf3CommunityOwnedCount, setNF3CommunityOwnedCount] = useState<number>(0);
    const [nf3CommunityClaimHexProof, setNF3CommunityClaimHexProof] = React.useState<any[]>([]);

    const [serumCommunityOwnedCount, setSerumCommunityOwnedCount] = useState<number>(0);
    const [serumCommunityClaimHexProof, setSerumCommunityClaimHexProof] = React.useState<any[]>([]);

    const [needUpdateInfo, setNeedUpdateInfo] = useState<boolean>(true);

    React.useEffect(() => {
        async function updateAppState() {
            const nftContract = new library.eth.Contract(
                BasketballHeadABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? '0x75615677d9cd50cb5D9660Ffb84eCd4d333E0B76'
                    : '0x22899ed83366ef867265A98413f1f332aD4Aa168'
            );
            let _dropPhase = await nftContract.methods.dropPhase().call({ from: account });
            // let _dropPhase = '3';
            setDropPhase(parseInt(_dropPhase));

            const balance = await nftContract.methods.balanceOf(account, 1).call({ from: account });
            setBalance(parseInt(balance));

            const maxsupply = await nftContract.methods.maxsupply().call({ from: account });
            const totalsupply = await nftContract.methods.totalsupply().call({ from: account });
            const totalReservedSupply = await nftContract.methods.totalReservedSupply().call({ from: account });

            if (selCategory === CategoryType.NF3_BASKETBALL) {
                const NF3GCFFlag = await nftContract.methods.mintedForGCF(account).call({ from: account });

                if (NF3GCFFlag == true) {
                    setNF3GCFOwnedCount(0);
                    setNF3GCFClaimHexProof([]);
                } else {
                    if (account) {
                        const response = await claimNF3GCF(account);
                        setNF3GCFOwnedCount(response.quantity);
                        setNF3GCFClaimHexProof(response.hexProof);
                    }
                }
            } else {
                const SerumGCFFlag = true;

                if (SerumGCFFlag == true) {
                    setSerumGCFOwnedCount(0);
                    setSerumGCFClaimHexProof([]);
                } else {
                    if (account) {
                        const response = await claimSerumGCF(account);
                        setSerumGCFOwnedCount(response.quantity);
                        setSerumGCFClaimHexProof(response.hexProof);
                    }
                }
            }

            if (selCategory === CategoryType.NF3_BASKETBALL) {
                const NF3CommunityFlag = await nftContract.methods.mintedForCommunity(account).call({ from: account });

                if (NF3CommunityFlag == true) {
                    setNF3CommunityOwnedCount(0);
                    setNF3CommunityClaimHexProof([]);
                } else {
                    if (account) {
                        const response = await claimNF3CommunityNFT(account);
                        setNF3CommunityOwnedCount(response.quantity);
                        setNF3CommunityClaimHexProof(response.hexProof);
                    }
                }
            } else {
                const SerumCommunityFlag = true;

                if (SerumCommunityFlag == true) {
                    setSerumCommunityOwnedCount(0);
                    setSerumCommunityClaimHexProof([]);
                } else {
                    if (account) {
                        const response = await claimSerumCommunityNFT(account);
                        setSerumCommunityOwnedCount(response.quantity);
                        setSerumCommunityClaimHexProof(response.hexProof);
                    }
                }
            }

            setSupplyLeft(parseInt(maxsupply) - parseInt(totalsupply) - parseInt(totalReservedSupply));
        }

        if (account && needUpdateInfo) {
            updateAppState();

            setNeedUpdateInfo(false);
        }
    }, [account, selCategory, needUpdateInfo]);

    const dropBox = () => {
        if (!appState.jwtToken) return '';
        else if (dropPhase === 1) {
            return selCategory === CategoryType.NF3_BASKETBALL ? (
                <NF3GCFClaimBox
                    gcfOwnedCount={nf3GCFOwnedCount}
                    gcfClaimHexProof={nf3GCFClaimHexProof}
                    setNeedUpdateInfo={setNeedUpdateInfo}
                />
            ) : (
                <SerumGCFClaimBox
                    gcfOwnedCount={serumGCFOwnedCount}
                    gcfClaimHexProof={serumGCFClaimHexProof}
                    setNeedUpdateInfo={setNeedUpdateInfo}
                />
            );
        } else if (dropPhase === 2) {
            return selCategory === CategoryType.NF3_BASKETBALL ? (
                <NF3MintlistMintBox
                    amountLeft={supplyLeft}
                    communityOwnedCount={nf3CommunityOwnedCount}
                    communityClaimHexProof={nf3CommunityClaimHexProof}
                    setNeedUpdateInfo={setNeedUpdateInfo}
                />
            ) : (
                <SerumMintlistMintBox
                    communityOwnedCount={serumCommunityOwnedCount}
                    communityClaimHexProof={serumCommunityClaimHexProof}
                    setNeedUpdateInfo={setNeedUpdateInfo}
                />
            );
        } else if (dropPhase === 3) {
            return selCategory === CategoryType.NF3_BASKETBALL ? (
                <NF3GeneralMintBox amountLeft={supplyLeft} setNeedUpdateInfo={setNeedUpdateInfo} />
            ) : (
                <SerumGeneralMintBox amountLeft={supplyLeft} setNeedUpdateInfo={setNeedUpdateInfo} />
            );
        }
    };

    return (
        <>
            <Container sx={{ paddingY: 8, overflow: 'visible' }}>
                <Grid container columnSpacing={4} rowGap={2} alignItems="center">
                    <Grid item xs={12} md={5}>
                        <Stack spacing={3}>
                            <Typography fontSize={48} fontWeight={800} lineHeight={1} className="neueplak_condensed">
                                CURRY SHOP
                            </Typography>
                            <Typography>
                                Curry Shop is where you get the 'goods.' Claim or purchase your NF3 Basketball, along
                                with Serums from our communities.
                            </Typography>
                            {/* <Stack direction="row" spacing={1}>
                                <CategoryBtn
                                    selected={selCategory === CategoryType.NF3_BASKETBALL}
                                    onClick={() => setSelCategory(CategoryType.NF3_BASKETBALL)}
                                >
                                    NF3 Basketball
                                </CategoryBtn>
                                <CategoryBtn
                                    selected={selCategory === CategoryType.SERUMS}
                                    // onClick={() => setSelCategory(CategoryType.SERUMS)}
                                >
                                    SERUMS: COMING SOON
                                </CategoryBtn>
                            </Stack> */}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <CounterBox title="MY NF3 BASKETBALLS" value={balance} />
                            <CounterBox title="MY SERUMS" value={0} />
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container columnSpacing={4} rowGap={4} marginTop={4}>
                    <Grid item xs={12} md={5}>
                        {account && (
                            <>
                                {dropPhase === 1 && selCategory === CategoryType.NF3_BASKETBALL ? (
                                    <NF3GCFInfoBox jwtToken={appState.jwtToken} dropPhase={dropPhase} />
                                ) : (
                                    <Stack spacing={4} marginRight={8}>
                                        <Stack spacing={3}>
                                            <Typography fontSize={20} fontWeight={800} color="#969AA1">
                                                GENERAL MINTING
                                            </Typography>
                                            <Stack spacing={1.5}>
                                                <PhaseTypo
                                                    selected={
                                                        dropPhase === 2 && selCategory === CategoryType.NF3_BASKETBALL
                                                    }
                                                >
                                                    NF3 Basketball
                                                </PhaseTypo>
                                                <PhaseTypo
                                                    selected={dropPhase === 2 && selCategory === CategoryType.SERUMS}
                                                >
                                                    Serum
                                                </PhaseTypo>
                                            </Stack>
                                            <Divider sx={{ borderColor: '#969AA1' }} />
                                        </Stack>
                                        <Stack spacing={3}>
                                            <Typography fontSize={20} fontWeight={800} color="#969AA1">
                                                MINTLISTS
                                            </Typography>
                                            <Stack spacing={1.5}>
                                                <PhaseTypo
                                                    selected={
                                                        dropPhase === 3 && selCategory === CategoryType.NF3_BASKETBALL
                                                    }
                                                >
                                                    NF3 Basketball
                                                </PhaseTypo>
                                                <PhaseTypo
                                                    selected={dropPhase === 3 && selCategory === CategoryType.SERUMS}
                                                >
                                                    Serum
                                                </PhaseTypo>
                                            </Stack>
                                            <Divider sx={{ borderColor: '#969AA1' }} />
                                        </Stack>
                                        <Stack spacing={3}>
                                            <Typography fontSize={20} fontWeight={800} color="#969AA1">
                                                SERUM FREEBEES
                                            </Typography>
                                            <Stack spacing={1.5}>
                                                <PhaseTypo
                                                    selected={dropPhase === 1 && selCategory === CategoryType.SERUMS}
                                                >
                                                    Serum
                                                </PhaseTypo>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                )}
                            </>
                        )}
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
