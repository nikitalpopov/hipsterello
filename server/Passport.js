/**
 * Created by @nikitalpopov on 24/07/2017.
 */

import { Strategy } from 'passport-local';

import User from './database/crud/User';

/** @todo fix with promises */
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use('login', new Strategy({ // log in === sign up
            usernameField : 'email',
            passwordField : 'password',
        },
        (email, password, done) => {
            User
                .loginUser({'email': email, 'password': password})
                .then((err, user) => {
                    if (err)  return done(err);
                    if (user) return done(null, user);
                });
        }))
};
