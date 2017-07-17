import { Board as BoardModel } from '../entities/board/Board';

export default class Board {
    /**
     * @description Создаем доску, привязываем к ней пользователя
     * @param boardData
     * @param userId
     */
    static createBoard(boardData, userId) {
        const BoardModelInstance = new BoardModel({
            userId: boardData.userId,
            title: boardData.title
        });

        if (boardData.color) { BoardModelInstance.color = boardData.color; }

        return BoardModelInstance.save()
            .then((result) => {
                return result;
        });
    };

    /**
     * @description Находим доску по её id
     * @param boardId
     */
    static findBoardById(boardId) {
        return BoardModel.findById(boardId);
    };

    /**
     * @description Находим доску по id пользователя
     * @param userId
     */
    static findBoardByUserId(userId) {
        return BoardModel.findOne({ userId: userId });
    };

    /**
     * @description Обновляем данные доски
     * @param boardData
     */
    static updateBoard(boardData) {
        return BoardModel
            .find({ _id: boardData._id })
            .then((foundBoard) => {
                if (boardData.title) { foundBoard[0].title = boardData.title; }
                if (boardData.color) { foundBoard[0].color = boardData.color; }
                if (boardData.listsId) {
                    for (const listId of boardData.listsId) {
                        foundBoard[0].listsId.push(listId);
                    }
                }
                return foundBoard[0].save(); })
            .then((savedResult) => {
                return savedResult;
        });
    };

    /**
     * @description Обновляем данные о привязанных к доске списках
     * @param boardId
     * @param listId
     */
    static updateLists(boardId, listId) {
        return BoardModel
            .find({ _id: boardId })
            .then((foundBoard) => {
                foundBoard[0].listsId.push(listId);
                return foundBoard[0].save(); })
            .then((savedResult) => {
                return savedResult;
            });
    };

    // /**
    //  * @description Обновляем данные о привязанных к пользователю досках
    //  * @param userId
    //  * @param boardId
    //  */
    // static updateBoards(userId, boardId) {
    //     return UserModel
    //         .find({ _id: userId })
    //         .then((foundUser) => {
    //             foundUser[0].boardsId.push(boardId);
    //             return foundUser[0].save(); })
    //         .then((savedResult) => {
    //             return savedResult.boardsId;
    //     });
    // };

    /**
     * @description Удаляем данные доски
     * @param boardData
     */
    static deleteBoard(boardData) {
        return BoardModel
            .find({ _id: boardData._id })
            .then((foundBoard) => {
                return foundBoard[0].remove();
            })
            .then((deletedResult) => {
                return deletedResult;
        });
    };
}
