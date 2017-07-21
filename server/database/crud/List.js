import { List as ListModel } from '../entities/list/List';
import Board from './Board';

export default class List {
    /**
    * @description Создаем список, привязываем его к доске
    * @param listObject
    */
    static createList(listObject) {
        const ListModelInstance = new ListModel({
            title: listObject.title
        });

        if (listObject.color) ListModelInstance.color = listObject.color;

        return ListModelInstance
            .save()
            .then((createdList) => {
                return Board
                    .addList(listObject.boardId, createdList)
                    .then(() => {
                        return createdList;
                });
            });
    };

    /**
     * @description Находим список по его id
     * @param listId
     */
    static findListById(listId) {
        return ListModel
            .findById(
                listId,
                ['_id', 'title', 'color']
            )
            .lean();
    };

    /**
     * @description Обновляем данные списка
     * @param listObject
     */
    static updateList(listObject) {
        return ListModel
            .findById(listObject._id)
            .then((foundList) => {
                if (listObject.title) foundList.title = listObject.title;
                if (listObject.color) foundList.color = listObject.color;

                return foundList
                    .save()
                    .then((savedList) => {
                        return Board
                            .updateList(listObject.boardId, savedList)
                            .then(() => {
                                return savedList;
                            });
                    });
            });
    };

    /**
     * @description Удаляем данные списка
     * @param listObject
     */
    static deleteList(listObject) {
        return ListModel
            .findById(listObject._id)
            .then((foundList) => {
                return foundList.remove();
            })
            .then((removedList) => {
                return Board.deleteList(listObject.boardId, removedList)
            }).then(() => {
                return {
                    success: true
                };
            }).catch((err) => {
                return {
                    error: true,
                };
            });
    };
}
