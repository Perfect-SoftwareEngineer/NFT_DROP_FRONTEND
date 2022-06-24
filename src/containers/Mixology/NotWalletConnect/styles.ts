import { styled, Box, Button } from '@mui/material';

export const GradientBox = styled(Box)`
    width: 100%;
    height: 100%;
    position: absolute;
    background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
`;

export const ConnectWalletBtn = styled(Button)`
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
