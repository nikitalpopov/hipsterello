import express from 'express';
import User  from '../../database/crud/User';

let router = express.Router();

router.post('/login', (req, res) => {
    User
        .createUser(req.body)
        .then((createdUser) => {
            res.send(createdUser);
        });
});

router.get('/user/:id', (req, res) => {
    User
        .findUserById(req.params.id)
        .then((foundUser) => {
            res.send(foundUser);
        })
});

router.post('/user/update', (req, res) => {
    User
        .updateUser(req.body)
        .then((updatedUser) => {
            res.send(updatedUser)
        });
});

router.post('/user/delete', (req, res) => {
    User
        .deleteUser(req.body)
        .then((deletedUser) => {
            res.send(deletedUser)
        })
        .catch(console.log.bind(console));
});

module.exports = router;
