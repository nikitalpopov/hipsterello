/**
 * Created by @nikitalpopov on 07/07/2017.
 */

import axios from 'axios';

import { apiPrefix } from '../config.json'

export default {
    logInUser(data) {
        return axios.post(`${apiPrefix}/login`, data);
    },

    updateUser(data) {
        return axios.post(`${apiPrefix}/user/update`, data);
    },

    deleteUser(data) {
        return axios.post(`${apiPrefix}/user/delete`, data);
    },

    createBoard(data) {
        return axios.post(`${apiPrefix}/board/create`, data);
    },

    getBoardByUser(data) {
        return axios.get(`${apiPrefix}/board/user/` + data._id);
    },

    getBoard(id) {
        return axios.get(`${apiPrefix}/board/` + id);
    },

    updateBoard(data) {
        return axios.post(`${apiPrefix}/board/update`, data);
    },

    deleteBoard(data) {
        return axios.post(`${apiPrefix}/board/delete`, data);
    },

    createList(data) {
        return axios.post(`${apiPrefix}/list/create`, data);
    },

    // getLists(data) {
    //     return axios.post(`${apiPrefix}/lists`, data);
    // },

    getList(id) {
        return axios.get(`${apiPrefix}/list/` + id);
    },

    updateList(data) {
        return axios.post(`${apiPrefix}/list/update`, data);
    },

    deleteList(data) {
        return axios.post(`${apiPrefix}/list/delete`, data);
    },

    createCard(data) {
        return axios.post(`${apiPrefix}/card/create`, data);
    },

    // getCards(data) {
    //     return axios.post(`${apiPrefix}/cards`, data);
    // },

    getCard(id) {
        return axios.get(`${apiPrefix}/card/` + id);
    },

    updateCard(data) {
        return axios.post(`${apiPrefix}/card/update`, data);
    },

    deleteCard(data) {
        return axios.post(`${apiPrefix}/card/delete`, data);
    },
}

