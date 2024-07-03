import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/authActions';

const initialState = {
    isLoading: false,
    userToken: null,
    userInfo: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, isLoading: true };
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, userInfo: action.payload, userToken: action.payload.accessToken };
        case LOGIN_FAILURE:
            return { ...state, isLoading: false, error: action.error };
        case LOGOUT:
            return { ...state, userToken: null, userInfo: null };
        default:
            return state;
    }
};

export default authReducer;
