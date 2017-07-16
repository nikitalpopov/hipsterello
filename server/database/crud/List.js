import { List as ListModel } from '../entities/list/List';
import Board from './Board';

export default class List {
    /**
    * @description Создаем список, привязываем его к доске
    * @param listData
    * @param boardId
    */
    static createList(listData, boardId) {
        const ListModelInstance = new ListModel({
            title: listData.title
        });

        if (listData.color) { ListModelInstance.color = listData.color; }

        return ListModelInstance.save()
            .then((createdList) => {
                return Board.updateLists(boardId, createdList._id);
            })
            .then((result) => {
                return result;
        });
    };

    /**
     * @description Находим список по его id
     * @param listId
     */
    static findListById(listId) {
        return ListModel.find(listId);
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
                if (listData.cardsId) {
                    for (const cardId of listData.cardsId) {
                        foundList[0].cardsId.push(cardId);
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
     * @param cardId
     */
    static updateCards(listId, cardId) {
        return ListModel
            .find({ _id: listId })
            .then((foundList) => {
                foundList[0].cardsId.push(cardId);
                return foundList[0].save(); })
            .then((savedResult) => {
                return savedResult.listsId;
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
