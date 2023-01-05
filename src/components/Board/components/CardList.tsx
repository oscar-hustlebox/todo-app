import { Droppable } from 'react-beautiful-dnd';
import { TaskState } from '../../../redux/slices/tasks/slice';
import { InnerList } from './InnerList';
import { Box } from '@chakra-ui/react';

type CardListProps = {
    cards: TaskState[];
    ignoreContainerClipping?: boolean;
    internalScroll?: boolean;
    isDropDisabled?: boolean;
    isCombineEnabled?: boolean;
    listId?: string;
    listType?: string;
};

export const CardList = ({
    cards,
    ignoreContainerClipping,
    internalScroll,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
}: CardListProps) => {
    return (
        <Droppable
            droppableId={listId}
            type={listType}
            ignoreContainerClipping={ignoreContainerClipping}
            isDropDisabled={isDropDisabled}
            isCombineEnabled={isCombineEnabled}
        >
            {(dropProvided: any) => (
                <Box
                    display="flex"
                    flexDirection="column"
                    width="250px"
                    pt="0.5rem"
                    px="0.5rem"
                    border="1rem "
                    transition="background-color 0.2s ease, opacity 0.1s ease"
                    userSelect="none"
                    {...dropProvided.droppableProps}
                >
                    {internalScroll ? (
                        <Box overflowX="hidden" overflowY="auto" maxHeight="100%">
                            <InnerList cards={cards} dropProvided={dropProvided} />
                        </Box>
                    ) : (
                        <InnerList cards={cards} dropProvided={dropProvided} />
                    )}
                </Box>
            )}
        </Droppable>
    );
};
