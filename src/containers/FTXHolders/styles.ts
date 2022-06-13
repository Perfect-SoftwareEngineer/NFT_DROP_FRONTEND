import { styled, Button, TextField } from '@mui/material';

export const CodeInputField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        height: 40,
        '& input': {
            color: 'white',
            paddingTop: 0,
            paddingBottom: 2,
        },
        '& fieldset, &:hover fieldset': {
            borderWidth: 1,
            borderColor: '#979797',
        },
        '&.Mui-focused fieldset': {
            borderWidth: 1,
            borderColor: '#979797',
        },
    },
});

export const ConnectWalletBtn = styled(Button)`
    width: 156px;
    height: 34px;
    padding: 2px 16px 6px;
    font-size: 14px;
    font-weight: 600;
    color: black;
    background: #ffca21;
    &:disabled {
        background: gray;
    }
    &:hover {
        background: #ffca21;
    }
`;

export const SubmitBtn = styled(ConnectWalletBtn)``;
