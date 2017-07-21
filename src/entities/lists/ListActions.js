import api from '../../api/api.js'

export const CREATE_LIST      = 'CREATE_LIST';
export const GET_LIST         = 'GET_LIST';
export const UPDATE_LIST      = 'UPDATE_LIST';
export const DELETE_LIST      = 'DELETE_LIST';

/**
 * @description Отдаёт данные для запроса на создание списка
 * @param request - объект с данными для создания нового списка
 */
export function createList(request) {
    return {
        type: CREATE_LIST,
        payload: api.createList(request)
    }
}

/**
 * @description Отдаёт данные для запроса на получение списка
 * @param request – объект с _id необходимого списка внутри
 */
export function getList(request) {
    return {
        type: GET_LIST,
        payload: api.getList(request._id)
    }
}

/**
 * @description Отдаёт данные для запроса на изменение списка
 * @param request - объект с данными для изменения списка
 */
export function updateList(request) {
    return {
        type: UPDATE_LIST,
        payload: api.updateList(request)
    }
}

/**
 * @description Отдаёт данные для запроса на удаление списка
 * @param request - объект с данными для удаления списка
 */
export function deleteList(request) {
    return {
        type: DELETE_LIST,
        payload: api.deleteList(request)
    }
}