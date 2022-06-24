import { styled, Stack } from '@mui/material';

export const Container = styled(Stack)<{ selected: boolean }>`
    position: relative;
    padding: 16px;
    background: #1b1c22;
    border-radius: 8px;
    border: ${({ selected }) => (selected ? '1px solid #FFCA21' : '1px solid transparent')};
    filter: ${({ selected }) => (selected ? 'drop-shadow(0px 0px 32px rgba(255, 202, 33, 0.5))' : 'none')};
    .serum_img {
        border-radius: 8px;
    }
`;
