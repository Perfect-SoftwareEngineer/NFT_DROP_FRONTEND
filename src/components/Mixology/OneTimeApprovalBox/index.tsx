import React from 'react';
import { Stack, Typography } from '@mui/material';
import { CancelBtn, ContinueBtn } from './styles';

type ComponentProps = {
    type: number;
    onContinue: () => void;
    onClose: () => void;
};

const OneTimeApprovalBox: React.FC<ComponentProps> = ({ type, onContinue, onClose }): JSX.Element => {
    return (
        <Stack
            width={{ xs: 'auto', md: 680 }}
            padding={{ xs: 3, md: 5 }}
            border="1px solid #FFCA21"
            borderRadius={2}
            boxShadow="0px 0px 16px rgba(255, 202, 33, 0.5)"
            sx={{ background: '#1B1C22' }}
        >
            <Typography
                fontSize={48}
                fontWeight={700}
                color="#FFCA21"
                lineHeight={1}
                textTransform="uppercase"
                className="neueplak_condensed"
            >
                {type === 0 ? 'NF3 ONE-TIME APPROVAL' : 'SERUMS ONE-TIME APPROVAL'}
            </Typography>
            <Typography color="white" marginTop={2}>
                You must approve this smart contract interaction to use the Mixology Room. It is a one-time approval
                that confirms the interaction between the smart contract and the token. There will be a gas fee.
            </Typography>
            <Stack direction="row" justifyContent="flex-end" spacing={2} marginTop={5}>
                <CancelBtn onClick={onClose}>CANCEL</CancelBtn>
                <ContinueBtn onClick={onContinue}>CONTINUE</ContinueBtn>
            </Stack>
        </Stack>
    );
};

export default OneTimeApprovalBox;
