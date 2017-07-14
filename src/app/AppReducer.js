/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import { combineReducers } from 'redux';

import AuthReducer from '../auth/AuthReducer';
import BoardsReducer from './BoardsReducer';
import ListReducer from '../lists/ListReducer'

const appReducer = combineReducers({
    auth: AuthReducer,
    boards: BoardsReducer,
    lists: ListReducer
});

export default appReducer;
