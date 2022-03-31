import React, { createContext, useState, useContext } from 'react';
import { BasketballItemType, SerumItemType, MutantItemType } from '../types';

interface AppState {
    mixologyCurStep: number;
    basketballsList: Array<BasketballItemType>;
    selectedBasketballId: number;
    serumsList: Array<SerumItemType>;
    selectedSerumId: Array<number>;
    mutantsList: Array<MutantItemType>;
}

const defaultState: AppState = {
    mixologyCurStep: 0,
    basketballsList: [
        { id: 0, title: 'UA Basketball #10923', traits: [] },
        { id: 1, title: 'UA Basketball #10924', traits: [] },
        { id: 2, title: 'UA Basketball #10925', traits: [] },
    ],
    selectedBasketballId: -1,
    serumsList: [
        { id: 0, title: 'Serum #10923', desc: 'Sesame Street' },
        { id: 1, title: 'Serum #10924', desc: 'Sesame Street' },
        { id: 2, title: 'Serum #10925', desc: 'Sesame Street' },
        { id: 3, title: 'Serum #10926', desc: 'Sesame Street' },
        // { id: 4, title: 'Serum #10927', desc: 'Sesame Street' },
        // { id: 5, title: 'Serum #10928', desc: 'Sesame Street' },
        // { id: 6, title: 'Serum #10929', desc: 'Sesame Street' },
        // { id: 7, title: 'Serum #10930', desc: 'Sesame Street' },
        // { id: 8, title: 'Serum #10931', desc: 'Sesame Street' },
    ],
    selectedSerumId: [],
    mutantsList: [
        { id: 0, title: 'Mutant #10923', desc: '3 Sesame Street Traits' },
        { id: 1, title: 'Mutant #10924', desc: '3 Sesame Street Traits' },
    ],
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
