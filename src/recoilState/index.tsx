import { atom } from 'recoil';

export const publicMintedAtom = atom<boolean>({
    key: 'publicMintedAtom', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

export const CryptexMintedAtom = atom<number>({
    key: 'CryptexMintedAtom',
    default: 0,
});
