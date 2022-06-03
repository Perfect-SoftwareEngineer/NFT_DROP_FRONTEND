import { styled, Stack, Box, Button, Typography } from '@mui/material';

export const GradientBox = styled(Box)`
    width: 65%;
    height: 100%;
    position: absolute;
    left: 0;
    background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
`;

export const NF3CounterBtn = styled(Button)`
    width: fit-content;
    height: 38px;
    padding: 0 16px;
    background: #ffca21;
    font-size: 14px;
    font-weight: 600;
    color: black;
    &:hover {
        background: #ffca21;
    }
`;
