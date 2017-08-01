/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import { LOGIN_USER, LOGOUT_USER } from './AuthActions';
import { expires } from '../config.json';

export default function(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            localStorage.removeItem('isAuthorized');
            localStorage.setItem('_id', action.payload.data._id);
            localStorage.setItem('expires', action.payload.data.expires);
            localStorage.setItem('isAuthorized', action.payload.data.isAuthorized);

            return {
                ...state,
                ...{ user: {
                        email: action.payload.data.email,
                        _id: action.payload.data._id
                    },
                    isAuthorized: true
                }
            };

        case LOGOUT_USER:
            localStorage.removeItem('_id');
            localStorage.removeItem('expires');
            localStorage.removeItem('isAuthorized');
            localStorage.setItem('isAuthorized', action.payload.data.isAuthorized);

            return {
                ...state,
                ...{}
            };

        default:
            return state;
    }
}
