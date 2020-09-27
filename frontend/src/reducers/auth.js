import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    EMAIL_VALIDATE_OK,
    EMAIL_VALIDATE_FAIL
} from '../actions/type';


const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    isLoading: false,
    user: localStorage.getItem("user")
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", action.payload.user);
            localStorage.setItem("isAuthenticated", true);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user
            }
        case AUTH_ERROR:
            localStorage.removeItem('token');
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        default: 
            return state;
    }
}