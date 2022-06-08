import React from 'react';
import { Stack, Grid, Typography } from '@mui/material';

type ComponentProps = {};

const HowItWorks: React.FC<ComponentProps> = (): JSX.Element => {
    return (
        <Grid container>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
        </Grid>
    );
};

export default HowItWorks;
