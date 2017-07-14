import ListReducer from './ListReducer';
import { CREATE_LIST, DELETE_LIST, UPDATE_LIST } from './ListAction';

describe('ListReducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = ['element1', 'element2', 'element3'];
  });

  it('should return empty array', () => {
    const action = {
      type: undefined
    };
    expect(ListReducer(undefined, action)).toEqual([]);
  });

  it('should return array with 1 element', () => {
    const action = {
      type: CREATE_LIST
    };

    expect(ListReducer(undefined, action)).toHaveLength(1);
  });

  it('should return array with 2 elements', () => {
    const action = {
      type: DELETE_LIST
    };

    expect(ListReducer(initialState, action)).toHaveLength(2);
  });

  it('should return array with 3 elements', () => {
    const action = {
      type: UPDATE_LIST
    };

    expect(ListReducer(initialState, action)).toHaveLength(3);
  })

});
