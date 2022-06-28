import { styled, Button, Typography } from '@mui/material';

export const ConnectWalletBtn = styled(Button)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    /* width: 536px; */
    height: 88px;
    padding: 16px;
    background: white;
    color: black;
    &:hover {
        background: #dddddd;
    }
    ${(props) => props.theme.breakpoints.down('md')} {
        /* width: 60%; */
    }
    ${(props) => props.theme.breakpoints.down('sm')} {
        /* width: 80%; */
        height: 72px;
    }
`;

export const CategoryBtn = styled(Typography)<{ selected?: boolean }>`
    padding: 4px 22px 8px;
    border-radius: 4px;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    background: ${({ selected }) => (selected ? '#FFCA21' : 'none')};
    color: ${({ selected }) => (selected ? 'black' : 'white')};
    /* cursor: pointer; */
`;

export const PhaseTypo = styled(Typography)<{ selected?: boolean }>`
    padding: 2px 16px 8px;
    border-left: ${({ selected }) => (selected ? '2px solid #FFCA21' : '2px solid transparent')};
    color: ${({ selected }) => (selected ? 'white' : '#969AA1')};
    cursor: pointer;
`;

export const WatchVideoBtn = styled(Button)`
    width: fit-content;
    height: 36px;
    padding: 6px 12px 10px;
    background: #ffca21;
    font-size: 14px;
    font-weight: 600;
    color: black;
    &:hover {
        background: #ffca21;
    }
`;
