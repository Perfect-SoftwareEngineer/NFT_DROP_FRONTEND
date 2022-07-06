import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Container } from './styles';
import { GCFTokenInfoType } from '../../../types';

type ComponentProps = {
    item: GCFTokenInfoType;
};

const GCFBox: React.FC<ComponentProps> = ({ item }): JSX.Element => {
    return (
        <Container
            selectable
            spacing={2}
            onClick={() =>
                window.open(
                    `https://opensea.io/assets/matic/0xa4f709db1f2b5f78d5f44ea5f30e430193b532c3/${item.tokenId}`,
                    '_blank',
                    'noopener,noreferrer'
                )
            }
        >
            <img src={item.image} width={166} height={166} alt="" className="basketball_img" />
            <Stack spacing={1}>
                <Typography fontSize={16} fontWeight={700}>
                    {item.title}
                </Typography>
                <Typography fontSize={16} fontWeight={400} color="#979797">
                    {item.count}
                </Typography>
            </Stack>
        </Container>
    );
};

export default GCFBox;
