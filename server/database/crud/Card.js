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
            text: cardObject.text
        });

        if (cardObject.color) CardModelInstance.color = cardObject.color;

        const ids = ({
            boardId: cardObject.boardId,
            listId: cardObject.listId
        });

        return CardModelInstance
            .save()
            .then((createdCard) => {
                delete createdCard.__v;

                return Board
                    .addCard(ids, createdCard)
                    .then(() => {
                        return createdCard;
                    });
            });
    };

    /**
     * @description Находим карточку по её id
     * @param cardId
     */
    static findCardById(cardId) {
        return CardModel
            .findById(
                cardId,
                ['_id', 'title', 'text', 'color']
            )
            .lean();
    };

    /**
     * @description Обновляем данные карточки
     * @param cardObject
     */
    static updateCard(cardObject) {
        return CardModel
            .find({ _id: cardObject._id })
            .then((foundCard) => {
                if (cardObject.title) foundCard[0].title = cardObject.title;
                if (cardObject.text) foundCard[0].text = cardObject.text;
                if (cardObject.color) foundCard[0].color = cardObject.color;

                const ids = ({
                    boardId: cardObject.boardId,
                    listId: cardObject.listId
                });

                return foundCard[0]
                    .save()
                    .then((savedCard) => {
                        delete savedCard.__v;

                        return Board
                            .updateCard(ids, savedCard)
                            .then((updatedCard) => {
                                return updatedCard;
                            })
                    });

            });
    };

    /**
     * @description Удаляем данные карточки
     * @param cardObject
     */
    static deleteCard(cardObject) {
        return CardModel
            .find({ _id: cardObject._id })
            .then((foundCard) => {
                const ids = ({
                    boardId: cardObject.boardId,
                    listId: cardObject.listId
                });

                return foundCard[0]
                    .remove()
                    .then((removedCard) => {
                        delete removedCard.__v;

                        return Board
                            .deleteList(ids, removedCard)
                            .then((deletedCard) => {
                                return deletedCard;
                            })
                    });
            });
    };
}