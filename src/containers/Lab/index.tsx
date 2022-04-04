import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import Container from '../Container';
import CounterBox from '../../components/CounterBox';
import { CategoryBtn } from './styles';
import { useAppContext } from '../../context/AppContext';
import MutantBox from '../../components/MutantBox';
import BasketballBox from '../../components/BasketballBox';
import SerumBox from '../../components/SerumBox';
import ProductDetails from './ProductDetails';

export enum Categories {
    ALL,
    MUTANTS,
    BASKETBALLS,
    SERUMS,
    WEARABLES,
}

const categoryButtonsList = ['ALL', 'MUTANTS', 'BASKETBALLS', 'SERUMS', 'WEARABLES'];

const LabPageContainer: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();
    const [category, setCategory] = useState<Categories>(Categories.ALL);

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

    return (
        <>
            {selectedProductId === -1 ? (
                <Container sx={{ paddingY: 5, overflow: 'visible' }}>
                    <Stack spacing={5}>
                        <Stack direction="row" spacing={2}>
                            <CounterBox title="MY BASKETBALLS" value={3} />
                            <CounterBox title="MY SERUMS" value={9} />
                            <CounterBox title="MUTANT BASKETBALLS" value={1} />
                        </Stack>
                        <Typography fontSize={48} fontWeight={700} color="white">
                            The Lab
                        </Typography>
                        <Stack direction="row" spacing={2}>
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
                        {(category === Categories.ALL || category === Categories.MUTANTS) && (
                            <Stack spacing={3}>
                                <Typography fontSize={32} fontWeight={700} color="white">
                                    Mutants
                                </Typography>
                                <Stack direction="row" spacing={4}>
                                    {appState.mutantsList.map((item) => (
                                        <MutantBox
                                            item={item}
                                            selected={selectedProductId === item.id}
                                            selectable
                                            onSelect={onMutantItemSelect}
                                        />
                                    ))}
                                </Stack>
                            </Stack>
                        )}
                        {(category === Categories.ALL || category === Categories.BASKETBALLS) && (
                            <Stack spacing={3}>
                                <Typography fontSize={32} fontWeight={700} color="white">
                                    Basketballs
                                </Typography>
                                <Stack direction="row" spacing={4}>
                                    {appState.basketballsList.map((item) => (
                                        <BasketballBox
                                            item={item}
                                            selected={selectedProductId === item.id}
                                            selectable
                                            onSelect={onBasketballItemSelect}
                                        />
                                    ))}
                                </Stack>
                            </Stack>
                        )}
                        {(category === Categories.ALL || category === Categories.SERUMS) && (
                            <Stack spacing={3}>
                                <Typography fontSize={32} fontWeight={700} color="white">
                                    Serums
                                </Typography>
                                <Stack direction="row" flexWrap="wrap" columnGap={4} rowGap={4}>
                                    {appState.serumsList.map((item) => (
                                        <SerumBox
                                            item={item}
                                            selected={selectedProductId === item.id}
                                            selectable
                                            onSelect={onSerumItemSelect}
                                        />
                                    ))}
                                </Stack>
                            </Stack>
                        )}
                    </Stack>
                </Container>
            ) : (
                <ProductDetails id={selectedProductId} />
            )}
        </>
    );
};

export default LabPageContainer;
