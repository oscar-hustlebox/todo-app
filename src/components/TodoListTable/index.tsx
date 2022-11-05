import React from 'react';
import { TodoListItems } from './TodoListItems/TodoListItems';
import { Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const TodoListTable = () => {
    const todos = useSelector((state: RootState) => state.todos);
    return (
        <TableContainer border="1px" borderRadius={4} borderColor="gray.200" backgroundColor="#FFF">
            <Table variant="striped" backgroundColor="gray.200">
                <Thead>
                    <Tr>
                        <Th padding={2}>
                            <Text fontWeight="extrabold" casing="capitalize">
                                Task
                            </Text>
                        </Th>
                        <Th padding={2}>
                            <Text fontWeight="extrabold" casing="capitalize" textAlign="right">
                                Actions
                            </Text>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody background="#FFF">
                    <TodoListItems todos={todos} />
                </Tbody>
            </Table>
        </TableContainer>
    );
};
