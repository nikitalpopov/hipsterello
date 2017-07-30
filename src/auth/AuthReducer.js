/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import cookie from 'react-cookies';

import { LOGIN_USER } from './AuthActions'

export default function(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            let isAuthorized = (action.payload.data.isAuthorized) ? action.payload.data.isAuthorized : false;
            cookie.save('isAuthorized', isAuthorized, { path: '/', maxAge: 86400000 });
            localStorage.setItem('isAuthorized', isAuthorized);

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
