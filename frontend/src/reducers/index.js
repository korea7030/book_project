import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { LOGOUT_SUCCESS } from '../actions/type';

import user from './user';
import auth from './auth';
import book from './book';
import dash from './dash';


const appReducer = combineReducers({
    form: formReducer,
    user,
    auth,
    book,
    dash
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;