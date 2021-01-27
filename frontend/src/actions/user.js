import axios from "axios";
import { stopSubmit } from "redux-form";
import { tokenConfig } from "../actions/auth";
import { toast } from 'react-toastify';
import history from '../history';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    USER_OPTION_OK,
    USER_OPTION_FAIL,
    USER_SETTINGS_OK,
    USER_SETTINGS_FAIL,
    EMAIL_VALIDATE_OK,
    EMAIL_VALIDATE_FAIL
} from "./type";

export const login = ({ email, password }) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post("/accounts/login", body, config);

        const authConfig = {
            headers: {
                Authorization: `Token ${res.data.token}`,
            },
        };

        const resAuth = await axios.get("/accounts/user", authConfig).then(resAuth => {
            if (resAuth.status === 200) {
                toast.success('Login Success');
                resAuth.data.token = res.data.token;
                resAuth.data.user = res.data.user;
                
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: resAuth.data,    
                });

                history.push(`/main/${resAuth.data.pk}`);
            } else {
                toast.error('Login Fail');
                dispatch({
                    type: LOGIN_FAIL,
                });
                
            }
        });
        
    } catch (err) {
        toast.error('Login Fail');
        dispatch({
            type: LOGIN_FAIL,
        });
        dispatch(stopSubmit("LoginForm", err));
    }
};

export const logout = () => async (dispatch, getState) => {
    await axios.post("/accounts/logout", null, tokenConfig(getState)).then(res => {
        if (res.status === 200) {
            toast.success('Logout');
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        }
    });
    
};

export const register = ({ email, username, password }) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ email, username, password });

    try {
        const res = await axios.post("/accounts/register", body, config).then(res => {
            if (res.status === 200) {
                toast.success('Register Success');

                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data,
                });
            } else {
                toast.error('Register Error');

                dispatch({
                    type: REGISTER_FAIL,
                });
            }
        });

        
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
        });
        dispatch(stopSubmit("RegisterForm", err.response.data));
    }
};

export const userOption = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(
            `/accounts/user/options/`,
            tokenConfig(getState)
        );

        dispatch({
            type: USER_OPTION_OK,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: USER_OPTION_FAIL,
        });
    }
};

export const userSettingUpdate = (user_id, body) => async (
    dispatch,
    getState
) => {
    try {
        const res = await axios.patch(
            `/accounts/user/${user_id}/`,
            body,
            tokenConfig(getState)
        ).then(res => {
            if (res.status === 200) {
                dispatch({
                    type: USER_SETTINGS_OK,
                    payload: res.data,
                }, toast.success('Settings Update'));
            } else {
                dispatch({
                    type: USER_SETTINGS_FAIL
                })
            }
        }
            
        );

        
    } catch (err) {
        dispatch({
            type: USER_SETTINGS_FAIL,
        });
    }
};

export const emailCheck = (email) => async (dispatch) => {
    try {
        const res = await axios.get(
            `/accounts/user/email/validate?email=${email}`
        );
        dispatch({
            type: EMAIL_VALIDATE_OK,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: EMAIL_VALIDATE_FAIL,
        });
        dispatch(stopSubmit("RegisterForm", err.response.data));
    }
};
