import { styled, Box, Button } from '@mui/material';

export const ReserveBtn = styled(Button)`
    width: 92px;
    height: 34px;
    padding: 4px 0 8px;
    background: #ffca21;
    font-size: 14px;
    font-weight: 600;
    color: #202230;
    &:hover {
        background: #ffda31;
    }
    &:disabled {
        background: #969aa1;
        color: #202230;
    }
`;
