/**
 * Created by @nikitalpopov on 17/07/2017.
 */

import app from '../../Server';
import Card  from '../../database/crud/Card';

app.post('/card/create', (req, res) => {
    Card
        .createCard(req.body, req.body.listId)
        .then((createdCard) => {
            res.send(createdCard)
        });
});

app.get('/card/:id', (req, res) => {
    Card
        .findCardById(req.params.id)
        .then((foundCard) => {
            res.send(foundCard)
        });
});

app.post('/card/update', (req, res) => {
    Card
        .updateCard(req.body)
        .then((updatedCard) => {
            res.send(updatedCard)
        });
});

app.post('/card/delete', (req, res) => {
    Card
        .deleteCard(req.body)
        .then((deletedCard) => {
            res.send(deletedCard)
        });
});
