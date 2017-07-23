/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import { LOGIN_USER } from './AuthActions'

export default function(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                ...{
                    isAuthorized: !!action.payload.data._id,
                    user: action.payload.data
                }
            };

        default:
            return state;
    }
}
