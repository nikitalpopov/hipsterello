/**
 * Created by @nikitalpopov on 17/07/2017.
 */

import express from 'express';
import Card  from '../../database/crud/Card';

let router = express.Router();

router.post('/card/create', (req, res) => {
    Card
        .createCard(req.body, req.body.listId)
        .then((createdCard) => {
            res.send(createdCard)
        });
});

router.get('/card/:id', (req, res) => {
    Card
        .findCardById(req.params.id)
        .then((foundCard) => {
            res.send(foundCard)
        });
});

router.post('/card/update', (req, res) => {
    Card
        .updateCard(req.body)
        .then((updatedCard) => {
            res.send(updatedCard)
        });
});

router.post('/card/delete', (req, res) => {
    Card
        .deleteCard(req.body)
        .then((deletedCard) => {
            res.send(deletedCard)
        });
});

module.exports = router;
