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
                    .then(() => { return createdList })
                    .catch(console.log.bind(console));
            })
            .catch(console.log.bind(console));
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
            .lean()
            .catch(console.log.bind(console));
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
                                return {
                                    list: savedList,
                                    isUpdated: true
                                }
                            })
                            .catch(console.log.bind(console));
                    })
                    .catch(console.log.bind(console));
            })
            .catch(console.log.bind(console));
    };

    /**
     * @description Удаляем данные списка
     * @param listObject
     */
    static deleteList(listObject) {
        return ListModel
            .findById(listObject._id)
            .then((foundList) => {
                return foundList
                    .remove()
                    .catch(console.log.bind(console));
            })
            .then((removedList) => {
                return Board
                    .deleteList(listObject.boardId, removedList)
                    .then((deletedList) => { return deletedList })
                    .catch(console.log.bind(console));
            })
            .then((deletedList) => {
                return {
                    list: deletedList,
                    isDeleted: true
                };
            })
            .catch(console.log.bind(console));
    };
}
