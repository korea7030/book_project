import axios from 'axios';
import { tokenConfig } from '../actions/auth';
import history from '../history';

import {
    GET_STATUS_OK,
    GET_STATUS_FAIL,
    GET_FORMAT_OK,
    GET_FORMAT_FAIL,
    GET_RECENT_OK,
    GET_RECENT_FAIL
} from '../actions/type';

export const getBookStatus = (user_id) => async (dispatch, getState) => {
    try {
        const res = await axios.get(`/summarization/dashboard/status?user=${user_id}`, tokenConfig(getState)).then(res => {
            if (res.status === 200) {
                dispatch({
                    type: GET_STATUS_OK,
                    payload: res.data
                })
            } else {
                dispatch({
                    type: GET_STATUS_FAIL
                })
                history.push('/login');
            }
        })
    } catch (err) {
        dispatch({
            type: GET_STATUS_FAIL
        })
    }
}

export const getBookFormat = (user_id) => async (dispatch, getState) => {
    
    try {
        const res = await axios.get(`/summarization/dashboard/format?user=${user_id}`, tokenConfig(getState)).then(res => {
            if (res.status === 200) {
                dispatch({
                    type: GET_FORMAT_OK,
                    payload: res.data
                })
            } else {
                dispatch({
                    type: GET_FORMAT_FAIL
                })
                history.push('/login');
            }
        })
    } catch (err) {
        dispatch({
            type: GET_FORMAT_FAIL
        })
    }
}

export const getRecentBookView = (user_id) => async (dispatch, getState) => {
    try {
        const res = await axios.get(`/summarization/dashboard/recent?user=${user_id}`, tokenConfig(getState)).then(res => {
            if (res.status === 200) {
                dispatch({
                    type: GET_RECENT_OK,
                    payload: res.data
                })
            } else {
                dispatch({
                    type: GET_RECENT_FAIL
                })
                history.push('/login');
            }
        })
    } catch (err) {
        dispatch({
            type: GET_RECENT_FAIL
        })
    }
}