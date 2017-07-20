import { Board as BoardModel } from '../entities/board/Board';
import { List as ListModel } from '../entities/list/List';
import { Card as CardModel } from '../entities/card/Card';

export default class Board {
    /**
     * @description Создаем доску, привязываем к ней пользователя
     * @param boardObject
     */
    static createBoard(boardObject) {
        const BoardModelInstance = new BoardModel({
            usersId: boardObject.usersId,
            title: boardObject.title
        });

        if (boardObject.color) BoardModelInstance.color = boardObject.color;

        return BoardModelInstance
            .save()
            .then((result) => {
                return result;
            });
    };

    /**
     * @description Находим доску по её id
     * @param boardId
     */
    static findBoardById(boardId) {
        return BoardModel
            .findById(
                boardId,
                ['_id', 'usersId', 'title', 'color', 'lists', 'cards']
            )
            .lean();
    };

    /**
     * @description Находим доску по id пользователя
     * @param userId
     */
    static findBoardByUserId(userId) {
        return BoardModel
            .findOne(
                { usersId: userId },
                ['_id', 'usersId', 'title', 'color', 'lists', 'cards']
            )
            .lean();
    };

    /**
     * @description Обновляем данные о привязанных к доске пользователях
     * @param boardId
     * @param userId
     */
    static addUserId(boardId, userId) {
        return BoardModel
            .findById(boardId)
            .then((foundBoard) => {
                foundBoard.usersId.push(userId);
                return foundBoard.save();
            })
            .then((savedBoard) => {
                return savedBoard;
            });
    };

    /**
     * @description Привязываем список к доске
     * @param boardId
     * @param list
     */
    static addList(boardId, list) {
        return BoardModel
            .findById(boardId)
            .then((foundBoard) => {
                foundBoard.lists.push(list);
                return foundBoard.save();
            })
            .then((savedBoard) => {
                return savedBoard;
            });
    };

    /**
     * @description Обновляем привязанный к доске список
     * @param boardId
     * @param list
     */
    static updateList(boardId, list) {
        return BoardModel.findOneAndUpdate(
            { '_id': boardId, 'lists._id': list._id },
            {
                '$set': {
                    'lists.$': list
                }
            })
            .then((savedBoard) => {
                return savedBoard;
            });
    };

    /**
     * @description Удаляем привязанный к доске список
     * @param boardId
     * @param list
     */
    static deleteList(boardId, list) {
        return BoardModel.findById(boardId)
            .then((board) => {
                board.lists.pull(list);
                return board.save();
            })
            .then(() => {
                return {
                    success: true
                }
            })
            .catch((err) => {
                return {
                    error: true
                };
            })
        ;
    }

    /**
     * @description Привязываем карточку к доске
     * @param boardId
     * @param card
     */
    static addCard(boardId, card) {
        return BoardModel
            .findById(boardId)
            .then((foundBoard) => {
                foundBoard.cards.push(card);
                return foundBoard.save()
            })
            .then((savedBoard) => {
                return savedBoard;
            });
    };

    /**
     * @description Обновляем привязанную к доске карточку
     * @param boardId
     * @param card
     */
    static updateCard(boardId, card) {
        return BoardModel.findOneAndUpdate(
            { '_id': boardId, 'cards._id': card._id },
            {
                '$set': {
                    'cards.$': card
                }
            })
            .then((savedBoard) => {
                return savedBoard;
            });
    };

    /**
     * @description Удаляем привязанную к доске карточку
     * @param boardId
     * @param card
     */
    static deleteCard(boardId, card) {
        return CardModel.findOneAndRemove(
            { '_id': boardId, 'cards._id': card._id },
            {
                '$pull': {
                    'cards.$': card
                }
            })
            .then((savedBoard) => {
                return savedBoard;
            });
    };

    /**
     * @description Обновляем данные доски
     * @param boardObject
     */
    static updateBoard(boardObject) {
        return BoardModel
            .findById(boardObject._id)
            .then((foundBoard) => {
                if (boardObject.title) foundBoard.title = boardObject.title;
                if (boardObject.color) foundBoard.color = boardObject.color;

                return foundBoard.save();
            })
            .then((savedResult) => {
                return savedResult;
            });
    };

    // /**
    //  * @description Удаляем данные доски
    //  * @param boardObject
    //  */
    // static deleteBoard(boardObject) {
    //     return BoardModel
    //         .find({ _id: boardObject._id })
    //         .then((foundBoard) => {
    //             return foundBoard[0].remove();
    //         })
    //         .then((deletedResult) => {
    //             return deletedResult;
    //     });
    // };
}
