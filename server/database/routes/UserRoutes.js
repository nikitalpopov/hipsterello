import app from '../../Server';
import User  from '../../database/crud/User';

app.post('/login', (req, res) => {
    User
        .createUser(req.body)
        .then((createdUser) => {
            res.send(createdUser);
        });
});

app.get('/user/:id', (req, res) => {
    User
        .findUserById(req.params.id)
        .then((foundUser) => {
            res.send(foundUser);
        })
});

app.post('/user/update', (req, res) => {
    User
        .updateUser(req.body)
        .then((updatedUser) => {
            res.send(updatedUser)
        });
});

app.post('/user/delete', (req, res) => {
    User
        .deleteUser(req.body)
        .then((deletedUser) => {
            res.send(deletedUser)
        })
        .catch(console.log.bind(console));
});