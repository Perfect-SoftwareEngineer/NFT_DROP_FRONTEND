import React from 'react';
import { Stack, Typography } from '@mui/material';

type ComponentProps = {
    jwtToken: string;
    dropPhase: number;
};

const NF3GCFInfoBox: React.FC<ComponentProps> = ({ jwtToken, dropPhase }): JSX.Element => {
    return (
        <Stack
            direction="row"
            padding={2}
            spacing={2}
            borderRadius={2}
            sx={{
                background: !!jwtToken && dropPhase === 1 ? '#FFCA21' : '#1B1C22',
            }}
        >
            <img src="/assets/curryshop/gcf-claim.png" width={80} height={80} alt="" style={{ borderRadius: 8 }} />
            <Stack color={!!jwtToken && dropPhase === 1 ? 'black' : 'white'}>
                <Typography fontSize={20} fontWeight={800} marginTop={-1}>
                    Genesis Curry Flow Freebies: NF3 Basketball
                </Typography>
                <Typography marginTop={2}>
                    Snapshot Date: <span style={{ fontWeight: 700 }}>June 9, 2022 at 4 PM PST</span>
                    <br />
                    Start Date: <span style={{ fontWeight: 700 }}>June 9, 2022 at 5 PM PST</span>
                    <br />
                    End Date: <span style={{ fontWeight: 700 }}>June 11, 2022 at 5 PM PST</span>
                </Typography>
            </Stack>
        </Stack>
    );
};

export default NF3GCFInfoBox;
