import { useSelector } from 'react-redux';

import { RootState } from '../redux/store';

/**
 * It returns a sorted array of tasks, where the favorite tasks are at the top, and the rest of the
 * tasks are sorted by name
 * @returns a sorted array of tasks
 */
export const useSortedTasks = () => {
    const tasks = useSelector((state: Pick<RootState, 'tasks'>) => state.tasks);
    const { sortBy } = useSelector((state: Pick<RootState, 'sortBy'>) => state.sortBy);

    /* Sorting the tasks by the name property. */
    const sortByNameTasks = [...tasks].sort((a, b) => {
        /* sort by 'asc' and 'desc tasks name */
        if (sortBy === 'asc') {
            return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
    });

    /* Sorting the tasks by the favorite property. */
    return sortByNameTasks.sort((a, b) => {
        if (a.favorite && !b.favorite) {
            return -1;
        }
        if (!a.favorite && b.favorite) {
            return 1;
        }
        return 0;
    });
};
