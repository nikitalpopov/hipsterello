import { GET_INITIAL_DATA } from '../boards/BoardActions';
import { CREATE_LIST, GET_LIST, UPDATE_LIST, DELETE_LIST } from './ListActions';

export default function(state = [], action) {
    let copiedState = state.slice();

    switch (action.type) {
        case GET_INITIAL_DATA:
            return copiedState.concat(action.payload.data.lists);

        case CREATE_LIST:
            copiedState.push(action.payload.data);

            return copiedState;

        case GET_LIST:
            copiedState.push(action.payload.data);

            return copiedState;

        case UPDATE_LIST:
            if (action.payload.data.isUpdated === true) {
                copiedState[copiedState.findIndex((obj) => obj._id === action.payload.data.list._id)] = action.payload.data.list;
            }

            return copiedState;

        case DELETE_LIST:
            if (action.payload.data.isDeleted === true) {
                copiedState = copiedState.filter((obj) => {
                    return obj._id !== action.payload.data.list._id;
                })
            }

            return copiedState;

        default:
            return state;
    }
}
