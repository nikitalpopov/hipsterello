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
                delete createdList.__v;

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
            .find({ _id: listObject._id })
            .then((foundList) => {
                if (listObject.title) foundList[0].title = listObject.title;
                if (listObject.color) foundList[0].color = listObject.color;

                return foundList[0]
                    .save()
                    .then((savedList) => {
                        delete savedList.__v;

                        return Board
                            .updateList(listObject.boardId, savedList)
                            .then((updatedList) => {
                                return updatedList;
                            })
                    });
            });
    };

    /**
     * @description Удаляем данные списка
     * @param listObject
     */
    static deleteList(listObject) {
        return ListModel
            .find({ _id: listObject._id })
            .then((foundList) => {
                return foundList[0]
                    .remove()
                    .then((removedList) => {
                        delete removedList.__v;

                        return Board
                            .deleteList(listObject.boardId, removedList)
                            .then((deletedList) => {
                                return deletedList;
                            })
                    });
            });
    };
}
