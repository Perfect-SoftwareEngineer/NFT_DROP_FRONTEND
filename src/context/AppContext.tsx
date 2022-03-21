import React, { createContext, useState, useContext } from 'react';
import { BasketballItemType } from '../types';

interface AppState {
    mixologyCurStep: number;
    basketballsList: Array<BasketballItemType>;
    selectedBasketballId: number;
}

const defaultState: AppState = {
    mixologyCurStep: 0,
    basketballsList: [
        { id: 0, title: 'UA Basketball #10923', traits: [] },
        { id: 1, title: 'UA Basketball #10924', traits: [] },
        { id: 2, title: 'UA Basketball #10925', traits: [] },
    ],
    selectedBasketballId: -1,
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
