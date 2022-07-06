import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Container } from './styles';
import { SerumTokenInfoType } from '../../../types';

type ComponentProps = {
    item: SerumTokenInfoType;
};

const SerumBox: React.FC<ComponentProps> = ({ item }): JSX.Element => {
    return (
        <Container
            selectable
            spacing={2}
            onClick={() =>
                window.open(
                    `https://opensea.io/assets/ethereum/0x39b80981a3e7c6bbcbedd42838ec1e397b6e538d/${item.tokenId}`,
                    '_blank',
                    'noopener,noreferrer'
                )
            }
        >
            <img src={item.image} width={166} height={210} alt="" className="serum_img" />
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

export default SerumBox;
