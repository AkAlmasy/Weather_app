import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthDataProvider = props => {
    const [auth, setAuth] = useState({
        authenticated: false,
        uName: "",
    });

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    );
}