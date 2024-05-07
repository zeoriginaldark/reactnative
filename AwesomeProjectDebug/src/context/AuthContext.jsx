import React, {createContext, useState} from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);

    const login = () =>{
        setUserToken('alksdjla');
        setIsLoading(false);
    }

    const logout = () =>{
        setUserToken(null);
        setIsLoading(false);
    }

    return(
        <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;