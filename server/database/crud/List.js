import { List as ListModel } from '../entities/list/List';
import Board from './Board';

export default class List {
    /**
    * @description Создаем список, привязываем его к доске
    * @param listData
    */
    static createList(listData) {
        const ListModelInstance = new ListModel({
            title: listData.title
        });

        if (listData.color) { ListModelInstance.color = listData.color; }

        return ListModelInstance.save()
            .then((createdList) => {
                Board.updateLists(listData.boardId, createdList);
                return createdList;
        });
    };

    /**
     * @description Находим список по его id
     * @param listId
     */
    static findListById(listId) {
        return ListModel.findById(listId);
    };

    /**
     * @description Обновляем данные списка
     * @param listData
     */
    static updateList(listData) {
        return ListModel
            .find({ _id: listData._id })
            .then((foundList) => {
                if (listData.title) { foundList[0].title = listData.title; }
                if (listData.color) { foundList[0].color = listData.color; }
                if (listData.cards) {
                    for (const card of listData.cards) {
                        foundList[0].cards.push(card);
                    }
                }
                return foundList[0].save(); })
            .then((savedResult) => {
                return savedResult;
        });
    };

    /**
     * @description Обновляем данные о привязанных к списку карточках
     * @param listId
     * @param card
     */
    static updateCards(listId, card) {
        return ListModel
            .find({ _id: listId })
            .then((foundList) => {
                foundList[0].cards.push(card);
                return foundList[0].save(); })
            .then((savedResult) => {
                return savedResult;
        });
    };

    /**
     * @description Удаляем данные списка
     * @param listData
     */
    static deleteList(listData) {
        return ListModel
            .find({ _id: listData._id })
            .then((foundList) => {
                return foundList[0].remove();
            })
            .then((deletedResult) => {
                return deletedResult;
        });
    };
}
