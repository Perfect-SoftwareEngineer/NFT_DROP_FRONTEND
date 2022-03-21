import { styled, Stack, Button } from '@mui/material';

export const BackBtn = styled(Button)`
    width: 104px;
    height: 56px;
    border-radius: 32px;
    border: 1px solid #ffca21;
    font-size: 14px;
    font-weight: 700;
    color: #ffca21;
    padding: 4px 0 8px;
`;

export const NextBtn = styled(Button)`
    width: 104px;
    height: 56px;
    border-radius: 32px;
    background: #ffca21;
    font-size: 14px;
    font-weight: 700;
    color: black;
    padding: 4px 0 8px;
    &:hover {
        background: #dfaa01;
    }
    &:disabled {
        background: #979797;
        color: black;
    }
`;
