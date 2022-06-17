import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import Container from '../Container';
import CounterBox from '../../components/CounterBox';
import { CategoryBtn } from './styles';
import { useAppContext } from '../../context/AppContext';
import MutantBox from '../../components/MutantBox';
import BasketballBox from '../../components/TheLab/BasketballBox';
import SerumBox from '../../components/TheLab/SerumBox';
import GCFBox from '../../components/TheLab/GCFBox';
import WearableBox from '../../components/TheLab/WearableBox';
import ProductDetails from './ProductDetails';
import { useWeb3React } from '@web3-react/core';
import BasketballHeadABI from '../../lib/ABI/BasketBallHead.json';
import SerumABI from '../../lib/ABI/Serum.json';
import basketballTokenData from '../../constants/basketballTokenData';
import { serumTokenInfoData } from '../../constants/serumTokenData';
import { getLocker } from '../../services/api/thelab';
import gcfTokenData from '../../constants/gcfTokenData';
import metaverseShoesTokenData from '../../constants/metaverseShoesTokenData';
import {
    BasketballTokenInfoType,
    SerumTokenInfoType,
    GCFTokenInfoType,
    MetaverseShoesTokenInfoType,
} from '../../types';
import axios from 'axios';

export enum Categories {
    ALL,
    NF3_BASKETBALLS,
    SERUMS,
    GCF,
    METAVERSE_SHOES,
}

const categoryButtonsList = ['ALL', 'NF3 BASKETBALLS', 'SERUMS', 'GENESIS CURRY FLOW', 'METAVERSE SHOES'];

const getSerumTokenCount = (data: any[], tokenId: string) => {
    let obj = data.find((item) => item['platform'] === 'Serum' && item['tokenId'] === tokenId);
    return obj === undefined || obj === null ? 0 : parseInt(obj['quantity']);
};

const getBasketballInfo = async (data: any[]) => {
    let obj = data.find((item) => item['platform'] === 'Basketball');
    if (obj === undefined || obj === null) return { count: 0, image: '' };

    let count = parseInt(obj['quantity']);
    let uri = obj['uri'];
    if (!uri) return { count: count, image: '' };

    const response: any = await axios({
        method: 'GET',
        url: uri,
    });
    let imageUri = response.status === 200 ? response.data.image : '';
    return { count: count, image: imageUri };
};

const getGCFTokenCount = (data: any[], tokenId?: string) => {
    let obj = data.find((item) => item['platform'] === 'Drop1Nft' && item['tokenId'] === tokenId);
    return obj === undefined || obj === null ? 0 : parseInt(obj['quantity']);
};

const getEcosystemTokenCount = (data: any[], platform: string) => {
    let obj = data.find((item) => item['platform'] === platform);
    return obj === undefined || obj === null ? 0 : parseInt(obj['quantity']);
};

const getEcosystemTokenURI = (data: any[], platform: string) => {
    let obj = data.find((item) => item['platform'] === platform);
    if (obj === undefined || obj === null) return '';
    else return obj['uri'] !== null ? obj['uri'] : '';
};

const LabPageContainer: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();
    const { active, account, library, activate } = useWeb3React();

    const [basketballBalance, setBasketballBalance] = useState<number>(0);
    const [serumBalance, setSerumBalance] = useState<number>(0);

    const [category, setCategory] = useState<Categories>(Categories.ALL);

    const [ownedNFTTokensList, setOwnedNFTTokensList] = useState<any[]>([]);

    const [basketballToken, setBasketballToken] = useState<BasketballTokenInfoType>(basketballTokenData);
    const [serumTokensList, setSerumTokensList] = useState<SerumTokenInfoType[]>(serumTokenInfoData);
    const [gcfTokensList, setGCFTokensList] = useState<GCFTokenInfoType[]>(gcfTokenData);
    const [metaverseShoesTokenList, setMetaverseShoesTokenList] =
        useState<MetaverseShoesTokenInfoType[]>(metaverseShoesTokenData);

    const [selectedProductId, setSelectedProductId] = useState<number>(-1);

    const onMutantItemSelect = (id: number) => {
        setSelectedProductId(id);
    };

    const onBasketballItemSelect = (id: number) => {
        setSelectedProductId(id);
    };

    const onSerumItemSelect = (id: number) => {
        setSelectedProductId(id);
    };

    const onWearableItemSelect = (id: number) => {
        setSelectedProductId(id);
    };

    React.useEffect(() => {
        async function updateAppState() {
            const nftContract = new library.eth.Contract(
                BasketballHeadABI,
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
            let basketballInfo = await getBasketballInfo(ownedNFTTokensList);

            let newBasketballToken = { ...basketballToken, count: basketballInfo.count, image: basketballInfo.image };
            setBasketballToken(newBasketballToken);

            let newList = gcfTokenData.map((item) => {
                let count = getGCFTokenCount(ownedNFTTokensList, item.tokenId.toString());
                return { ...item, count };
            });
            setGCFTokensList(newList);

            let newList1 = metaverseShoesTokenData.map((item) => {
                let count = getEcosystemTokenCount(ownedNFTTokensList, item.platform);
                // let image = getEcosystemTokenURI(ownedNFTTokensList, item.platform);
                return { ...item, count };
            });
            setMetaverseShoesTokenList(newList1);

            let newSerumTokenList = serumTokenInfoData.map((item) => {
                let count = getSerumTokenCount(ownedNFTTokensList, item.tokenId);
                return { ...item, count };
            });
            setSerumTokensList(newSerumTokenList);
        }

        getTokensData();
    }, [ownedNFTTokensList]);

    return (
        <Container sx={{ paddingY: 5, overflow: 'visible' }}>
            <Stack spacing={5}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <CounterBox title="MY NF3 BASKETBALLS" value={basketballBalance} />
                    <CounterBox title="MY SERUMS" value={serumBalance} />
                </Stack>
                <Typography fontSize={48} fontWeight={800} color="white" className="neueplak_condensed">
                    THE LAB
                </Typography>
                <Stack
                    direction="row"
                    flexWrap="wrap"
                    justifyContent={{ xs: 'center', sm: 'flex-start' }}
                    columnGap={2}
                    rowGap={2}
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
                {(category === Categories.ALL || category === Categories.NF3_BASKETBALLS) && (
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
                            <BasketballBox data={basketballToken} />
                        </Stack>
                    </Stack>
                )}
                {(category === Categories.ALL || category === Categories.SERUMS) && (
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
                            {serumTokensList.map((id, index) => (
                                <SerumBox item={id} key={`serum_box_${index}`} />
                            ))}
                        </Stack>
                    </Stack>
                )}
                {(category === Categories.ALL || category === Categories.GCF) && (
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
                            {gcfTokensList.map((item, index) => (
                                <GCFBox data={item} key={`gcf_box_${index}`} />
                            ))}
                        </Stack>
                    </Stack>
                )}
                {(category === Categories.ALL || category === Categories.METAVERSE_SHOES) && (
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
                            {metaverseShoesTokenList.map((item, index) => (
                                <WearableBox data={item} key={`wearable_box_${index}`} />
                            ))}
                        </Stack>
                    </Stack>
                )}
            </Stack>
        </Container>
    );
};

export default LabPageContainer;
