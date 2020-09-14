import axios from "axios";
// import { returnErrors } from './messages';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR
} from "./type";

export const tokenConfig = (getState) => {
    // Get token
    const token = getState().user.token;
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
};

export const bookSearchToken = () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    config.headers[
        "Authorization"
    ] = `KakaoAK ${process.env.REACT_APP_DAUM_BOOK_KEY}`;

    return config;
};

export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING });
    try {
        const res = await axios.get("/accounts/user/", tokenConfig(getState));
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};