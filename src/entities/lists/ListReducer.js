import { GET_INITIAL_DATA } from '../boards/BoardActions';
import { CREATE_LIST, GET_LIST, UPDATE_LIST, DELETE_LIST } from './ListActions';

export default function(state = [], action) {
    let copiedState = state.slice();

    switch (action.type) {
        case GET_INITIAL_DATA:
            return copiedState.concat(action.payload.data.lists);

        case CREATE_LIST:
            return ['listItem1'];

        case GET_LIST:
            copiedState.push('listItem4');

            return copiedState;

        case UPDATE_LIST:
            return state.slice();

        case DELETE_LIST:
            copiedState = copiedState.slice(0, 2);

            return copiedState;

        default:
            return state;
    }
}
