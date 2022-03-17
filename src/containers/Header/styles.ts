import { styled, Stack, Button } from '@mui/material';

export const HeaderMenuBtn = styled(Stack)<{ selected?: boolean }>`
    height: 72px;
    justify-content: center;
    align-items: center;
    padding: 0 2px;
    color: ${({ selected }) => (selected ? 'white' : '#969aa1')};
    cursor: pointer;
    border-bottom: ${({ selected }) => (selected ? '2px solid #ffca21' : '2px solid transparent')};
    p {
        font-size: 14px;
        font-weight: 600;
    }
`;

export const ConnectWalletBtn = styled(Button)`
    width: 156px;
    height: 34px;
    padding: 8px 0 12px;
    background: #ffca21;
    font-size: 14px;
    font-weight: 600;
    color: #202230;
    &:hover {
        background: #ffda31;
    }
`;
