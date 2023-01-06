import { useState } from 'react';
import { TaskState, favoriteTask, removeTask } from '../../../redux/slices/tasks/slice';
import { useDispatch } from 'react-redux';
import { Box, Divider, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { TaskForm } from '../../TaskForm/TaskForm';
import { DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons';

type CardListItemProps = {
    card: TaskState;
    isDragging: boolean;
    isGroupedOver: boolean;
    provided: any;
};

export const CardListItem = ({ card, provided }: CardListItemProps) => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState<TaskState | null>();

    /* Checking if the selected task is the same as the current task. */
    const isSelected = selected?.id === card.id;

    return (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Box
                display="flex"
                flexDirection="column"
                p={4}
                m={2}
                maxWidth="32rem"
                bgColor="white"
                borderWidth={1}
                borderRadius={8}
                boxShadow="md"
            >
                {selected?.id === card.id ? (
                    <TaskForm task={card} handleCancel={() => setSelected(null)} />
                ) : (
                    <>
                        <Heading as="h5" fontSize="xs" fontWeight="medium" pb="2">
                            {card.name}
                        </Heading>
                        <Divider />
                        <Text fontSize="xs" pt="2">
                            {card.description}
                        </Text>
                    </>
                )}
                <Flex alignSelf="right" justifyContent="flex-end" gap={2} mt="4">
                    <IconButton
                        size="xs"
                        colorScheme={card.favorite ? 'yellow' : 'gray'}
                        aria-label="favorited task"
                        icon={<StarIcon />}
                        onClick={() => dispatch(favoriteTask(card.id))}
                        disabled={isSelected}
                    />
                    <IconButton
                        size="xs"
                        colorScheme="red"
                        aria-label="delete task"
                        icon={<DeleteIcon />}
                        onClick={() => dispatch(removeTask(card.id))}
                        disabled={isSelected}
                    />
                    <IconButton
                        size="xs"
                        colorScheme="teal"
                        aria-label="edit task"
                        icon={<EditIcon />}
                        onClick={() => setSelected(card)}
                        disabled={isSelected}
                    />
                </Flex>
            </Box>
        </div>
    );
};
