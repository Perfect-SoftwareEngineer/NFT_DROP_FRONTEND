import { styled, Stack, Box, Button } from '@mui/material';

export const GradientBox1 = styled(Box)`
    width: 65%;
    height: 100%;
    position: absolute;
    left: 0;
    background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
`;

export const GradientBox2 = styled(Box)`
    width: 100%;
    height: 70%;
    position: absolute;
    background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
`;

export const GradientBox3 = styled(Box)`
    width: 100%;
    height: 70%;
    position: absolute;
    bottom: 0;
    background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
`;

export const GradientBox4 = styled(Box)`
    width: 110%;
    height: 20%;
    position: absolute;
    top: -90px;
    left: -20px;
    background: black;
    transform: rotate(-5deg);
    ${(props) => props.theme.breakpoints.down('md')} {
        top: -25px;
    }
`;

export const GradientBox5 = styled(Box)`
    width: 80%;
    height: 100%;
    position: absolute;
    right: 0;
    background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
    transform: rotate(-180deg);
`;

export const GradientBox6 = styled(Box)`
    width: 100%;
    height: 15%;
    position: absolute;
    top: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
`;

export const GradientBox7 = styled(Box)`
    width: 100%;
    height: 20%;
    position: absolute;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
`;

export const MintNowBtn = styled(Button)`
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

export const HowItWorksBtn = styled(Button)`
    width: fit-content;
    height: 38px;
    padding: 0 16px;
    border: 1px solid #ffca21;
    font-size: 14px;
    font-weight: 600;
    color: #ffca21;
`;

export const PartnerLogoListBox = styled(Stack)`
    img {
        width: 120px;
        border-radius: 16px;
    }
`;

export const PartnerLogoBox = styled(Box)`
    width: 100%;
    border: 1px solid white;
    border-radius: 16px;
    overflow: hidden;
    img {
        width: 100%;
    }
    ${(props) => props.theme.breakpoints.down('md')} {
        width: 60%;
    }
`;

export const HowItWorksBox = styled(Stack)<{ show: boolean }>`
    position: absolute;
    top: 0;
    bottom: 0;
    width: ${({ show }) => (show ? '100vw' : 0)};
    background: black;
    transition: width 500ms;
    overflow: hidden;
`;

export const MixologyRoomBtn = styled(Button)`
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
