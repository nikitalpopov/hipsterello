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
                    isAuthorized: action.payload.data.isAuthorized,
                    user: { email: action.payload.data.email, _id: action.payload.data._id }
                }
            };

        default:
            return state;
    }
}
