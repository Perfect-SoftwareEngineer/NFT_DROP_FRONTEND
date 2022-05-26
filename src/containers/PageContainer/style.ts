import css from 'styled-jsx/css';
import { styled, Stack } from '@mui/material';

export const PageWrapper = styled(Stack)`
    min-height: 100vh;
    position: relative;
`;

const style = css`
    .site__header {
        /* background: gray; */
        position: relative;
        z-index: 20;
    }
    .site__main {
        background: black;
        position: relative;
        z-index: 10;
        min-height: calc(100vh - 222px);
    }
    .site__footer {
        /* background: gray; */
        position: relative;
        z-index: 5;
    }
`;

export default style;
