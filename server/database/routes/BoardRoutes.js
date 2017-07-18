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
    let answer = ({
        board: {},
        lists: [],
        cards: []
    });

    Board.findBoardByUserId(req.params.id)
        .then((foundBoard) => {
            foundBoard = foundBoard._doc;
            let listsId = foundBoard.lists;

            delete foundBoard.__v;  // foundBoard.__v = undefined is alternative
            delete foundBoard.lists;  // foundBoard.lists = undefined; foundBoard = JSON.parse(JSON.stringify(foundBoard));
            answer.board = foundBoard;

            return listsId.map(list => list._id);
        })
        .then((listsId) => {
            Promise.all(listsId.map((listId) => {
                return List
                    .findListById(listId)
                    .then((foundList) => {
                        foundList = foundList._doc;

                        let cardsId = [].concat.apply([], foundList.cards);

                        delete foundList.__v;
                        delete foundList.cards;

                        answer.lists.push(foundList);

                        return cardsId.map(card => card._id);
                })
            }))
                .then((cardsId) => {
                    let cards = cardsId[0];
                    Promise.all(cards.map((cardId) => {
                        return Card
                            .findCardById(cardId)
                            .then((foundCard) => {
                                foundCard = foundCard._doc;

                                delete foundCard.__v;

                                return foundCard;
                            })
                    }))
                        .then((cards) => {
                            answer.cards = cards;
                            res.send(answer);
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
