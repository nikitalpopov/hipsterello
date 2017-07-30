/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import cookie from 'react-cookies';

import { LOGIN_USER } from './AuthActions'

export default function(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            cookie.save('_id', action.payload.data._id, { path: '/', maxAge: 86400000 });
            cookie.save('isAuthorized', action.payload.data.isAuthorized, { path: '/', maxAge: 86400000 });

            localStorage.setItem('_id', action.payload.data._id);
            localStorage.setItem('isAuthorized', action.payload.data.isAuthorized);
            localStorage.setItem('expires', action.payload.data.expires);
            return {
                ...state,
                ...{ user: {
                        email: action.payload.data.email,
                        _id: action.payload.data._id
                    }
                }
            };

        default:
            return state;
    }
}
