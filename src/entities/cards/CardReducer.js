/**
 * Created by @nikitalpopov on 14/07/2017.
 */

import { CREATE_CARD, GET_CARD, UPDATE_CARD, DELETE_CARD } from './CardAction';

export default function(state = [], action) {
    let copiedState = state.slice();

    switch (action.type) {
        case CREATE_CARD:
            return [state, action.payload];

        case GET_CARD:
            return [state, action.payload];

        case UPDATE_CARD:
            copiedState[copiedState.findIndex((obj) => obj._id === action.payload._id)] = action.payload;

            return copiedState;

        case DELETE_CARD:
            let index = -1;
            index = copiedState.indexOf(action.payload);

            if (~index) { copiedState.splice(index, 1) }

            return copiedState;

        default:
            return state;
    }
}