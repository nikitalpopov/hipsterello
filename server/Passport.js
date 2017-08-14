/**
 * Created by @nikitalpopov on 24/07/2017.
 */

import { Strategy } from 'passport-local';

import User from './database/crud/User';
import { User as UserModel } from './database/entities/User';

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(
            null,
            { _id: user._id, email: user.email }
        );
    });

    passport.deserializeUser((userId, done) => {
        User.findById(userId)
            .then((err, user) => {
                done(err, { _id: user._id, email: user.email });
            });
    });

    passport.use(
        'local',
        new Strategy(
            { // log in === sign up
                usernameField : 'email',
                passwordField : 'password',
            },
            (email, password, done) => {
                let user = new UserModel();

                user.email    = email;
                user.password = user.generateHash(password);

                let responseUser;

                return UserModel
                    .findByEmail(user.email)
                    .then((foundUser) => { return foundUser })
                    .catch((error) => { return User.createUser(user) })
                    .then((existedUser) => {
                        responseUser = existedUser;
                        return user.validatePassword(password, existedUser.password);
                    })
                    .catch((loginError) => {
                        return done(null, false, { message: 'Wrong password! Cannot auth current user!' } );
                    })
                    .then(() => { return done(null, responseUser) });
            }
        )
    )
};
