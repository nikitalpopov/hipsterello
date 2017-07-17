/**
 * Created by @nikitalpopov on 17/07/2017.
 */

import app from '../../Server';
import Board from '../../database/crud/Board';

app.get('/board/user/:id', (req, res) => {
    Board
        .findBoardByUserId(req.params.id)
        .then((foundBoard) => {
            res.send(foundBoard)
        });
});

app.post('/board/create', (req, res) => {
    Board
        .createBoard(req.body, req.body.userId)
        .then((createdBoard) => {
            res.send(createdBoard)
        });
});

app.get('/board/:id', (req, res) => {
    Board
        .findBoardById(req.params.id)
        .then((foundBoard) => {
            res.send(foundBoard)
        });
});

app.post('/board/update', (req, res) => {
    Board
        .updateBoard(req.body)
        .then((updatedBoard) => {
            res.send(updatedBoard)
        });
});

app.post('/board/delete', (req, res) => {
    Board
        .deleteBoard(req.body)
        .then((deletedBoard) => {
            res.send(deletedBoard)
        });
});
