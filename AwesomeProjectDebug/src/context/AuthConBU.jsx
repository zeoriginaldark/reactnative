import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, logout } from '../redux/actions/authAct';
import store from '../redux/store';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { isLoading, userToken, userInfo } = useSelector(state => state);

    const handleLogin = async (username, password, deviceType, deviceID) => {
        dispatch(login(username, password, deviceType, deviceID));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);
            if (userInfo) {
                dispatch({ type: LOGIN_SUCCESS, payload: userInfo });
            }
        };
        checkLoginStatus();
    }, [dispatch]);

    return (
        <AuthContext.Provider value={{ login: handleLogin, logout: handleLogout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

const AuthProviderWithStore = ({ children }) => (
    <Provider store={store}>
        <AuthProvider>{children}</AuthProvider>
    </Provider>
);

export default AuthProviderWithStore;
