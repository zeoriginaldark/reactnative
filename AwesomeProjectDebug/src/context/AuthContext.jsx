import React, {createContext, useState, useEffect} from 'react';
import AuthService from '../api/services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    
    const login = async (username, password, deviceType, deviceID) => {
        setIsLoading(true);
        try {
          let userInfo = await AuthService.login(username, password, deviceType, deviceID);
          setUserInfo(userInfo);
          setUserToken(userInfo.accessToken);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          AsyncStorage.setItem('userToken', userInfo.accessToken);
        } catch (error) {
            throw error;
        }
        setIsLoading(false);
    };
      
    const logout = () =>{
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = async() =>{
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);
            if (userInfo){
                setUserToken(userToken);
                setUserInfo(userInfo);
            }
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
    <AuthContext.Provider value={{login, logout, register, isLoading, userToken, userInfo}}>
        {children}
    </AuthContext.Provider>
);
}

export default AuthProvider;