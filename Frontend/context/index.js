'use client'
import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
    const [isAuthUser, setisAuthUser] = useState(null);
    const [user, setUser] = useState(null);

    return (
        <GlobalContext.Provider value={{ isAuthUser, setisAuthUser, user, setUser }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalState;
