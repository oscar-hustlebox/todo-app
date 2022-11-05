import React from 'react';
import { Button, Heading, Link, Td, Tr } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { TodoState, removeTodo } from '../../../redux/slices/todos/slice';

type TodoListItemProps = { todo: TodoState };

/**
 * It takes an asset object and returns a table row with the asset's name, description, quantity,
 * status, and a button to remove the asset
 * @param TodoListItemProps - This is the type of the props that the component
 * will receive.
 * @returns A table row with the asset's name, description, quantity, status, and a button to remove
 * the asset.
 */
export const AssetListItem = ({ todo }: TodoListItemProps) => {
    const dispatch = useDispatch();

    return (
        <Tr>
            <Td padding={2} maxWidth="sm" overflow="hidden" wordBreak="break-word">
                <Link href="#nowhere" color="blue.500">
                    {todo.description}
                </Link>
            </Td>
            <Td padding={2} maxWidth="sm" overflow="hidden" wordBreak="break-word">
                {todo.isComplete}
            </Td>
            <Td padding={2}>
                <Button
                    backgroundColor="#FFF"
                    borderColor="red.500"
                    borderWidth={1}
                    _hover={{
                        backgroundColor: 'red.500',
                        color: '#FFF',
                    }}
                    color="red.500"
                    borderRadius={4}
                    width={{ sm: '100%', base: 'inherit', md: 'inherit' }}
                    onClick={() => dispatch(removeTodo(todo.id))}
                >
                    <Heading size="xs" textTransform="uppercase">
                        Remove
                    </Heading>
                </Button>
            </Td>
        </Tr>
    );
};
