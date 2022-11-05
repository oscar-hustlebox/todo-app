import React from 'react';
import { RootState } from '../../../redux/store';
import { AssetListItem } from '../AssetListItem/AssetListItem';
import { useSelector } from 'react-redux';
import { Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';

export const AssetListItems = () => {
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
                            <Text fontWeight="extrabold" casing="capitalize">
                                Done?
                            </Text>
                        </Th>
                        <Th padding={2}>
                            <Text fontWeight="extrabold" casing="capitalize">
                                Actions
                            </Text>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody background="#FFF">
                    {todos.map((todo) => (
                        <AssetListItem key={todo.id} todo={todo} />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
