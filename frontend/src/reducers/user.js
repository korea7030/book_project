import _ from "lodash";
import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_FAIL,
    USER_OPTION_OK,
    USER_OPTION_FAIL,
    USER_SETTINGS_OK,
    USER_SETTINGS_FAIL,
    EMAIL_VALIDATE_OK,
    EMAIL_VALIDATE_FAIL,
} from '../actions/type';

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: localStorage.getItem("isAuthenticated"),
    isLoading: false,
    user: localStorage.getItem("user")
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", action.payload.user);
            localStorage.setItem("isAuthenticated", true);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        case LOGIN_FAIL:
        case USER_OPTION_OK:
            return {
                ...state,
                userOption: _.map(action.payload),
            }
        case USER_OPTION_FAIL:
        case USER_SETTINGS_OK:
            return {
                ...state,
                settings: action.payload
            }
        case USER_SETTINGS_FAIL:
        case EMAIL_VALIDATE_OK:
            return {
                ...state,
                msg: action.payload
            }
        case EMAIL_VALIDATE_FAIL:
        default:
            return state;
    }
}