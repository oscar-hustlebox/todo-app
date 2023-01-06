import { TaskState } from './redux/slices/tasks/slice';
import { columnCardMap, reorder } from './utils';

/**
 * It takes a list of columns and a list of cards and returns a map of columns and cards
 * @param columns - an array of objects that contain the name property
 * @param cards - an array of objects that contain the boardID property
 * @returns An object with the column name as the key and an array of cards as the value
 * @example
 * const columns = [{id: 1, name: 'To Do'}, {id: 2, name: 'In Progress'}, {id: 3, name: 'Done'}]
 * const cards = [{id: 1, boardID: 1}, {id: 2, boardID: 2}, {id: 3, boardID: 3}]
 * const result = columnCardMap(columns, cards)
 * result = {
 * 'To Do': [{id: 1, boardID: 1}],
 * 'In Progress': [{id: 2, boardID: 2}],
 * 'Done': [{id: 3, boardID: 3}]
 * }
 */
describe('columnCardMap', () => {
    it('should return an object with the column names as keys and the cards as values', () => {
        const columns = [
            { id: '1', name: 'todo' },
            { id: '2', name: 'in-progress' },
            { id: '3', name: 'done' },
        ];
        const cards: TaskState[] = [
            { id: '1', name: 'task1', boardID: '1', favorite: false, isComplete: false },
            { id: '2', name: 'task2', boardID: '2', favorite: false, isComplete: false },
            { id: '3', name: 'task3', boardID: '3', favorite: false, isComplete: false },
        ];
        const result = columnCardMap(columns, cards);
        expect(result).toEqual({
            done: [
                {
                    boardID: '3',
                    favorite: false,
                    id: '3',
                    isComplete: false,
                    name: 'task3',
                },
            ],
            'in-progress': [
                {
                    boardID: '2',
                    favorite: false,
                    id: '2',
                    isComplete: false,
                    name: 'task2',
                },
            ],
            todo: [
                {
                    boardID: '1',
                    favorite: false,
                    id: '1',
                    isComplete: false,
                    name: 'task1',
                },
            ],
        });
    });
});

/**
 * It takes a list, removes an item from the list at a given index, and then inserts that item at a
 * given index
 * @param {string[]} list - The list of items to be reordered.
 * @param {number} startIndex - The index of the item you're dragging.
 * @param {number} endIndex - The index of the item that was dragged to.
 * @returns A function that takes in a list, startIndex, and endIndex and returns a new array with the
 * item at startIndex moved to endIndex.
 */
describe('reorder', () => {
    it('should return a new array with the item at startIndex moved to endIndex', () => {
        const list = ['a', 'b', 'c', 'd'];
        const startIndex = 1;
        const endIndex = 3;
        const result = reorder(list, startIndex, endIndex);
        expect(result).toEqual(['a', 'c', 'd', 'b']);
    });
});
