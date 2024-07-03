export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const login = (username, password, deviceType, deviceID) => {
    return async dispatch => {
        dispatch({ type: LOGIN_REQUEST });
        try {
            let userInfo = await AuthService.login(username, password, deviceType, deviceID);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            await AsyncStorage.setItem('userToken', userInfo.accessToken);
            dispatch({ type: LOGIN_SUCCESS, payload: userInfo });
        } catch (error) {
            dispatch({ type: LOGIN_FAILURE, error });
        }
    };
};

export const logout = () => {
    return async dispatch => {
        await AsyncStorage.removeItem('userInfo');
        await AsyncStorage.removeItem('userToken');
        dispatch({ type: LOGOUT });
    };
};
