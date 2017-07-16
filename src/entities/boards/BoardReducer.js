/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import { CREATE_BOARD, GET_BOARD, UPDATE_BOARD, DELETE_BOARD } from './BoardActions';

export default function(state = {}, action) {
    switch (action.type) {
        case CREATE_BOARD:
            return {
                ...state,
                ...action.payload.data
            };

        case GET_BOARD:
            return {
                ...state,
                ...action.payload.data
            };

        case UPDATE_BOARD:
            return {
                ...state,
                ...action.payload.data
            };

        default:
            return state;
    }
}
