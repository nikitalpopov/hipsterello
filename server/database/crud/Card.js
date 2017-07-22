/**
 * Created by @nikitalpopov on 13/07/2017.
 */

import { Card as CardModel } from '../entities/card/Card';
import Board from './Board';

export default class Card {
    /**
     * @description Создаем карточку, привязываем её к списку
     * @param cardObject
     */
    static createCard(cardObject) {
        const CardModelInstance = new CardModel({
            title: cardObject.title,
            text: cardObject.text,
            listId: cardObject.listId
        });

        if (cardObject.color) CardModelInstance.color = cardObject.color;

        return CardModelInstance
            .save()
            .then((createdCard) => {
                return Board
                    .addCard(cardObject.boardId, createdCard)
                    .then(() => {
                        return createdCard;
                    })
                    .catch(console.log.bind(console));
            })
            .catch(console.log.bind(console));
    };

    /**
     * @description Находим карточку по её id
     * @param cardId
     */
    static findCardById(cardId) {
        return CardModel
            .findById(
                cardId,
                ['_id', 'title', 'text', 'color', 'listId']
            )
            .lean();
    };

    /**
     * @description Обновляем данные карточки
     * @param cardObject
     */
    static updateCard(cardObject) {
        return CardModel
            .findById(cardObject._id)
            .then((foundCard) => {
                if (cardObject.title) foundCard.title = cardObject.title;
                if (cardObject.text) foundCard.text = cardObject.text;
                if (cardObject.color) foundCard.color = cardObject.color;
                if (cardObject.listId) foundCard.listId = cardObject.listId;

                return foundCard
                    .save()
                    .then((savedCard) => {
                        return Board
                            .updateCard(cardObject.boardId, savedCard)
                            .then(() => {
                                return savedCard;
                            })
                            .catch(console.log.bind(console));
                    })
                    .catch(console.log.bind(console));
            })
            .catch(console.log.bind(console));
    };

    /**
     * @description Удаляем данные карточки
     * @param cardObject
     */
    static deleteCard(cardObject) {
        return CardModel
            .findById(cardObject._id)
            .then((foundCard) => {
                return foundCard.remove();
            })
            .then((removedCard) => {
                return Board.deleteCard(cardObject.boardId, removedCard)
            }).then(() => {
                return {
                    success: true
                };
            })
            .catch(console.log.bind(console));
    };
}
