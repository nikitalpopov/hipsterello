/**
 * Created by @nikitalpopov on 14/07/2017.
 */

import { GET_INITIAL_DATA } from '../boards/BoardActions';
import { CREATE_CARD, GET_CARD, UPDATE_CARD, DELETE_CARD } from './CardActions';

export default function(state = [], action) {
    let copiedState = state.slice();

    switch (action.type) {
        case GET_INITIAL_DATA:
            return copiedState.concat(action.payload.data.cards);

        case CREATE_CARD:
            copiedState.push(action.payload.data);

            return copiedState;

        case GET_CARD:
            copiedState.push(action.payload.data);

            return copiedState;

        case UPDATE_CARD:
            if (action.payload.data.isUpdated === true) {
                copiedState[copiedState.findIndex((obj) => obj._id === action.payload.data.card._id)] = action.payload.data.card;
            }

            return copiedState;

        case DELETE_CARD:
            if (action.payload.data.isDeleted === true) {
                copiedState = copiedState.filter((obj) => {
                    return obj._id !== action.payload.data.card._id;
                })
            }

            return copiedState;

        default:
            return state;
    }
}