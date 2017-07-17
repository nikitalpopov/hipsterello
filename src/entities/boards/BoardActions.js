/**
 * Created by @nikitalpopov on 11/07/2017.
 */

import api from '../../api/api.js'

export const GET_INITIAL_DATA = 'GET_INITIAL_DATA';
export const CREATE_BOARD     = 'CREATE_BOARD';
export const GET_BOARD        = 'GET_BOARD';
export const UPDATE_BOARD     = 'UPDATE_BOARD';
export const DELETE_BOARD     = 'DELETE_BOARD';

/**
* @description Отдаёт данные для запроса на создание доски
* @param request - объект с данными для создания новой доски
*/
export function createBoard(request) {
    return {
        type: CREATE_BOARD,
        payload: api.createBoard(request)
    }
}

/**
 * @description Отдаёт данные для запроса на получение доски
 * @param request – пользователь, для которого ищем доску
 */
export function getBoardByUser(request) {
    return {
        type: GET_BOARD,
        payload: api.getBoardByUser(request._id)
    }
}

/**
 * @description Отдаёт данные для запроса на получение доски
 * @param request – объект с _id необходимой доски внутри
 */
export function getBoard(request) {
    return {
        type: GET_BOARD,
        payload: api.getBoard(request._id)
    }
}

/**
 * @description Отдаёт данные для запроса на изменение доски
 * @param request - объект с данными для изменения доски
 * @returns {{type: string, payload: *}}
 */
export function updateBoard(request) {
    return {
        type: UPDATE_BOARD,
        payload: api.updateBoard(request)
    }
}

/**
 * @description Отдаёт данные для запроса на удаление доски
 * @param request - объект с данными для удаления доски
 */
export function deleteBoard(request) {
    return {
        type: DELETE_BOARD,
        payload: api.deleteBoard(request)
    }
}
