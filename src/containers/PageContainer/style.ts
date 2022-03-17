import css from 'styled-jsx/css';
import { styled, Box } from '@mui/material';

export const PageWrapper = styled('div')`
    min-height: 100vh;
    position: relative;
`;

const style = css`
    .site__header {
        /* background: gray; */
        position: relative;
        z-index: 10;
    }
    .site__main {
        background: black;
        position: relative;
        z-index: 20;
    }
    .site__footer {
        /* background: gray; */
        position: relative;
        z-index: 10;
    }
`;

export default style;
