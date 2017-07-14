/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import { combineReducers } from 'redux';

import AuthReducer from '../auth/AuthReducer';
import BoardReducer from '../entities/boards/BoardReducer';
import ListReducer from '../entities/lists/ListReducer'
import CardReducer from '../entities/cards/CardReducer'

const appReducer = combineReducers({
    auth: AuthReducer,
    boards: BoardReducer,
    lists: ListReducer,
    cards: CardReducer
});

export default appReducer;
