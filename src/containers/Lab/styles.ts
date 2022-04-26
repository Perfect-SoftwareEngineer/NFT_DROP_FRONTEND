import { styled, Button } from '@mui/material';

export const CategoryBtn = styled(Button)<{ selected: boolean }>`
    height: 40px;
    padding: 4px 15px 8px;
    border-radius: 3px;
    background: ${({ selected }) => (selected ? '#ffca21' : 'none')};
    font-size: 14px;
    font-weight: 400;
    color: ${({ selected }) => (selected ? 'black' : 'white')};
    box-shadow: ${({ selected }) => (selected ? '0px 0px 25px #2c75b3' : 'none')};
    &:hover {
        background: #ffda31;
        color: black;
    }
`;
