import React, { createContext, useState, useContext } from 'react';
import { BasketballItemType, SerumItemType, MutantItemType, WearableItemType } from '../types';

interface AppState {
    mixologyCurStep: number;
    basketballsList: Array<BasketballItemType>;
    selectedBasketballId: number;
    serumsList: Array<SerumItemType>;
    selectedSerumId: Array<number>;
    mutantsList: Array<MutantItemType>;
    wearablesList: Array<WearableItemType>;
    jwtToken: string;
}

const defaultState: AppState = {
    mixologyCurStep: 0,
    basketballsList: [
        { id: 100, title: 'UA Basketball #10923', traits: [] },
        { id: 101, title: 'UA Basketball #10924', traits: [] },
        { id: 102, title: 'UA Basketball #10925', traits: [] },
    ],
    selectedBasketballId: -1,
    serumsList: [
        { id: 200, title: 'Serum #10923', desc: 'Sesame Street' },
        { id: 201, title: 'Serum #10924', desc: 'Sesame Street' },
        { id: 202, title: 'Serum #10925', desc: 'Sesame Street' },
        { id: 203, title: 'Serum #10926', desc: 'Sesame Street' },
        { id: 204, title: 'Serum #10927', desc: 'Sesame Street' },
        { id: 205, title: 'Serum #10928', desc: 'Sesame Street' },
        { id: 206, title: 'Serum #10929', desc: 'Sesame Street' },
        { id: 207, title: 'Serum #10930', desc: 'Sesame Street' },
        { id: 208, title: 'Serum #10931', desc: 'Sesame Street' },
    ],
    selectedSerumId: [],
    mutantsList: [
        { id: 300, title: 'Mutant #10923', desc: '3 Sesame Street Traits' },
        { id: 301, title: 'Mutant #10924', desc: '3 Sesame Street Traits' },
    ],
    wearablesList: [
        {
            id: 400,
            type: 0,
            url: '/assets/nft-items/sandbox.png',
            title: 'Genesis Curry Flow',
            desc: 'Sandbox',
        },
        {
            id: 401,
            type: 1,
            url: '/assets/nft-items/galagames.png',
            title: 'Genesis Curry Flow',
            desc: 'Galagames',
        },
        {
            id: 402,
            type: 2,
            url: '/assets/nft-items/decentraland.png',
            title: 'Genesis Curry Flow',
            desc: 'Decentraland',
        },
        {
            id: 403,
            type: 3,
            url: '/assets/nft-items/rkl.png',
            title: 'Genesis Curry Flow',
            desc: 'RKL',
        },
    ],
    jwtToken: '',
};

type ContextType<TValue> = [TValue, (newValue: TValue) => void];

const defaultContextValue: ContextType<AppState> = [defaultState, () => {}];

export const AppContext = createContext(defaultContextValue);

export const AppContextProvider: React.FC = ({ children, ...props }) => {
    const [contextState, setContextState] = useState<AppState>(defaultState);

    const ctxValue: ContextType<AppState> = [
        contextState,
        (value: AppState) => {
            setContextState(value);
        },
    ];

    return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
