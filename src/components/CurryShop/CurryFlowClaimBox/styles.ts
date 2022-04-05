import { styled, Button } from '@mui/material';

export const ClaimBtn = styled(Button)`
    width: 70px;
    height: 36px;
    padding: 6px 0 10px;
    background: #ff2121;
    font-size: 14px;
    font-weight: 600;
    color: white;
    &:hover {
        background: #ff4141;
    }
    &:disabled {
        background: #979797;
        color: black;
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
