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

router.patch('/list/update', (req, res) => {
    List
        .updateList(req.body)
        .then((updatedList) => {
            res.send(updatedList)
        });
});

router.delete('/list/delete/:_id/:boardId', (req, res) => {
    List
        .deleteList(req.params)
        .then((deletedList) => {
            res.send(deletedList)
        });
});

// router.get('/list/:id', (req, res) => {
//     List
//         .findListById(req.params.id)
//         .then((foundList) => {
//             res.send(foundList)
//         });
// });

module.exports = router;
