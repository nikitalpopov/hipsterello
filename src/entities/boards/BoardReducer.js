/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import { GET_BOARDS } from './BoardActions'

export default function(state = {}, action) {
    switch (action.type) {
        case GET_BOARDS:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}
