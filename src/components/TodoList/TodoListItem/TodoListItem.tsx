import React from 'react';
import { Button, Flex, Heading, Link, Td, Text, Tr } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { TodoState, removeTodo } from '../../../redux/slices/todos/slice';

type TodoListItemProps = { todo: TodoState };

export const TodoListItem = ({ todo }: TodoListItemProps) => {
    const dispatch = useDispatch();

    return (
        <Tr>
            <Td padding={2} overflow="hidden" wordBreak="break-word">
                <Text
                    {...(todo.isComplete
                        ? { textDecorationColor: 'blackAlpha.500', textDecoration: 'line-through' }
                        : {})}
                >
                    {todo.name}
                </Text>
            </Td>
            <Td padding={2}>
                <Flex gap={2}>
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
                    <Button
                        backgroundColor="#FFF"
                        borderColor="green.500"
                        borderWidth={1}
                        _hover={{
                            backgroundColor: 'green.500',
                            color: '#FFF',
                        }}
                        color="green.500"
                        borderRadius={4}
                        width={{ sm: '100%', base: 'inherit', md: 'inherit' }}
                        onClick={() => console.log('selected')}
                    >
                        <Heading size="xs" textTransform="uppercase">
                            Update
                        </Heading>
                    </Button>
                </Flex>
            </Td>
        </Tr>
    );
};
