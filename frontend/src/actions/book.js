import axios from 'axios';
import { stopSubmit } from 'redux-form';
import { tokenConfig, bookSearchToken } from '../actions/auth';
import history from '../history';
import { toast } from 'react-toastify';

import {
    GET_BOOKS,
    GET_BOOKS_FAIL,
    DELETE_BOOK,
    DELETE_FAIL_BOOK,
    BOOK_DETAIL,
    BOOK_DETAIL_FAIL,
    CREATE_BOOK,
    CREATE_BOOK_FAIL,
    BOOK_UPDATE,
    BOOK_UPDATE_FAIL,
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

// user book information get
export const getBooks = (page = 1, search_category = '', query = '') => async (dispatch, getState) => {
    try {
        const res = await axios.get(`/bookmanager/books/?page=${page}&query=${query}&search_category=${search_category}`, tokenConfig(getState));
        dispatch({
            type: GET_BOOKS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_BOOKS_FAIL
        });
        history.push('/login');
    }
}

// user book create
export const createBook = (formValues) => async (dispatch, getState) => {
    try {
        const res = await axios.post('/bookmanager/books/', formValues, tokenConfig(getState)).then(res => {
            if (res.status === 200 | res.status === 201) {
                toast.success('Book Save Success');
                dispatch({
                    type: CREATE_BOOK,
                    payload: res.status
                })
                history.push(`/books`);
            } else {
                toast.error('Save Book Fail');
                dispatch({
                    type: CREATE_BOOK_FAIL
                });
                
            }
        });
    } catch (err) {
        toast.error('Save Book Fail');
        dispatch({
            type: CREATE_BOOK_FAIL
        })
        dispatch(stopSubmit("BookForm", err.response.data));
    }
}

// user book detail
export const getDetailBook = (book_id) => async (dispatch, getState) => {
    try {
        const res = await axios.get(`/bookmanager/books/${book_id}`, tokenConfig(getState));
        dispatch({
            type: BOOK_DETAIL,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: BOOK_DETAIL_FAIL
        });
        history.push('/login');
    }
}

// user book update
export const updateBook = (book_id, formValues) => async (dispatch, getState) => {
    try {
        const res = await axios.put(`/bookmanager/books/${book_id}`, formValues, tokenConfig(getState)).then(res => {
            if (res.status === 200 | res.status === 204) {
                toast.success('Book Update Success');
                dispatch({
                    type: BOOK_UPDATE,
                    payload: res.data
                });
                history.push(`/books`);
            } else {
                toast.error('Book Update Fail');
                dispatch({
                    type: BOOK_UPDATE_FAIL
                });
            }
        });
    } catch (err) {
        toast.error('Book Update Fail');
        dispatch({
            type: BOOK_UPDATE_FAIL
        });
        history.push('/login');
    }
}
// user book delete
export const deleteBook = (book_id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(`/bookmanager/books/${book_id}`, tokenConfig(getState)).then(res => {
            if (res.status === 200 | res.status === 201 | res.status === 204) {
                toast.success('Book Delete Success');
                dispatch({
                    type: DELETE_BOOK,
                    payload: res.status
                });
                history.push(`/books`);
            } else {
                toast.error('Book Delete Fail');
                dispatch({
                    type: DELETE_FAIL_BOOK
                });
            }    
        });
    } catch (err) {
        toast.error('Book Delete Fail');
        dispatch({
            type: DELETE_FAIL_BOOK
        });
        history.push('/login');
    }
}

export const getBookFormatOption = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(`/bookmanager/books/choices`, tokenConfig(getState));
        dispatch({
            type: BOOK_FORMAT_OPTION,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: BOOK_FORMAT_OPTION_FAIL
        });
    }
}

export const searchAPIBook = (title, page=1) => async (dispatch) => {
    try {
        console.log(page);
        let res = await axios.get(`https://dapi.kakao.com/v3/search/book?target=title&query=${title}&page=${page}&sort='recency'`, bookSearchToken());
        let pageCount = Math.ceil(res.data.meta.pageable_count / 10);
        let currentPage = page;
        res.data.meta.totalPage = pageCount;
        res.data.meta.currentPage = currentPage;
        res.data.meta.nextPage = currentPage + 1;
        res.data.meta.prevPage = currentPage - 1;
        
        dispatch({
            type: SEARCH_BOOK_OK,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: SEARCH_BOOK_FAIL
        })
    }
}

export const searchTimeLine = (book_id, page=1) => async (dispatch, getState) => {
    try {
        const res = await axios.get(`/bookmanager/books/${book_id}/timelines?page=${page}`, tokenConfig(getState));
        dispatch({
            type: SEARCH_TIMELINE_OK,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: SEARCH_TIMELINE_FAIL
        })
    }
}

export const deleteTimeLine = (book_id, timeline_id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(`/bookmanager/books/${book_id}/timelines/${timeline_id}`, tokenConfig(getState)).then(res => {
            if (res.status === 200 | res.status === 201 | res.status === 204) {
                toast.success('TimeLine Delete Success');
                dispatch({
                    type: DELETE_TIMELINE_OK,
                    payload: res.status
                });
            } else {
                toast.error('TimeLine Delete Fail');
                dispatch({
                    type: DELETE_TIMELINE_FAIL
                });
                history.push('/login');
            }
        });
    } catch (err) {
        dispatch({
            type: DELETE_TIMELINE_FAIL
        });
    }
}

export const addTimeLine = (book_id, values) => async(dispatch, getState) => {
    try {
        const res = await axios.post(`/bookmanager/books/${book_id}/timelines`, values, tokenConfig(getState)).then(res => {
            if (res.status === 200 | res.status === 201) {
                toast.success('TimeLine Add Success');
                dispatch({
                    type: ADD_TIMELINE_OK,
                    payload: res.data
                });
            } else {
                toast.error('TimeLine Add Fail');
                dispatch({
                    type: ADD_TIMELINE_FAIL
                });
                history.push('/login');
            }
        });
        
    } catch (err) {
        dispatch({
            type: ADD_TIMELINE_FAIL
        })
    }
}

export const addNote = (book_id, values) => async (dispatch, getState) => {
    try {
        const res = await axios.post(`/bookmanager/books/${book_id}/notes`, values, tokenConfig(getState)).then(res => {
            if (res.status === 200 | res.status === 201) {
                toast.success('Note Add Success');
                dispatch({
                    type: ADD_NOTE_OK,
                    payload: res.data
                });
            } else {
                toast.error('Note Add Fail');
                dispatch({
                    type: ADD_NOTE_FAIL
                });
            }
        });
    } catch (err) {
        toast.error('Note Add Fail');
        dispatch({
            type: ADD_NOTE_FAIL
        });
    }
}