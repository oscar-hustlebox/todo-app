import { useState } from 'react';
import {
    Flex,
    Td,
    Text,
    Tr,
    Checkbox,
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { ExternalLinkIcon, DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons';

import { useDispatch } from 'react-redux';
import { TodoState, removeTodo, favoriteTodo, toggleTodoComplete } from '../../../redux/slices/todos/slice';
import { TodoForm } from '../../TodoForm/TodoForm';

type TodoListItemProps = { todo: TodoState };

export const TodoListItem = ({ todo }: TodoListItemProps) => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState<TodoState | null>();
    const { isOpen, onOpen, onClose } = useDisclosure();

    /* Checking if the selected todo is the same as the current todo. */
    const isSelected = selected?.id === todo.id;

    return (
        <>
            <Tr>
                <Td padding={2} overflow="hidden" wordBreak="break-word">
                    {selected?.id === todo.id ? (
                        <TodoForm todo={todo} handleCancel={() => setSelected(null)} />
                    ) : (
                        <Flex gap={4} alignItems="center">
                            <Checkbox
                                isChecked={todo.isComplete}
                                onChange={() => dispatch(toggleTodoComplete(todo.id))}
                                size="lg"
                                colorScheme="green"
                                padding={2}
                            />
                            <Flex gap={2} alignItems="center">
                                <Text
                                    {...(todo.isComplete
                                        ? { textDecorationColor: 'blackAlpha.500', textDecoration: 'line-through' }
                                        : {})}
                                >
                                    {todo.name}
                                </Text>
                                {todo?.description ? (
                                    <ExternalLinkIcon onClick={onOpen} _hover={{ cursor: 'pointer' }} />
                                ) : null}
                            </Flex>
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
                            colorScheme="teal"
                            aria-label="edit todo"
                            icon={<EditIcon />}
                            onClick={() => setSelected(todo)}
                            disabled={isSelected}
                        />
                    </Flex>
                </Td>
            </Tr>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{todo.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{todo?.description}</ModalBody>
                    <ModalFooter />
                </ModalContent>
            </Modal>
        </>
    );
};
