import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Container from '../Container';
import CounterBox from '../../components/CounterBox';
import { CategoryBtn } from './styles';

export enum Categories {
    ALL,
    MUTANTS,
    BASKETBALLS,
    SERUMS,
    WEARABLES,
}

const categoryButtonsList = ['ALL', 'MUTANTS', 'BASKETBALLS', 'SERUMS', 'WEARABLES'];

const LabPageContainer: React.FC = (): JSX.Element => {
    const [category, setCategory] = useState<Categories>(Categories.ALL);

    return (
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
            </Stack>
        </Container>
    );
};

export default LabPageContainer;
