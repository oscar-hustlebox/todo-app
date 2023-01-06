import { BoardState } from './redux/slices/board/slice';
import { TaskState } from './redux/slices/tasks/slice';

/**
 * It takes a column and a list of cards and returns a list of cards that belong to that column
 * @param column - an object that contains the id property
 * @param cards - an array of objects that contain the boardID property
 * @returns An array of cards that belong to the column
 */
const getByColumnName = (column: BoardState, cards: TaskState[]) => cards.filter((card) => card.boardID === column.id);

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
 *  'To Do': [{id: 1, boardID: 1}],
 * 'In Progress': [{id: 2, boardID: 2}],
 * 'Done': [{id: 3, boardID: 3}]
 * }
 */
export const columnCardMap = (columns: BoardState[], cards: TaskState[]) => {
    return columns?.reduce(
        (previousColumn, column) => ({
            ...previousColumn,
            [column.name]: getByColumnName(column, cards),
        }),
        {},
    );
};

/**
 * It takes a list, removes an item from the list at a given index, and then inserts that item at a
 * given index
 * @param {string[]} list - The list of items to be reordered.
 * @param {number} startIndex - The index of the item you're dragging.
 * @param {number} endIndex - The index of the item that was dragged to.
 * @returns A function that takes in a list, startIndex, and endIndex and returns a new array with the
 * item at startIndex moved to endIndex.
 */
export const reorder = (list: string[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * It takes in a cardMap, source and destination and returns a new cardMap with the card at the source
 * index moved to the destination index
 */
export const reorderCardMap = ({
    cardMap,
    source,
    destination,
}: {
    cardMap: any;
    source: { droppableId: string; index: number };
    destination: { droppableId: string; index: number };
}) => {
    const current = [...cardMap[source.droppableId]];
    const next = [...cardMap[destination.droppableId]];
    const target = current[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(current, source.index, destination.index);
        const result = {
            ...cardMap,
            [source.droppableId]: reordered,
        };
        return {
            cardMap: result,
        };
    }

    // moving to different list

    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);

    const result = {
        ...cardMap,
        [source.droppableId]: current,
        [destination.droppableId]: next,
    };

    return {
        cardMap: result,
    };
};
