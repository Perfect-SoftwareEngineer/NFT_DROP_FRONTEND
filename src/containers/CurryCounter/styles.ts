import { styled, Box, Button, Typography } from '@mui/material';

export const GradientBox = styled(Box)`
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(27, 28, 34, 0) 0.01%, #000000 100%);
`;

export const ConnectWalletBtn = styled(Button)`
    width: 284px;
    height: 64px;
    padding: 4px 0 12px;
    font-size: 32px;
    font-weight: 600;
    background: #ffca21;
    color: #202230;
    &:hover {
        background: #ffca21;
    }
`;

export const ReserveBtn = styled(Button)`
    width: 284px;
    height: 64px;
    padding: 4px 0 12px;
    font-size: 32px;
    font-weight: 600;
    background: #ffca21;
    color: #202230;
    &:hover {
        background: #ffca21;
    }
`;

export const TblHeaderCellTypo = styled(Typography)`
    font-size: 16px;
    font-weight: 600;
    color: #979797;
`;
