import React from 'react';
import { Stack, Typography, Link } from '@mui/material';
import Container from '../Container';

const FTXHoldersPageContainer: React.FC = (): JSX.Element => {
    return (
        <Container sx={{ paddingY: 8 }}>
            <Typography fontSize={48} fontWeight={800} className="neueplak_condensed">
                FTX 2974 HOLDERS
            </Typography>
        </Container>
    );
};

export default FTXHoldersPageContainer;
