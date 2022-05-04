import { styled, Stack, Box, Button, Typography } from '@mui/material';

export const GradientBox = styled(Box)`
    width: 100%;
    height: 20%;
    position: absolute;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(27, 28, 34, 0) 0.01%, #000000 100%);
`;

export const MetamaskNotiBox = styled(Stack)`
    position: absolute;
    top: 136px;
    right: 0;
    background: rgba(27, 28, 34, 0.75);
    padding: 24px;
    border-radius: 8px;
`;

export const DiscordNotiBox = styled(Stack)`
    position: absolute;
    top: 280px;
    right: 0;
    background: rgba(27, 28, 34, 0.75);
    padding: 24px;
    border-radius: 8px;
`;

export const PrimaryBtn = styled(Button)`
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
    &:disabled {
        background: #969aa1;
        color: #202230;
    }
`;

export const TblHeaderCellTypo = styled(Typography)`
    font-size: 16px;
    font-weight: 600;
    color: #979797;
`;
