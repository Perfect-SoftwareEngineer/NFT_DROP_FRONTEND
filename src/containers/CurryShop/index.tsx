import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Container from '../Container';
import SupplyBox from '../../components/CurryShop/SupplyBox';

const CurryShopPageContainer: React.FC = (): JSX.Element => {
    return (
        <>
            <Box sx={{ background: '#1B1C22' }}>
                <Container>
                    <Stack paddingY={5} spacing={2}>
                        <Typography fontSize={16} fontWeight={600} color="white">
                            Currently available
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <SupplyBox type={0} amount={10000} />
                            <SupplyBox type={1} amount={30000} />
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default CurryShopPageContainer;
