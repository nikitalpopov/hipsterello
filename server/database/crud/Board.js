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
                delete result.__v;

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
            .find({ _id: boardId })
            .then((foundBoard) => {
                foundBoard[0].usersId.push(userId);
                return foundBoard[0].save();
            })
            .then((savedReBoard) => {
                return savedReBoard;
            });
    };

    /**
     * @description Привязываем список к доске
     * @param boardId
     * @param list
     */
    static addList(boardId, list) {
        return BoardModel
            .find({ _id: boardId })
            .then((foundBoard) => {
                foundBoard[0].lists.push(list);
                return foundBoard[0].save();
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
        let listIndex;

        return BoardModel
            .find({ _id: boardId })
            .then((foundBoard) => {
                foundBoard[0].lists.map((listObject, index) => {
                    if (list._id !== listObject._id) return listObject;

                    listIndex = index;

                    return new ListModel({
                        ...listObject,
                        ...list
                    });
                });

                return foundBoard[0].save();
            }).then((savedBoard) => {
                return savedBoard.lists[listIndex];
            });
    };

    /**
     * @description Удаляем привязанный к доске список
     * @param boardId
     * @param list
     */
    static deleteList(boardId, list) {
        let listIndex;

        return BoardModel
            .find({ _id: boardId })
            .then((foundBoard) => {
                foundBoard[0].lists.map((listObject, index) => {
                    if (list._id !== listObject._id) return listObject;

                    listIndex = index;

                    return foundBoard[0].lists[index].remove();
                });

                return foundBoard[0].save();
            }).then((savedBoard) => {
                return savedBoard.lists[listIndex];
            });
    }

    /**
     * @description Привязываем карточку к доске
     * @param boardId
     * @param card
     */
    static addCard(boardId, card) {
        return BoardModel
            .find({ _id: boardId })
            .then((foundBoard) => {
                foundBoard[0].cards.push({
                    card: card
                });
                return foundBoard[0].save()
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
        let cardIndex;

        return BoardModel
            .find({ _id: boardId })
            .then((foundBoard) => {
                foundBoard[0].cards.map((cardObject, index) => {
                    if (card._id !== cardObject._id)
                        return cardObject;

                    cardIndex = index;

                    return new CardModel({
                        ...cardObject,
                        ...card
                    });
                });

                return foundBoard[0].save();
            }).then((savedBoard) => {
                return savedBoard.cards[cardIndex].card;
            });
    };

    /**
     * @description Удаляем привязанную к доске карточку
     * @param boardId
     * @param card
     */
    static deleteCard(boardId, card) {
        let cardIndex;

        return BoardModel
            .find({ _id: boardId })
            .then((foundBoard) => {
                foundBoard[0].cards.map((cardObject, index) => {
                    if (card._id !== cardObject._id)
                        return cardObject;

                    cardIndex = index;

                    return foundBoard[0].cards[index].remove();
                });

                return foundBoard[0].save();
            }).then((savedBoard) => {
                return savedBoard.cards[cardIndex];
            });
    };

    /**
     * @description Обновляем данные доски
     * @param boardObject
     */
    static updateBoard(boardObject) {
        return BoardModel
            .find({ _id: boardObject._id })
            .then((foundBoard) => {
                if (boardObject.title) foundBoard[0].title = boardObject.title;
                if (boardObject.color) foundBoard[0].color = boardObject.color;

                return foundBoard[0].save();
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
