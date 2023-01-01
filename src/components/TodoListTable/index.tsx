import { useDispatch, useSelector } from 'react-redux';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';

import { RootState } from '../../redux/store';
import { sortByChanged } from '../../redux/slices/sortBy/slice';

import { TodoListItems } from './TodoListItems/TodoListItems';

export const TodoListTable = () => {
    const todos = useSelector((state: Pick<RootState, 'todos'>) => state.todos);
    const { sortBy } = useSelector((state: Pick<RootState, 'sortBy'>) => state.sortBy);
    const dispatch = useDispatch();

    /* Sorting the todos by the name property. */
    const sortByNameTodos = [...todos].sort((a, b) => {
        /* sort by 'asc' and 'desc todos name */
        if (sortBy === 'asc') {
            return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
    });

    /* Sorting the todos by the favorite property. */
    const sortedTodos = sortByNameTodos.sort((a, b) => {
        if (a.favorite && !b.favorite) {
            return -1;
        }
        if (!a.favorite && b.favorite) {
            return 1;
        }
        return 0;
    });

    return (
        <TableContainer border="1px" borderRadius={4} borderColor="gray.200" backgroundColor="#FFF">
            <Table variant="striped" backgroundColor="gray.200">
                <Thead>
                    <Tr>
                        <Th padding={2}>
                            <Flex flexDirection="row" flex="1" textAlign="left" alignItems="center">
                                <Text fontWeight="extrabold" casing="capitalize">
                                    Task
                                </Text>
                                {sortBy === 'desc' ? (
                                    <ChevronDownIcon fontSize="2xl" onClick={() => dispatch(sortByChanged('asc'))} />
                                ) : (
                                    <ChevronUpIcon fontSize="2xl" onClick={() => dispatch(sortByChanged('desc'))} />
                                )}
                            </Flex>
                        </Th>
                        <Th padding={2}>
                            <Text fontWeight="extrabold" casing="capitalize" textAlign="right">
                                Actions
                            </Text>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody background="#FFF">
                    <TodoListItems todos={sortedTodos} />
                </Tbody>
            </Table>
        </TableContainer>
    );
};
