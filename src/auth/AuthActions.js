/**
 * Created by @nikitalpopov on 06/07/2017.
 */

import api from '../api/api.js'

export const LOGIN_USER = 'LOGIN_USER';

export function logInUser(request) {
    return {
        type: LOGIN_USER,
        payload: api.logInUser(request)
    }
}
