import { styled, Stack, Button, Typography } from '@mui/material';

export const HeaderMenuBtn = styled(Stack)<{ selected?: boolean }>`
    position: relative;
    height: 72px;
    justify-content: center;
    align-items: center;
    padding: 0 2px;
    color: ${({ selected }) => (selected ? 'white' : '#969aa1')};
    cursor: pointer;
    border-bottom: ${({ selected }) => (selected ? '2px solid #ffca21' : '2px solid transparent')};
    .comingsoon_mark {
        display: none;
    }
    &:hover {
        .comingsoon_mark {
            display: block;
        }
    }
`;

export const ComingSoonTypo = styled(Typography)<{ rightPos: number }>`
    position: absolute;
    top: 8px;
    right: ${({ rightPos }) => `${rightPos}px`};
    font-size: 10px;
    font-weight: 400;
    background: white;
    color: black;
    border-radius: 4px;
    padding: 2px 4px;
    white-space: nowrap;
`;

export const ConnectWalletBtn = styled(Button)`
    width: 156px;
    height: 34px;
    padding: 8px 0 12px;
    background: #ffca21;
    font-size: 14px;
    font-weight: 600;
    color: #202230;
    &:hover {
        background: #ffda31;
    }
`;

export const StyledBurger = styled('div')<{ open: boolean }>`
    width: 2rem;
    height: 2rem;
    z-index: 20;
    display: none;
    position: relative;

    ${(props) => props.theme.breakpoints.down('md')} {
        display: flex;
        justify-content: space-around;
        flex-flow: column nowrap;
    }

    div.menu_line {
        width: 2rem;
        height: 0.25rem;
        background-color: ${({ open }) => (open ? 'white' : 'white')};
        border-radius: 10px;
        transform-origin: 1px;
        transition: all 0.2s linear;

        &:nth-child(1) {
            transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
        }

        &:nth-child(2) {
            transform: ${({ open }) => (open ? 'translateX(100%)' : 'translateX(0)')};
            opacity: ${({ open }) => (open ? 0 : 1)};
        }

        &:nth-child(3) {
            transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
        }
    }
`;

export const BurgerMenuBox = styled(Stack)<{ open: boolean }>`
    width: 240px;
    padding: 16px;
    position: absolute;
    top: 120%;
    right: 0;
    border-radius: 8px;
    background: #161819;
    display: ${({ open }) => (open ? 'flex' : 'none')};
`;
