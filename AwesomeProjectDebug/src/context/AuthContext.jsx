import React, {createContext, useState} from "react";
import axios from 'axios';
import { useAnimatedKeyboard } from "react-native-reanimated";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (username, password, deviceType, deviceID) =>{
        setIsLoading(true);

        try{
            const response = await axios.post(
                "http://172.18.29.12:8189/api/v1/Account/PasswordLogin",
            
                {username, password, deviceType, deviceID},

                {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'api-supported-versions': '1.0'
                    }
                }
            );
            const token = response.data.accessToken;

            setUserToken(token);
        } catch(error){
            console.error('Error:', error);
            throw error;
        }
        
        setIsLoading(false);
    }

    const logout = () =>{
        setUserToken(null);
        setIsLoading(false);
    }

    const register = async (firstName, lastName, email, password) =>{
        setIsLoading(true);

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
            alert('One or more invalid field/s');
            return;
        }
        
        try {
            const response = await axios.post(
                'http://172.18.29.12:8189/api/v1/Account/Register',

                {email, firstName, lastName, password},

                {
                    headers:{
                        'Content-Type': 'application/json; charset=utf-8',
                        'api-supported-versions': '1.0'
                    }
                }
            )
        
            if (response.status === 200) {
                setIsLoading(false);
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                alert(
                    response.data.message,
                );
            } else {
                throw new Error('An error has occurred');
            }
        } catch (error) {
            alert('An error has occurred');
            console.error('Error:', error);
            throw error;
        }

        setIsLoading(false);
    }

    return(
        <AuthContext.Provider value={{login, logout, register, isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;