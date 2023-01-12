import React, { useState } from 'react';
import { Stack, Typography, Dialog } from '@mui/material';
import Container from '../Container';
import CounterBox from '../../components/CounterBox';
import { ConnectWalletBtn, CategoryBtn } from './styles';
import { useAppContext } from '../../context/AppContext';
import MutantBox from '../../components/MutantBox';
import BasketballHeadzBox from '../../components/TheLab/BasketballHeadzBox';
import BasketballBox from '../../components/TheLab/BasketballBox';
import SerumBox from '../../components/TheLab/SerumBox';
import GCFBox from '../../components/TheLab/GCFBox';
import WearableBox from '../../components/TheLab/WearableBox';
import ProductDetails from './ProductDetails';
import { useWeb3React } from '@web3-react/core';
import BasketballABI from '../../lib/ABI/BasketBall.json';
import SerumABI from '../../lib/ABI/Serum.json';
import basketballTokenData from '../../constants/basketballTokenData';
import { serumTokenInfoData } from '../../constants/serumTokenData';
import { getLocker, changeBBHName } from '../../services/api/thelab';
import gcfTokenData from '../../constants/gcfTokenData';
import metaverseShoesTokenData from '../../constants/metaverseShoesTokenData';
import {
    BasketballHeadzTokenInfoType,
    BasketballTokenInfoType,
    SerumTokenInfoType,
    GCFTokenInfoType,
    MetaverseShoesTokenInfoType
} from '../../types';
import axios from 'axios';
import Image from 'next/image';
import { connect } from '../../web3/connect';
import Link from 'next/link';
import {
    getBasketballHeadzInfo,
    getBasketballInfo,
    getSerumTokenCount,
    getGCFTokenCount,
    getEcosystemTokenCount,
    getEcosystemTokenURI
} from '../../services/thelab';
import WaitingDlg from '../../components/WaitingDlg';
import ChangeNameBox from '../../components/TheLab/ChangeNameBox';

export enum Categories {
    ALL,
    BASKETBALL_HEADZ,
    NF3_BASKETBALLS,
    SERUMS,
    GCF,
    METAVERSE_SHOES
}

const categoryButtonsList = [
    'ALL',
    'BASKETBALL HEADZ',
    'NF3 BASKETBALLS',
    'SERUMS',
    'GENESIS CURRY FLOW',
    'METAVERSE SHOES'
];

const LabPageContainer: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();
    const { active, account, library, activate } = useWeb3React();

    const [basketballBalance, setBasketballBalance] = useState<number>(0);
    const [serumBalance, setSerumBalance] = useState<number>(0);
    const [balanceLoadedFromSC, setBalanceLoadedFromSC] = useState<boolean>(false);

    const [category, setCategory] = useState<Categories>(Categories.ALL);

    const [ownedNFTTokensList, setOwnedNFTTokensList] = useState<any[]>([]);

    const [basketballHeadzToken, setBasketballHeadzToken] = useState<BasketballHeadzTokenInfoType[]>([]);
    const [selectedBasketballHeadzTokenId, setSelectedBasketballHeadzTokenId] = useState<string>('');

    const [basketballToken, setBasketballToken] = useState<BasketballTokenInfoType>(basketballTokenData);

    const [serumTokensList, setSerumTokensList] = useState<SerumTokenInfoType[]>(serumTokenInfoData);
    const [totalSerumTokensCount, setTotalSerumTokensCount] = useState<number>(0);

    const [gcfTokensList, setGCFTokensList] = useState<GCFTokenInfoType[]>(gcfTokenData);
    const [totalGCFTokensCount, setTotalGCFTokensCount] = useState<number>(0);

    const [metaverseShoesTokenList, setMetaverseShoesTokenList] =
        useState<MetaverseShoesTokenInfoType[]>(metaverseShoesTokenData);
    const [totalMetaverseTokensCount, setTotalMetaverseTokensCount] = useState<number>(0);

    const [balanceLoadedFromBE, setBalanceLoadedFromBE] = useState<boolean>(false);

    const [showChangeNameDlg, setShowChangeNameDlg] = useState<boolean>(false);
    const [changeNameBBH, setChangeNameBBH] = useState<BasketballHeadzTokenInfoType>();

    React.useEffect(() => {
        async function updateAppState() {
            const nftContract = new library.eth.Contract(
                BasketballABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? process.env.NEXT_PUBLIC_MAINNET_BASKETBALL_CONTRACT_ADDRESS
                    : process.env.NEXT_PUBLIC_TESTNET_BASKETBALL_CONTRACT_ADDRESS
            );

            const nftContract1 = new library.eth.Contract(
                SerumABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? process.env.NEXT_PUBLIC_MAINNET_SERUM_CONTRACT_ADDRESS
                    : process.env.NEXT_PUBLIC_TESTNET_SERUM_CONTRACT_ADDRESS
            );

            const balance1 = await nftContract.methods.balanceOf(account, 1).call({ from: account });
            setBasketballBalance(parseInt(balance1));

            let balance2 = 0;
            for (let i = 1; i <= 11; i++) {
                const temp = await nftContract1.methods.balanceOf(account, i).call({ from: account });
                balance2 = balance2 + parseInt(temp);
            }
            setSerumBalance(balance2);

            setBalanceLoadedFromSC(true);
        }

        if (account) {
            updateAppState();
        }
    }, [account]);

    React.useEffect(() => {
        async function updateAppState() {
            if (account) {
                getLocker(account)
                    .then((response: any[]) => {
                        // console.log('getLocker response:', response);
                        setOwnedNFTTokensList(response);
                    })
                    .catch((error) => {
                        setOwnedNFTTokensList([]);
                    });
            }
        }

        if (account) {
            updateAppState();
        }
    }, [account]);

    React.useEffect(() => {
        async function getTokensData() {
            //get basketballheadz tokens info
            let basketballHeadzList: BasketballHeadzTokenInfoType[] = [];
            for (let i = 0; i < ownedNFTTokensList.length; i++) {
                if (ownedNFTTokensList[i].platform === 'Basketballhead') {
                    let item = await getBasketballHeadzInfo(ownedNFTTokensList[i]);
                    basketballHeadzList.push(item);
                }
            }
            setBasketballHeadzToken(basketballHeadzList);

            // get basketball tokens info
            let basketballInfo = await getBasketballInfo(ownedNFTTokensList);
            let newBasketballToken = { ...basketballToken, count: basketballInfo.count, image: basketballInfo.image };
            setBasketballToken(newBasketballToken);

            // get serum tokens info
            let newSerumTokenList = serumTokenInfoData.map((item) => {
                let count = getSerumTokenCount(ownedNFTTokensList, item.tokenId);
                return { ...item, count };
            });
            setSerumTokensList(newSerumTokenList);

            let totalSerumTokenCnt = newSerumTokenList.reduce((prev, cur) => prev + cur.count, 0);
            setTotalSerumTokensCount(totalSerumTokenCnt);

            // get GCF tokens info
            let newGCFTokensList = gcfTokenData.map((item) => {
                let count = getGCFTokenCount(ownedNFTTokensList, item.tokenId.toString());
                return { ...item, count };
            });
            setGCFTokensList(newGCFTokensList);

            let totalGCFTokenCnt = newGCFTokensList.reduce((prev, cur) => prev + cur.count, 0);
            setTotalGCFTokensCount(totalGCFTokenCnt);

            //get Metaverse shoes tokens info
            let newMetaverseTokensList = metaverseShoesTokenData.map((item) => {
                let count = getEcosystemTokenCount(ownedNFTTokensList, item.platform);
                // let image = getEcosystemTokenURI(ownedNFTTokensList, item.platform);
                return { ...item, count };
            });
            setMetaverseShoesTokenList(newMetaverseTokensList);

            let totalMetaverseTokenCnt = newMetaverseTokensList.reduce((prev, cur) => prev + cur.count, 0);
            setTotalMetaverseTokensCount(totalMetaverseTokenCnt);

            setBalanceLoadedFromBE(true);
        }

        getTokensData();
    }, [ownedNFTTokensList]);

    const onChangeName = (item: BasketballHeadzTokenInfoType) => {
        setChangeNameBBH(item);
        setShowChangeNameDlg(true);
    };

    const saveBBHName = async (newName: string) => {
        changeBBHName(newName, account!, changeNameBBH!.tokenId!, appState.jwtToken)
            .then((response: any) => {
                // console.log('changeBBHName response:', response);

                let newData = basketballHeadzToken.map((item) => {
                    if (item.tokenId === response.tokenId) {
                        return { ...item, title: response.name };
                    } else {
                        return item;
                    }
                });
                setBasketballHeadzToken(newData);
            })
            .catch((error) => {})
            .finally(() => setShowChangeNameDlg(false));
    };

    return (
        <>
            <Container sx={{ paddingY: 8, overflow: 'visible' }}>
                <Stack>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'flex-start', md: 'center' }}
                        spacing={2}
                    >
                        <Typography fontSize={48} fontWeight={800} lineHeight={1} className="neueplak_condensed">
                            THE LAB
                        </Typography>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                            <CounterBox title="MY NF3 BASKETBALLS" value={basketballBalance} />
                            <CounterBox title="MY SERUMS" value={serumBalance} />
                        </Stack>
                    </Stack>
                    {account ? (
                        <Stack spacing={5}>
                            <Stack
                                direction="row"
                                flexWrap="wrap"
                                justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                columnGap={2}
                                rowGap={2}
                                marginTop={8}
                            >
                                {categoryButtonsList.map((item, index) => (
                                    <CategoryBtn
                                        key={`category-btn-${index}`}
                                        selected={category === index}
                                        onClick={() => setCategory(index)}
                                    >
                                        {item}
                                    </CategoryBtn>
                                ))}
                            </Stack>
                            {basketballHeadzToken.length +
                                basketballToken.count +
                                totalSerumTokensCount +
                                totalGCFTokensCount +
                                totalMetaverseTokensCount ===
                                0 && (
                                <Stack spacing={2}>
                                    <Typography fontSize={32} fontWeight={700}>
                                        You have no NFTs in The Lab.
                                    </Typography>
                                    <Typography width={{ xs: '100%', md: '40%' }}>
                                        We could not find any of our collection's NFTs in your wallet. Go to our{' '}
                                        <Link href="/curryshop" passHref>
                                            <a rel="noopener noreferrer">
                                                <Typography color="#FFCA21" display="inline">
                                                    Curry Shop
                                                </Typography>
                                            </a>
                                        </Link>{' '}
                                        or Opensea links to get the 'goods'.
                                    </Typography>
                                </Stack>
                            )}
                            {(category === Categories.ALL || category === Categories.BASKETBALL_HEADZ) &&
                                basketballHeadzToken.length > 0 && (
                                    <Stack spacing={3}>
                                        <Typography fontSize={32} fontWeight={700} color="white">
                                            Basketball Headz
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            flexWrap="wrap"
                                            justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                            columnGap={4}
                                            rowGap={4}
                                        >
                                            {basketballHeadzToken.map((item, index) => (
                                                <BasketballHeadzBox
                                                    item={item}
                                                    selectedBasketballHeadzTokenId={selectedBasketballHeadzTokenId}
                                                    setSelectedBasketballHeadzTokenId={
                                                        setSelectedBasketballHeadzTokenId
                                                    }
                                                    sx={{ zIndex: basketballHeadzToken.length - index }}
                                                    key={`basketballheadz_box_${index}`}
                                                    onChangeName={onChangeName}
                                                />
                                            ))}
                                        </Stack>
                                    </Stack>
                                )}
                            {(category === Categories.ALL || category === Categories.NF3_BASKETBALLS) &&
                                basketballToken.count > 0 && (
                                    <Stack spacing={3}>
                                        <Typography fontSize={32} fontWeight={700} color="white">
                                            NF3 Basketball
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            flexWrap="wrap"
                                            justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                            columnGap={4}
                                            rowGap={4}
                                        >
                                            <BasketballBox item={basketballToken} />
                                        </Stack>
                                    </Stack>
                                )}
                            {(category === Categories.ALL || category === Categories.SERUMS) &&
                                totalSerumTokensCount > 0 && (
                                    <Stack spacing={3}>
                                        <Typography fontSize={32} fontWeight={700} color="white">
                                            Serums
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            flexWrap="wrap"
                                            justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                            columnGap={4}
                                            rowGap={4}
                                        >
                                            {serumTokensList.map((item, index) => {
                                                return (
                                                    item.count > 0 && (
                                                        <SerumBox item={item} key={`serum_box_${index}`} />
                                                    )
                                                );
                                            })}
                                        </Stack>
                                    </Stack>
                                )}
                            {(category === Categories.ALL || category === Categories.GCF) && totalGCFTokensCount > 0 && (
                                <Stack spacing={3}>
                                    <Typography fontSize={32} fontWeight={700} color="white">
                                        Genesis Curry Flow
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        flexWrap="wrap"
                                        justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                        columnGap={4}
                                        rowGap={4}
                                    >
                                        {gcfTokensList.map((item, index) => {
                                            return item.count > 0 && <GCFBox item={item} key={`gcf_box_${index}`} />;
                                        })}
                                    </Stack>
                                </Stack>
                            )}
                            {(category === Categories.ALL || category === Categories.METAVERSE_SHOES) &&
                                totalMetaverseTokensCount > 0 && (
                                    <Stack spacing={3}>
                                        <Typography fontSize={32} fontWeight={700} color="white">
                                            Metaverse Shoes
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            flexWrap="wrap"
                                            justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                            columnGap={4}
                                            rowGap={4}
                                        >
                                            {metaverseShoesTokenList.map((item, index) => {
                                                return (
                                                    item.count > 0 && (
                                                        <WearableBox item={item} key={`wearable_box_${index}`} />
                                                    )
                                                );
                                            })}
                                        </Stack>
                                    </Stack>
                                )}
                        </Stack>
                    ) : (
                        <Stack alignItems="center" marginTop={{ xs: 6, md: 12 }} marginLeft={{ xs: 0, md: 3 }}>
                            <Typography fontSize={48} fontWeight={700} lineHeight={1.1} textAlign="center">
                                To Get Started, Connect Your Wallet
                            </Typography>
                            <Stack width={{ xs: '80%', sm: '60%', md: 536 }} marginTop={4}>
                                <Typography marginX="auto" textAlign="center">
                                    Make sure to download Metamask. Once you create or connect your MetaMask account,
                                    connect your wallet.
                                </Typography>
                                <ConnectWalletBtn
                                    sx={{ marginTop: 5, marginX: 'auto' }}
                                    onClick={() => connect(activate)}
                                >
                                    <Image src="/assets/wallet/metamask.png" width={56} height={56} />
                                    <Typography
                                        fontSize={{ xs: 22, sm: 26, md: 32 }}
                                        fontWeight={600}
                                        lineHeight={1.1}
                                        marginLeft={{ xs: 1, sm: 2, md: 4 }}
                                        sx={{ padding: '0 0 8px' }}
                                    >
                                        Connect MetaMask
                                    </Typography>
                                </ConnectWalletBtn>
                                <ConnectWalletBtn
                                    sx={{ marginTop: 2, marginX: 'auto' }}
                                    onClick={() => connect(activate, 'coinbase')}
                                >
                                    <Image src="/assets/wallet/coinbase.png" width={56} height={56} />
                                    <Typography
                                        fontSize={{ xs: 22, sm: 26, md: 32 }}
                                        fontWeight={600}
                                        lineHeight={1.1}
                                        marginLeft={{ xs: 1, sm: 2, md: 4 }}
                                        sx={{ padding: '0 0 8px' }}
                                    >
                                        Connect Coinbase
                                    </Typography>
                                </ConnectWalletBtn>
                            </Stack>
                        </Stack>
                    )}
                </Stack>
            </Container>
            <WaitingDlg open={!!account && (!balanceLoadedFromSC || !balanceLoadedFromBE)} />
            <Dialog
                open={showChangeNameDlg}
                onClose={() => setShowChangeNameDlg(false)}
                maxWidth="lg"
                PaperProps={{
                    sx: {
                        padding: { xs: 2, md: 8 },
                        background: 'none',
                        boxShadow: 'none'
                    }
                }}
            >
                <ChangeNameBox item={changeNameBBH} onSave={saveBBHName} onCancel={() => setShowChangeNameDlg(false)} />
            </Dialog>
        </>
    );
};

export default LabPageContainer;
