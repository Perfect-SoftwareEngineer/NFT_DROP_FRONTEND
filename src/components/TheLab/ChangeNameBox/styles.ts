import { styled, Button, TextField } from '@mui/material';

export const CancelBtn = styled(Button)`
    width: 156px;
    height: 34px;
    border: 1px solid #ffca21;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    color: #ffca21;
    padding-top: 1px;
`;

export const SaveBtn = styled(Button)`
    width: 156px;
    height: 34px;
    background: #ffca21;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    color: black;
    padding-top: 1px;
    &:hover {
        background: #ffca21;
    }
    &:disabled {
        background: #969aa1;
        color: black;
    }
`;

export const NameTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        height: 40,
        border: '1px solid #979797',
        '& input': {
            color: 'white',
            paddingTop: 0,
            paddingBottom: 2
        },
        '& fieldset': {
            borderWidth: 0
        },
        '&.Mui-focused fieldset': {
            borderWidth: 0
        }
    }
});
