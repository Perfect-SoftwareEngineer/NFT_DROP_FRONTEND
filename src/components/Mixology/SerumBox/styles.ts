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

export const AddTokenBox = styled(Stack)<{ count: number }>`
    position: absolute;
    top: 8px;
    right: 20px;
    width: 28px;
    height: 28px;
    overflow: hidden;
    padding: 0 3px 0 0;
    align-items: center;
    border-radius: 24px;
    background: gray;
    transition: width 200ms linear;
    .add_icon {
        display: ${({ count }) => (count > 0 ? 'none' : 'inline-block')};
    }
    .count_label {
        display: ${({ count }) => (count > 0 ? 'block' : 'none')};
        margin: 0 6px 6px 0;
    }
    &:hover {
        width: 96px;
        .add_icon {
            display: inline-block;
        }
        .count_label {
            display: none;
        }
    }
`;
