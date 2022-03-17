import React, { createContext, useState, useContext } from 'react';

interface State {}

const defaultState: State = {};

type ContextType<TValue> = [TValue, (newValue: TValue) => void];

const defaultContextValue: ContextType<State> = [defaultState, () => {}];

export const AppContext = createContext(defaultContextValue);

export const AppContextProvider: React.FC = ({ children, ...props }) => {
    const [contextState, setContextState] = useState<State>(defaultState);

    const ctxValue: ContextType<State> = [
        contextState,
        (value: State) => {
            setContextState(value);
        },
    ];

    return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
