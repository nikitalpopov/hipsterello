/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import cookie from 'react-cookies';

import { LOGIN_USER, LOGOUT_USER } from './AuthActions'

export default function(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            cookie.save('_id', action.payload.data._id, { path: '/', maxAge: 86400000 });
            cookie.save('isAuthorized', action.payload.data.isAuthorized, { path: '/', maxAge: 86400000 });

            localStorage.setItem('_id', action.payload.data._id);
            localStorage.setItem('expires', action.payload.data.expires);
            localStorage.setItem('isAuthorized', action.payload.data.isAuthorized);

            return {
                ...state,
                ...{ user: {
                        email: action.payload.data.email,
                        _id: action.payload.data._id
                    }
                }
            };

        case LOGOUT_USER:
            cookie.remove('_id');
            cookie.remove('isAuthorized');

            localStorage.removeItem('_id');
            localStorage.removeItem('expires');
            localStorage.setItem('isAuthorized', action.payload.data.isAuthorized);

            return {
                ...state,
                ...{}
            };

        default:
            return state;
    }
}
