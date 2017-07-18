import { GET_INITIAL_DATA } from '../boards/BoardActions';
import { CREATE_LIST, GET_LIST, UPDATE_LIST, DELETE_LIST } from './ListActions';

export default function(state = [], action) {
    let copiedState = state.slice();

    switch (action.type) {
        case GET_INITIAL_DATA:
            // @todo add list with _id === 0
            return copiedState.concat(action.payload.data.lists);

        case CREATE_LIST:
            return copiedState.push(action.payload.data);

        case GET_LIST:
            return copiedState.push(action.payload.data);

        case UPDATE_LIST:
            copiedState[copiedState.findIndex((obj) => obj._id === action.payload.data._id)] = action.payload.data;

            return copiedState;

        case DELETE_LIST:
            let index = -1;
            index = copiedState.indexOf(action.payload.data);

            if (~index) { copiedState.splice(index, 1) }

            return copiedState;

        default:
            return state;
    }
}
