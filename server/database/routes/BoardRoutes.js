/**
 * Created by @nikitalpopov on 17/07/2017.
 */

import express from 'express';
import Board from '../../database/crud/Board';
import List from '../../database/crud/List';
import Card from '../../database/crud/Card';

let router = express.Router();

router.get('/get-started/:id', (req, res) => {

    /* For tree */
    // Board
    //     .findBoardByUserId(req.params.id)
    //     .then((foundBoard) => {
    //         let answer = ({
    //             board: foundBoard,
    //             lists: foundBoard.lists,
    //             cards: [].concat.apply([], foundBoard.lists.map(list => list.cards))
    //         });
    //         console.log(answer);
    //         res.send(answer);
    //     });

    /* For collections */
    let response = ({
        board: {},
        lists: [],
        cards: []
    });

    Board.findBoardByUserId(req.params.id)
        .then((foundBoard) => {
            let listsId = foundBoard.lists;
            delete foundBoard.lists;  // foundBoard.lists = undefined; foundBoard = JSON.parse(JSON.stringify(foundBoard));

            response.board = foundBoard;

            return listsId.map(list => list._id);
        })
        .then((listsId) => {
            Promise.all(listsId.map((listId) => {
                return List
                    .findListById(listId)
                    .then((foundList) => {
                        let cardsId = [].concat.apply([], foundList.cards);
                        delete foundList.cards;

                        response.lists.push(foundList);

                        return cardsId.map(card => card._id);
                })
            }))
                .then((cardsId) => {
                    cardsId = [].concat.apply([], cardsId);
                    Promise.all(cardsId.map((cardId) => {
                        return Card
                            .findCardById(cardId)
                            .then((foundCard) => {
                                return foundCard;
                            })
                    }))
                        .then((cards) => {
                            response.cards = cards;
                            res.send(response);
                    })
            })
    });
});

router.post('/board/create', (req, res) => {
    Board
        .createBoard(req.body)
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
