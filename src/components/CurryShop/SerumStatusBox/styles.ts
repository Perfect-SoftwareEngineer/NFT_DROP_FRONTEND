import { styled, Typography } from '@mui/material';

export const MintStatusTypo = styled(Typography)<{ selected: boolean }>`
    padding: 8px 16px 12px;
    font-size: 20px;
    font-weight: 700;
    color: ${({ selected }) => (selected ? 'black' : 'white')};
    background: ${({ selected }) => (selected ? '#ffca21' : 'none')};
`;
