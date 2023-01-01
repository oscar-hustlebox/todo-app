import React, { useState } from 'react';
import { Flex, Td, Text, Tr, Checkbox, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { TodoState, removeTodo, favoriteTodo, toggleTodoComplete } from '../../../redux/slices/todos/slice';
import { TodoForm } from '../../TodoForm/TodoForm';

type TodoListItemProps = { todo: TodoState };

export const TodoListItem = ({ todo }: TodoListItemProps) => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState<TodoState | null>();

    /* Checking if the selected todo is the same as the current todo. */
    const isSelected = selected?.id === todo.id;

    return (
        <Tr>
            <Td padding={2} overflow="hidden" wordBreak="break-word">
                {selected?.id === todo.id ? (
                    <TodoForm todo={todo} handleCancel={() => setSelected(null)} />
                ) : (
                    <Flex gap={4}>
                        <Checkbox
                            isChecked={todo.isComplete}
                            onChange={() => dispatch(toggleTodoComplete(todo.id))}
                            size="lg"
                            width={'full'}
                            colorScheme="green"
                            padding={2}
                        >
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
                    <IconButton
                        colorScheme={todo.favorite ? 'yellow' : 'gray'}
                        aria-label="favourited todo"
                        icon={<StarIcon />}
                        onClick={() => dispatch(favoriteTodo(todo.id))}
                        disabled={isSelected}
                    />
                    <IconButton
                        colorScheme="red"
                        aria-label="delete todo"
                        icon={<DeleteIcon />}
                        onClick={() => dispatch(removeTodo(todo.id))}
                        disabled={isSelected}
                    />
                    <IconButton
                        colorScheme="gray"
                        aria-label="edit todo"
                        icon={<EditIcon />}
                        onClick={() => setSelected(todo)}
                        disabled={isSelected}
                    />
                </Flex>
            </Td>
        </Tr>
    );
};
