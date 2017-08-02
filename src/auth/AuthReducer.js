/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import { LOGIN_USER, LOGOUT_USER } from './AuthActions';

export default function(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            localStorage.setItem('_id', action.payload.data._id);
            localStorage.setItem('email', action.payload.data.email);
            localStorage.setItem('isAuthorized', action.payload.data.isAuthorized);
            localStorage.setItem('expires', action.payload.data.expires);

            if (action.payload.data.isAuthorized === true) {
                return {
                    user: {
                        _id: action.payload.data._id,
                        email: action.payload.data.email
                    },
                    isAuthorized: true
                };
            } else {
                return;
            }

        case LOGOUT_USER:
            localStorage.removeItem('_id');
            localStorage.removeItem('email');
            localStorage.setItem('isAuthorized', action.payload.data.isAuthorized);
            localStorage.removeItem('expires');

            if (action.payload.data.isAuthorized === false) {
                return {
                    user: {
                        _id: null,
                        email: null
                    },
                    isAuthorized: false
                };
            } else {
                return;
            }

        default:
            return state;
    }
}
