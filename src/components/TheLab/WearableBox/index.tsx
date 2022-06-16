import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Container } from './styles';
import { MetaverseShoesTokenInfoType } from '../../../types';
import ModelViewer from '../../ModelViewer';

type ComponentProps = {
    data: MetaverseShoesTokenInfoType;
};

const WearableBox: React.FC<ComponentProps> = ({ data }): JSX.Element => {
    return (
        <Container spacing={2}>
            <Stack width={166} height={166} justifyContent="center" alignItems="center">
                {data.image.endsWith('.gltf') ? (
                    <ModelViewer src={data.image} />
                ) : (
                    <img src={data.image} width={166} height={166} alt="" className="wearable_img" />
                )}
            </Stack>
            <Stack width={166} spacing={1}>
                <Typography fontSize={16} fontWeight={700} lineHeight={1.1}>
                    {data.title}
                </Typography>
                <Typography fontSize={16} fontWeight={400} color="#979797">
                    {data.count}
                </Typography>
            </Stack>
        </Container>
    );
};

export default WearableBox;
