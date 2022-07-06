import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Container } from './styles';
import { MetaverseShoesTokenInfoType } from '../../../types';
import ModelViewer from '../../ModelViewer';

type ComponentProps = {
    item: MetaverseShoesTokenInfoType;
};

const WearableBox: React.FC<ComponentProps> = ({ item }): JSX.Element => {
    return (
        <Container selectable spacing={2} onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}>
            <Stack width={166} height={166} justifyContent="center" alignItems="center">
                {item.image.endsWith('.gltf') ? (
                    <ModelViewer src={item.image} />
                ) : (
                    <img src={item.image} width={166} height={166} alt="" className="wearable_img" />
                )}
            </Stack>
            <Stack width={166} spacing={1}>
                <Typography fontSize={16} fontWeight={700} lineHeight={1.1}>
                    {item.title}
                </Typography>
                <Typography fontSize={16} fontWeight={400} color="#979797">
                    {item.count}
                </Typography>
            </Stack>
        </Container>
    );
};

export default WearableBox;
