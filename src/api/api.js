/**
 * Created by @nikitalpopov on 07/07/2017.
 */

import axios from 'axios';

import { apiPrefix } from '../config.json'

export default {
    logInUser(data) {
        return axios.post(`${apiPrefix}/login`, data);
    },

    getUser(id) {
        return axios.get(`${apiPrefix}/user/` + id);
    },

    // updateUser(data) {
    //     return axios.post(`${apiPrefix}/user/update`, data);
    // },

    // deleteUser(data) {
    //     return axios.post(`${apiPrefix}/user/delete`, data);
    // },

    // createBoard(data) {
    //     return axios.post(`${apiPrefix}/board/create`, data);
    // },

    getInitialData(id) {
        return axios.get(`${apiPrefix}/get-started/` + id);
    },

    getBoard(id) {
        return axios.get(`${apiPrefix}/board/` + id);
    },

    updateBoard(data) {
        return axios.patch(`${apiPrefix}/board/update`, data);
    },

    // deleteBoard(data) {
    //     return axios.post(`${apiPrefix}/board/delete`, data);
    // },

    createList(data) {
        return axios.post(`${apiPrefix}/list/create`, data);
    },

    // getList(id) {
    //     return axios.get(`${apiPrefix}/list/` + id);
    // },

    updateList(data) {
        return axios.patch(`${apiPrefix}/list/update`, data);
    },

    deleteList(data) {
        return axios.delete(`${apiPrefix}/list/delete`, data);
    },

    createCard(data) {
        return axios.post(`${apiPrefix}/card/create`, data);
    },

    // getCard(id) {
    //     return axios.get(`${apiPrefix}/card/` + id);
    // },

    updateCard(data) {
        return axios.patch(`${apiPrefix}/card/update`, data);
    },

    deleteCard(data) {
        return axios.delete(`${apiPrefix}/card/delete`, data);
    },
}

