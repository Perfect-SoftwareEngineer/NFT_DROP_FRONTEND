import { styled, Box, Button, TextField } from '@mui/material';

export const AmountInputWrapper = styled(Box)`
    height: 40px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #979797;
    padding-right: 12px;
`;

export const AmountInputTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        height: 40,
        '& input': {
            color: 'white',
            paddingTop: 0,
            paddingBottom: 2,
        },
        '& fieldset': {
            borderWidth: 0,
        },
        '&.Mui-focused fieldset': {
            borderWidth: 0,
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
    &:hover {
        background: #ffca21;
    }
`;

export const MaxBtn = styled(Button)`
    min-width: 0;
    width: 32px;
    height: 18px;
    font-size: 12px;
    font-weight: 500;
    color: black;
    background: white;
    &:hover {
        background: #f0f0f0;
    }
`;

export const MintBtn = styled(Button)`
    width: 60px;
    height: 36px;
    padding: 6px 0 10px;
    background: #ffca21;
    font-size: 14px;
    font-weight: 600;
    color: black;
    &:hover {
        background: #ffda31;
    }
    &:disabled {
        background: #969aa1;
        color: black;
    }
`;

export const ReserveBtn = styled(Button)`
    width: 84px;
    height: 36px;
    padding: 6px 0 10px;
    font-size: 14px;
    font-weight: 600;
    color: #ffca21;
    border: 1px solid #ffca21;
    border-radius: 4px;
    &:disabled {
        color: #969aa1;
        border-color: #969aa1;
    }
`;
