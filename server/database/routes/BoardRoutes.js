/**
 * Created by @nikitalpopov on 17/07/2017.
 */

import express from 'express';
import Board from '../../database/crud/Board';

let router = express.Router();

router.get('/board/user/:id', (req, res) => {
    Board
        .findBoardByUserId(req.params.id)
        .then((foundBoard) => {
            res.send(foundBoard)
        });
});

router.post('/board/create', (req, res) => {
    Board
        .createBoard(req.body, req.body.userId)
        .then((createdBoard) => {
            res.send(createdBoard)
        });
});

router.get('/board/:id', (req, res) => {
    Board
        .findBoardById(req.params.id)
        .then((foundBoard) => {
            res.send(foundBoard)
        });
});

router.post('/board/update', (req, res) => {
    Board
        .updateBoard(req.body)
        .then((updatedBoard) => {
            res.send(updatedBoard)
        });
});

router.post('/board/delete', (req, res) => {
    Board
        .deleteBoard(req.body)
        .then((deletedBoard) => {
            res.send(deletedBoard)
        });
});

module.exports = router;
