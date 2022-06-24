import React, { createContext, useState, useContext } from 'react';
import { BasketballItemType, SerumTokenInfoType, MutantItemType, WearableItemType } from '../types';

interface AppState {
    mixologyCurStep: number;
    basketballsList: Array<BasketballItemType>;
    selectedBasketball: boolean;
    serumsList: Array<SerumTokenInfoType>;
    selectedSerumId: Array<string>;
    selectedSerumCount: { [key: string]: number };
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

    selectedBasketball: false,

    serumsList: [
        {
            title: 'Unanimous',
            tokenId: '1',
            count: 0,
            image: 'https://luna-bucket.s3.us-east-2.amazonaws.com/Unanimous.png',
        },
        {
            title: 'Broken History',
            tokenId: '2',
            count: 0,
            image: 'https://luna-bucket.s3.us-east-2.amazonaws.com/Broken_History.png',
        },
        {
            title: 'Flow',
            tokenId: '3',
            count: 0,
            image: 'https://luna-bucket.s3.us-east-2.amazonaws.com/Flow.png',
        },
    ],

    selectedSerumId: [],
    selectedSerumCount: {},

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
