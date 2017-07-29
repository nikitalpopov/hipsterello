import express from 'express';
import passport from 'passport';

import User from '../../database/crud/User';

let router = express.Router();
require('../../Passport')(passport);

router.use( passport.initialize() );
router.use( passport.session() );

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
}

router.post(
    '/login',
    passport.authenticate('local'),
    (req, res) => {
        res.send({ _id: req.user._id, email: req.user.email, isAuthorized: req.isAuthenticated() })
    }
);

router.get('/user/:id', (req, res) => {
    User
        .findUserById(req.params.id)
        .then((foundUser) => {
            res.send(foundUser);
        })
});

// router.post('/user/update', (req, res) => {
//     User
//         .updateUser(req.body)
//         .then((updatedUser) => {
//             res.send(updatedUser)
//         });
// });

// router.post('/user/delete/:_id', (req, res) => {
//     User
//         .deleteUser(req.params)
//         .then((deletedUser) => {
//             res.send(deletedUser)
//         })
//         .catch(console.log.bind(console));
// });

module.exports = router;
