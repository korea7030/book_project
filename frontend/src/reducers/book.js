import _ from "lodash";
import {
    GET_BOOKS,
    DELETE_BOOK,
    BOOK_DETAIL,
    BOOK_FORMAT_OPTION,
    BOOK_FORMAT_OPTION_FAIL,
    SEARCH_BOOK_OK,
    SEARCH_BOOK_FAIL,
    SEARCH_TIMELINE_OK,
    SEARCH_TIMELINE_FAIL,
    DELETE_TIMELINE_OK,
    DELETE_TIMELINE_FAIL,
    ADD_TIMELINE_OK,
    ADD_TIMELINE_FAIL,
    ADD_NOTE_OK,
    ADD_NOTE_FAIL,
} from '../actions/type';
import { Stats } from "fs";

export default function(state = {} , action) {
    switch (action.type) {
        case GET_BOOKS:
            return {
                ...state,
                books: action.payload
            }
        case DELETE_BOOK:
            return _.omit(state, action.payload);
        case BOOK_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case BOOK_FORMAT_OPTION:
            return {
                ...state,
                formatOption: _.map(action.payload),
            }
        case BOOK_FORMAT_OPTION_FAIL:
            return false;
        case SEARCH_BOOK_OK:
            return {
                ...state,
                book_search: action.payload
            }
        case SEARCH_BOOK_FAIL:
            return false;
        case SEARCH_TIMELINE_OK:
            return {
                ...state,
                timelines: action.payload
            }
        case SEARCH_TIMELINE_FAIL:
            return false;
        case DELETE_TIMELINE_OK:
            return _.omit(state, action.payload);
        case DELETE_TIMELINE_FAIL:
            return false;
        case ADD_TIMELINE_OK:
            return _.omit(state, action.payload);
        case ADD_TIMELINE_FAIL:
            return false;
        case ADD_NOTE_OK:
            return _.omit(state, action.payload);
        case ADD_NOTE_FAIL:
            return false;
        default:
            return state;
    }
}