import { styled, Stack, Button } from '@mui/material';

export const MutantImgBox = styled(Stack)`
    padding: 32px;
    background: #1b1c22;
    border-radius: 8px;
    .mutant_img {
        border-radius: 8px;
    }
`;

export const GotoLabBtn = styled(Button)`
    width: 116px;
    height: 36px;
    padding: 6px 0 10px;
    background: #ffca21;
    font-size: 14px;
    font-weight: 600;
    color: black;
    &:hover {
        background: #ffda31;
    }
`;

export const BackToMixRoom = styled(Button)`
    width: 202px;
    height: 36px;
    padding: 6px 0 10px;
    font-size: 14px;
    font-weight: 600;
    color: #ffca21;
    border: 1px solid #ffca21;
`;
