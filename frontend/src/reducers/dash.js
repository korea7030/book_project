import _ from "lodash";
import {
    GET_STATUS_OK,
    GET_STATUS_FAIL,
    GET_FORMAT_OK,
    GET_FORMAT_FAIL,
    GET_RECENT_OK,
    GET_RECENT_FAIL
} from '../actions/type';

export default function(state = {}, action) {
    switch(action.type) {
        case GET_STATUS_OK:
            return {
                ...state,
                bstatus: action.payload
            }
        case GET_STATUS_FAIL:
            return false;
        case GET_FORMAT_OK:
            return {
                ...state,
                bformat: action.payload
            }
        case GET_FORMAT_FAIL:
            return false;
        case GET_RECENT_OK:
            return {
                ...state,
                brecent: action.payload
            }
        case GET_RECENT_FAIL:
            return false;
        default:
            return state;
    }
}