import { styled, Stack } from '@mui/material';

export const HeaderMenuBtn = styled(Stack)<{ selected?: boolean }>`
    height: 72px;
    justify-content: center;
    align-items: center;
    padding: 0 2px;
    color: #969aa1;
    cursor: pointer;
    border-bottom: ${({ selected }) => (selected ? '2px solid #ffca21' : '2px solid transparent')};
    p {
        font-size: 14px;
        font-weight: 600;
    }
`;
