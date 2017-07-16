/**
 * Created by @nikitalpopov on 13/07/2017.
 */
import { Card as CardModel } from '../entities/card/Card';
import List from './List';

export default class Card {
    /**
     * @description Создаем карточку, привязываем её к списку
     * @param cardData
     * @param listId
     */
    static createCard(cardData, listId) {
        const CardModelInstance = new CardModel({
            title: cardData.title
        });

        if (cardData.color) { CardModelInstance.color = cardData.color; }

        return CardModelInstance.save()
            .then((createdCard) => {
                return List.updateCards(listId, createdCard._id);
            })
            .then((result) => {
                return result;
        });
    };

    /**
     * @description Находим карточку по её id
     * @param cardId
     */
    static findCardById(cardId) {
        return CardModel.findById(cardId);
    };

    /**
     * @description Обновляем данные карточки
     * @param cardData
     */
    static updateCard(cardData) {
        return CardModel
            .find({ _id: cardData._id })
            .then((foundCard) => {
                console.log(cardData);
                console.log(foundCard[0]);
                if (cardData.title) { foundCard[0].title = cardData.title; }
                if (cardData.text) { foundCard[0].text = cardData.text; }
                if (cardData.color) { foundCard[0].color = cardData.color; }
                console.log(foundCard[0]);
                return foundCard[0].save(); })
            .then((savedResult) => {
                return savedResult;
        });
    };

    /**
     * @description Удаляем данные карточки
     * @param cardData
     */
    static deleteCard(cardData) {
        return CardModel
            .find({ _id: cardData._id })
            .then((foundCard) => {
                return foundCard[0].remove();
            })
            .then((deletedResult) => {
                return deletedResult;
        });
    };
}