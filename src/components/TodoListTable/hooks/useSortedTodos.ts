import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';

/**
 * It returns a sorted array of todos, where the favorite todos are at the top, and the rest of the
 * todos are sorted by name
 * @returns a sorted array of todos
 */
export const useSortedTodos = () => {
    const todos = useSelector((state: Pick<RootState, 'todos'>) => state.todos);
    const { sortBy } = useSelector((state: Pick<RootState, 'sortBy'>) => state.sortBy);

    /* Sorting the todos by the name property. */
    const sortByNameTodos = [...todos].sort((a, b) => {
        /* sort by 'asc' and 'desc todos name */
        if (sortBy === 'asc') {
            return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
    });

    /* Sorting the todos by the favorite property. */
    return sortByNameTodos.sort((a, b) => {
        if (a.favorite && !b.favorite) {
            return -1;
        }
        if (!a.favorite && b.favorite) {
            return 1;
        }
        return 0;
    });
};
