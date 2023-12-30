import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('authToken') ? true : false
    );
    const [isRegistered, setIsRegistered] = useState(
        localStorage.getItem('authToken') ? true : false
    );

    // ... handle login and registration logic to update isAuthenticated and isRegistered

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isRegistered, setIsRegistered }}>
            {children}
        </AuthContext.Provider>
    );
};
