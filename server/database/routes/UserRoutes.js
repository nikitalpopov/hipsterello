import express from 'express';
import User  from '../../database/crud/User';

let router = express.Router();

module.exports = function(router, passport) {
    router.post('/login', (req, res) => {
        User
            .loginUser(req.body)
            .then((loggedInUser) => {
                res.send(loggedInUser);
            });
    });

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

};
