import React, {createContext, useState, useEffect} from 'react';
import AuthService from '../api/services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    
    const login = async (username, password, deviceType, deviceID) => {
        setIsLoading(true);
        try {
          const token = await AuthService.login(username, password, deviceType, deviceID);
          setUserToken(token);
          AsyncStorage.setItem('userToken', userToken);
        } catch (error) {
            throw error;
        }
        setIsLoading(false);
    };
      
    const logout = () =>{
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = () =>{
        try {
            setIsLoading(true);
            let userToken = AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            setIsLoading(false);
        } catch (error) {
            console.log(`isLogged in error: ${error}`)
        }
    }

    useEffect(()=>{
        isLoggedIn();
    }, []);

    const register = async (firstName, lastName, email, password) => {
        setIsLoading(true);
        try {
            const message = await AuthService.register(firstName, lastName, email, password);
            alert(message);
        } catch (error) {
            throw error;
        }
        setIsLoading(false);
    };

    return(
    <AuthContext.Provider value={{login, logout, register, isLoading, userToken}}>
        {children}
    </AuthContext.Provider>
);
}

export default AuthProvider;