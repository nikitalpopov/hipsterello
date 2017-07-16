/**
 * Created by @nikitalpopov on 06/07/2017.
 */

import express from 'express';
import cors from 'cors';
import bp from 'body-parser';

import { serverPort } from '../src/config.json';

import * as db from './database/DataBaseUtils';

import User  from './database/crud/User';
import Board from './database/crud/Board';
import List  from './database/crud/List';
import Card  from './database/crud/Card';

const app = express();

db.setUpConnection();

app.use( bp.json() );

app.use( cors({ origin: '*' }) );

// REST API
app.post('/login', (req, res) => {
    User
        .createUser(req.body)
        .then((createdUser) => {
            res.send(createdUser);
    });
});

app.post('/user/update', (req, res) => {
    User
        .updateUser(req.body)
        .then((updatedUser) => {
            res.send(updatedUser)
    });
});

app.post('/user/delete', (req, res) => {
    User
        .deleteUser(req.body)
        .then((deletedUser) => {
            res.send(deletedUser)
        })
        .catch(console.log.bind(console));
});

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

app.post('/list/create', (req, res) => {
    List
        .createList(req.body, req.body.boardId)
        .then((createdList) => {
            res.send(createdList)
    });
});

app.get('/list/:id', (req, res) => {
    List
        .findListById(req.params.id)
        .then((foundList) => {
            res.send(foundList)
        });
});

app.post('/list/update', (req, res) => {
    List
        .updateList(req.body)
        .then((updatedList) => {
            res.send(updatedList)
        });
});

app.post('/list/delete', (req, res) => {
    List
        .deleteList(req.body)
        .then((deletedList) => {
            res.send(deletedList)
        });
});

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

const server = app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort}`);
});
