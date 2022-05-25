import { styled, Button } from '@mui/material';

export const MintBtn = styled(Button)`
    width: 70px;
    height: 36px;
    padding: 6px 0 10px;
    background: #ffca21;
    font-size: 14px;
    font-weight: 600;
    color: black;
    &:hover {
        background: #ffca21;
    }
    &:disabled {
        color: black;
        background: #969aa1;
    }
`;

export const MoreDetailsBtn = styled(Button)`
    width: 110px;
    height: 36px;
    padding: 6px 0 10px;
    font-size: 14px;
    font-weight: 600;
    color: #ffca21;
    border: 1px solid #ffca21;
    border-radius: 4px;
`;
