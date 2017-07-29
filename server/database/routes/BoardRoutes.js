/**
 * Created by @nikitalpopov on 17/07/2017.
 */

import express from 'express';

import Board from '../../database/crud/Board';

let router = express.Router();

router.get('/get-started/:id', (req, res) => {
    Board.findBoardByUserId(req.params.id)
        .then((foundBoard) => {
            res.send(foundBoard);
        });
});

router.get('/board/:id', (req, res) => {
    Board
        .findBoardById(req.params.id)
        .then((foundBoard) => {
            res.send(foundBoard)
        });
});

router.patch('/board/update', (req, res) => {
    Board
        .updateBoard(req.body)
        .then((updatedBoard) => {
            res.send(updatedBoard)
        });
});

// router.post('/board/create', (req, res) => {
//     Board
//         .createBoard(req.body)
//         .then((createdBoard) => {
//             res.send(createdBoard)
//         });
// });

// router.post('/board/delete/:_id', (req, res) => {
//     Board
//         .deleteBoard(req.params)
//         .then((deletedBoard) => {
//             res.send(deletedBoard)
//         });
// });

module.exports = router;
