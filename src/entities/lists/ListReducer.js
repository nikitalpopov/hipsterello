import { CREATE_LIST, GET_LIST, UPDATE_LIST, DELETE_LIST } from './ListAction';

export default function(state = [], action) {
    let copiedState = state.slice();

    switch (action.type) {
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
