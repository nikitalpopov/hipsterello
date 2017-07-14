import { CREATE_LIST, DELETE_LIST, UPDATE_LIST } from './ListAction';

export default function(state = [], action) {
  switch (action.type) {
    case CREATE_LIST:
      return ['a'];
    case DELETE_LIST:
      let copiedState = state.slice();
      return copiedState.slice(0, 2);
    case UPDATE_LIST:
      return state.slice();
    default:
      return state;
  }
}
