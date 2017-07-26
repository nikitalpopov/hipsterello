/**
 * Created by @nikitalpopov on 17/07/2017.
 */

import express from 'express';
import Card  from '../../database/crud/Card';

let router = express.Router();

module.exports = function(router, passport) {
    router.post('/card/create', (req, res) => {
        Card
            .createCard(req.body)
            .then((createdCard) => {
                res.send(createdCard)
            });
    });

// router.get('/card/:_id', (req, res) => {
//     Card
//         .findCardById(req.params._id)
//         .then((foundCard) => {
//             res.send(foundCard)
//         });
// });

    router.patch('/card/update', (req, res) => {
        Card
            .updateCard(req.body)
            .then((updatedCard) => {
                res.send(updatedCard)
            });
    });

    router.delete('/card/delete/:_id/:boardId', (req, res) => {
        Card
            .deleteCard(req.params)
            .then((deletedCard) => {
                res.send(deletedCard)
            });
    });

};
