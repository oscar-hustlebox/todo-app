import React, { useState } from 'react';
import { Button, Flex, Heading, Td, Text, Tr, Checkbox } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { TodoState, removeTodo, toggleTodoComplete } from '../../../redux/slices/todos/slice';
import { TodoForm } from '../../TodoForm/TodoForm';

type TodoListItemProps = { todo: TodoState };

export const TodoListItem = ({ todo }: TodoListItemProps) => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState<TodoState | null>();

    return (
        <Tr>
            <Td padding={2} overflow="hidden" wordBreak="break-word">
                {selected?.id === todo.id ? (
                    <TodoForm todo={todo} handleCancel={() => setSelected(null)} />
                ) : (
                    <Flex gap={4}>
                        <Checkbox isChecked={todo.isComplete} onChange={() => dispatch(toggleTodoComplete(todo.id))}>
                            <Text
                                {...(todo.isComplete
                                    ? { textDecorationColor: 'blackAlpha.500', textDecoration: 'line-through' }
                                    : {})}
                            >
                                {todo.name}
                            </Text>
                        </Checkbox>
                    </Flex>
                )}
            </Td>
            <Td padding={2}>
                <Flex alignSelf="right" justifyContent="flex-end" gap={2}>
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
                        disabled={selected?.id === todo.id}
                    >
                        <Heading size="xs" textTransform="uppercase">
                            Delete
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
                        onClick={() => setSelected(todo)}
                        disabled={selected?.id === todo.id}
                    >
                        <Heading size="xs" textTransform="uppercase">
                            Edit
                        </Heading>
                    </Button>
                </Flex>
            </Td>
        </Tr>
    );
};
