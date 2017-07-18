/**
 * Created by @nikitalpopov on 17/07/2017.
 */

import express from 'express';
import List  from '../../database/crud/List';

let router = express.Router();

router.post('/list/create', (req, res) => {
    List
        .createList(req.body)
        .then((createdList) => {
            res.send(createdList)
        });
});

router.get('/list/:id', (req, res) => {
    List
        .findListById(req.params.id)
        .then((foundList) => {
            res.send(foundList)
        });
});

router.post('/list/update', (req, res) => {
    List
        .updateList(req.body)
        .then((updatedList) => {
            res.send(updatedList)
        });
});

router.post('/list/delete', (req, res) => {
    List
        .deleteList(req.body)
        .then((deletedList) => {
            res.send(deletedList)
        });
});

module.exports = router;
