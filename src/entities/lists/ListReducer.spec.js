import ListReducer from './ListReducer';
import { CREATE_LIST, GET_LIST, UPDATE_LIST, DELETE_LIST } from './ListAction';

describe('ListReducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = ['listItem1', 'listItem2', 'listItem3'];
    });

    it('should return empty array in case of undefined', () => {
        const action = {
            type: undefined
        };

        expect(ListReducer(undefined, action)).toEqual([]);
    });

    it('should return array with 1 listItem in case of ' + CREATE_LIST, () => {
        const action = {
            type: CREATE_LIST
        };

        expect(ListReducer(undefined, action)).toHaveLength(1);
    });

    it('should return array with 1 listItem in case of ' + GET_LIST, () => {
        const action = {
            type: GET_LIST
        };

        expect(ListReducer(initialState, action)).toHaveLength(4);
    });

    it('should return array with 3 listItems in case of ' + UPDATE_LIST, () => {
        const action = {
            type: UPDATE_LIST
        };

        expect(ListReducer(initialState, action)).toHaveLength(3);
    });

    it('should return array with 2 listItems in case of ' + DELETE_LIST, () => {
        const action = {
            type: DELETE_LIST
        };

        expect(ListReducer(initialState, action)).toHaveLength(2);
    });
});
