import { styled, Stack, Button } from '@mui/material';

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

export const AddBtnBox = styled(Stack)`
    position: absolute;
    top: 8px;
    right: 20px;
    width: 28px;
    height: 28px;
    justify-content: center;
    align-items: center;
    border-radius: 24px;
    background: gray;
    cursor: pointer;
`;

export const AddTokenBox = styled(Stack)`
    position: absolute;
    top: 8px;
    right: 20px;
    height: 28px;
    padding: 0 8px;
    align-items: center;
    border-radius: 24px;
    background: gray;
`;
