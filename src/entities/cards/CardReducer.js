/**
 * Created by @nikitalpopov on 14/07/2017.
 */

import { GET_INITIAL_DATA } from '../boards/BoardActions';
import { CREATE_CARD, GET_CARD, UPDATE_CARD, DELETE_CARD } from './CardActions';

export default function(state = [], action) {
    let copiedState = state.slice();

    switch (action.type) {
        case GET_INITIAL_DATA:
            // @todo add card with _id === 0
            return copiedState.concat(action.payload.data.cards);

        case CREATE_CARD:
            return copiedState.push(action.payload.data);

        case GET_CARD:
            return copiedState.push(action.payload.data);

        case UPDATE_CARD:
            copiedState[copiedState.findIndex((obj) => obj._id === action.payload.data._id)] = action.payload.data;

            return copiedState;

        case DELETE_CARD:
            let index = -1;
            index = copiedState.indexOf(action.payload.data);

            if (~index) { copiedState.splice(index, 1) }

            return copiedState;

        default:
            return state;
    }
}