import { styled, Stack, Button } from '@mui/material';

export const Container = styled(Stack)<{ selected?: boolean; selectable?: boolean }>`
    position: relative;
    padding: 16px;
    background: #1b1c22;
    border-radius: 8px;
    border: ${({ selected }) => (selected ? '1px solid #FFCA21' : '1px solid transparent')};
    filter: ${({ selected }) => (selected ? 'drop-shadow(0px 0px 32px rgba(255, 202, 33, 0.5))' : 'none')};
    cursor: ${({ selectable }) => (selectable ? 'pointer' : 'auto')};
    .img {
        border-radius: 8px;
    }
`;

export const MenuBtn = styled(Button)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    color: white;
`;
