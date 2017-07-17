/**
 * Created by @nikitalpopov on 14/07/2017.
 */

import api from '../../api/api.js'

export const GET_INITIAL_DATA = 'GET_INITIAL_DATA';
export const CREATE_CARD      = 'CREATE_CARD';
export const GET_CARD         = 'GET_CARD';
export const UPDATE_CARD      = 'UPDATE_CARD';
export const DELETE_CARD      = 'DELETE_CARD';

/**
 * @description Отдаёт данные для запроса на создание карточки
 * @param request - объект с данными для создания новой карточки
 */
export function createCard(request) {
    return {
        type: CREATE_CARD,
        payload: api.createCard(request)
    }
}

/**
 * @description Отдаёт данные для запроса на получение карточки
 * @param request – объект с _id необходимой карточки внутри
 */
export function getCard(request) {
    return {
        type: GET_CARD,
        payload: api.getCard(request._id)
    }
}

/**
 * @description Отдаёт данные для запроса на изменение карточки
 * @param request - объект с данными для изменения карточки
 * @returns {{type: string, payload: *}}
 */
export function updateCard(request) {
    return {
        type: UPDATE_CARD,
        payload: api.updateCard(request)
    }
}

/**
 * @description Отдаёт данные для запроса на удаление карточки
 * @param request - объект с данными для удаления карточки
 */
export function deleteCard(request) {
    return {
        type: DELETE_CARD,
        payload: api.deleteCard(request)
    }
}