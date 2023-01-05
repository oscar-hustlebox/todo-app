import { Draggable } from 'react-beautiful-dnd';
import { TaskState } from '../../../redux/slices/tasks/slice';
import { Box, Heading } from '@chakra-ui/react';
import { CardList } from './CardList';

type ColumnProps = {
    title: string;
    cards: TaskState[];
    index: number;
    isCombineEnabled: boolean;
};

export const Column = ({ title, cards, index, isCombineEnabled }: ColumnProps) => (
    <Draggable draggableId={title} index={index}>
        {(provided: any) => (
            <Box
                ref={provided.innerRef}
                {...provided.draggableProps}
                display="flex"
                flexDirection="column"
                m={2}
                bgColor="#F2F2F4"
                border="1px solid #E2E8F0"
                borderRadius={8}
            >
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Heading
                        as="h4"
                        display="flex"
                        flexGrow={1}
                        p="2"
                        ml="2"
                        fontSize="md"
                        fontWeight="bold"
                        position="relative"
                        userSelect="none"
                        {...provided.dragHandleProps}
                    >
                        {title}
                    </Heading>
                </Box>
                <CardList listId={title} listType="CARD" cards={cards} isCombineEnabled={isCombineEnabled} />
            </Box>
        )}
    </Draggable>
);
