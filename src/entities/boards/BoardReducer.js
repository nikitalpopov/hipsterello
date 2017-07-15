/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import { CREATE_BOARD, GET_BOARD, UPDATE_BOARD, DELETE_BOARD } from './BoardActions';

export default function(state = {}, action) {
    switch (action.type) {
        case CREATE_BOARD:
            return {
                ...state,
                ...action.payload
            };

        case GET_BOARD:
            return {
                ...state,
                ...action.payload
            };

        case UPDATE_BOARD:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}
