import { styled, Stack, Button } from '@mui/material';

export const ConnectMetamaskBtn = styled(Button)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 536px;
    height: 88px;
    padding: 16px;
    background: white;
    color: black;
    &:hover {
        background: #dddddd;
    }
    ${(props) => props.theme.breakpoints.down('md')} {
        width: 60%;
    }
    ${(props) => props.theme.breakpoints.down('sm')} {
        width: 80%;
    height: 72px;
    }
`;
