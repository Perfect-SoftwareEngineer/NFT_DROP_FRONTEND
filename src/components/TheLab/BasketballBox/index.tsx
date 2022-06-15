import React from 'react';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { Container } from './styles';

type ComponentProps = {
    count: number;
};

const BasketballBox: React.FC<ComponentProps> = ({ count }): JSX.Element => {
    return (
        <Container spacing={2}>
            <Image src="/assets/nft-items/basketball.png" width={166} height={166} alt="" className="basketball_img" />
            <Stack spacing={1}>
                <Typography fontSize={16} fontWeight={700}>
                    NF3 Basketball
                </Typography>
                <Typography fontSize={16} fontWeight={400} color="#979797">
                    {count}
                </Typography>
            </Stack>
        </Container>
    );
};

export default BasketballBox;
