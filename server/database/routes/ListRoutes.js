/**
 * Created by @nikitalpopov on 17/07/2017.
 */

import app from '../../Server';
import List  from '../../database/crud/List';

app.post('/list/create', (req, res) => {
    List
        .createList(req.body, req.body.boardId)
        .then((createdList) => {
            res.send(createdList)
        });
});

app.get('/list/:id', (req, res) => {
    List
        .findListById(req.params.id)
        .then((foundList) => {
            res.send(foundList)
        });
});

app.post('/list/update', (req, res) => {
    List
        .updateList(req.body)
        .then((updatedList) => {
            res.send(updatedList)
        });
});

app.post('/list/delete', (req, res) => {
    List
        .deleteList(req.body)
        .then((deletedList) => {
            res.send(deletedList)
        });
});
