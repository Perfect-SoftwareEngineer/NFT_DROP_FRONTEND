import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Container } from './styles';
import { SerumTokenInfoType } from '../../../../types';
import { useAppContext } from '../../../../context/AppContext';
import { serumTokenInfoData } from '../../../../constants/serumTokenData';

type ComponentProps = {
    tokenId: string;
};

const SerumBox: React.FC<ComponentProps> = ({ tokenId }): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    let tokenInfo = serumTokenInfoData.find((item) => item.tokenId === tokenId);

    return (
        <Container spacing={2} selected>
            <img src={tokenInfo?.image} width={166} height={210} alt="" className="serum_img" />
            <Stack spacing={1}>
                <Typography fontSize={16} fontWeight={700}>
                    {tokenInfo?.title}
                </Typography>
                {/* <Typography fontSize={16} fontWeight={400} color="#979797">
                    {item.count}
                </Typography> */}
            </Stack>
        </Container>
    );
};

export default SerumBox;
