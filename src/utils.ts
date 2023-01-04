/**
 * It takes a column and a list of cards and returns a list of cards that have the same boardID as the
 * column
 * @param column - the column object
 * @param cards - an array of objects that contain the boardID property
 */
const getByColumnName = (column: any, cards: any) => cards.filter((card: any) => card.boardID === column.id);

/**
 * It takes an array of columns and an array of cards and returns an object where the keys are the
 * column names and the values are the cards that belong to that column
 * @param columns - any[] - an array of columns
 * @param cards - an array of objects that represent cards
 * @returns An object with the column name as the key and the cards as the value.
 */
export const columnCardMap = (columns: any[], cards: any[]) => {
    return columns.reduce(
        (previousColumn: any, column: any) => ({
            ...previousColumn,
            [column.name]: getByColumnName(column, cards),
        }),
        {},
    );
};

/**
 * It takes a list, removes an item from the list at a given index, and then inserts that item at a
 * given index
 * @param list - The list of items to be reordered.
 * @param startIndex - The index of the item you're dragging
 * @param endIndex - The index of the item that was dragged to.
 * @returns An array with the item at startIndex removed and inserted at endIndex.
 */
export const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * It takes a cardMap, source and destination and returns a new cardMap with the card moved from source
 * to destination
 * @param cardMap - the current state of the cardMap
 */
export const reorderCardMap = ({ cardMap, source, destination }: any) => {
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
