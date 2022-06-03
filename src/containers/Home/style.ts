import { styled, Box, Button } from '@mui/material';

export const GradientBox1 = styled(Box)`
    width: 65%;
    height: 100%;
    position: absolute;
    left: 0;
    background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
`;

export const GradientBox2 = styled(Box)`
    width: 100%;
    height: 35%;
    position: absolute;
    background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
`;

export const GradientBox3 = styled(Box)`
    width: 100%;
    height: 30%;
    position: absolute;
    bottom: 0;
    background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
`;

export const RoadmapBtn = styled(Button)`
    width: fit-content;
    height: 38px;
    padding: 0 16px;
    background: #ffca21;
    font-size: 14px;
    font-weight: 600;
    color: black;
    &:hover {
        background: #ffca21;
    }
`;
