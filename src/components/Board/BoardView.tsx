import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Box, Heading, Divider, Text, Flex, IconButton } from '@chakra-ui/react';

import { reorder, columnCardMap, reorderCardMap } from '../../utils';
import { RootState } from '../../redux/store';
import { TopBar } from '../TopBar/TopBar';
import { BoardState, updateBoard } from '../../redux/slices/board/slice';
import { TaskState, favoriteTask, removeTask, updateTask } from '../../redux/slices/tasks/slice';
import { DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import { TaskForm } from '../TaskForm/TaskForm';

type CardListItemProps = {
    card: TaskState;
    isDragging: boolean;
    isGroupedOver: boolean;
    provided: any;
};

const CardListItem = ({ card, isDragging, isGroupedOver, provided }: CardListItemProps) => {
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
                maxWidth="32rem"
                borderWidth={1}
                margin={2}
                bgColor="white"
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

type InnerCardListProps = { cards: TaskState[] };

const InnerCardList = ({ cards }: InnerCardListProps) => {
    return (
        <>
            {cards?.map((card, index: number) => (
                <Draggable key={card.id} draggableId={card.id} index={index} shouldRespectForceTouch={false}>
                    {(dragProvided: any, dragSnapshot: any) => (
                        <CardListItem
                            card={card}
                            isDragging={dragSnapshot.isDragging}
                            isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                            provided={dragProvided}
                        />
                    )}
                </Draggable>
            ))}
        </>
    );
};

type InnerListProps = { cards: TaskState[]; dropProvided: any };

const InnerList = ({ cards, dropProvided }: InnerListProps) => {
    return (
        <div>
            <InnerCardList cards={cards} />
            <div ref={dropProvided.innerRef}>{dropProvided.placeholder}</div>
        </div>
    );
};

type CardListProps = {
    cards: TaskState[];
    ignoreContainerClipping?: boolean;
    internalScroll?: boolean;
    isDropDisabled?: boolean;
    isCombineEnabled?: boolean;
    listId?: string;
    listType?: string;
};

const CardList = ({
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
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '0.5rem',
                        border: '1rem ',
                        paddingBottom: 0,
                        transition: 'background-color 0.2s ease, opacity 0.1s ease',
                        userSelect: 'none',
                        width: '250px',
                    }}
                    {...dropProvided.droppableProps}
                >
                    {internalScroll ? (
                        <div
                            style={{
                                overflowX: 'hidden',
                                overflowY: 'auto',
                                maxHeight: '100%',
                            }}
                        >
                            <InnerList cards={cards} dropProvided={dropProvided} />
                        </div>
                    ) : (
                        <InnerList cards={cards} dropProvided={dropProvided} />
                    )}
                </div>
            )}
        </Droppable>
    );
};

type ColumnProps = {
    title: string;
    cards: TaskState[];
    index: number;
    isCombineEnabled: boolean;
};

const Column = ({ title, cards, index, isCombineEnabled }: ColumnProps) => (
    <Draggable draggableId={title} index={index}>
        {(provided: any) => {
            return (
                <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    display="flex"
                    flexDir="column"
                    margin={2}
                    bgColor="#F2F2F4"
                    borderRadius={8}
                    border="1px solid #E2E8F0"
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Heading
                            as="h4"
                            fontSize="md"
                            fontWeight="bold"
                            p="2"
                            ml="2"
                            {...provided.dragHandleProps}
                            style={{
                                display: 'flex',
                                transition: 'ease',
                                transitionDuration: '0.2s',
                                flexGrow: 1,
                                userSelect: 'none',
                                position: 'relative',
                            }}
                        >
                            {title}
                        </Heading>
                    </div>
                    <CardList listId={title} listType="CARD" cards={cards} isCombineEnabled={isCombineEnabled} />
                </Box>
            );
        }}
    </Draggable>
);

type BoardProps = { initialBoard: Record<string, TaskState[]> };

const Board = ({ initialBoard }: BoardProps) => {
    const [columns, setColumns] = useState<Record<string, TaskState[]>>();
    const [ordered, setOrdered] = useState<string[]>();
    const [newBoardState, setNewBoardState] = useState<BoardState[]>();
    const [newCardState, setNewCardState] = useState<Record<string, string>>();
    const [containerHeight] = useState<number>(500);
    const [isCombineEnabled] = useState<boolean>(false);

    const boardState = useSelector((state: RootState) => state.board);
    const dispatch = useDispatch();

    useEffect(() => {
        setColumns(initialBoard);
        setOrdered(Object.keys(initialBoard));
    }, [initialBoard]);

    useEffect(() => {
        if (newBoardState) {
            dispatch(updateBoard(newBoardState));
        }
    }, [newBoardState, dispatch]);

    useEffect(() => {
        if (newCardState) {
            dispatch(updateTask(newCardState));
        }
    }, [newCardState, dispatch]);

    const onDragEnd = (result: {
        source: { droppableId: string; index: number };
        destination: { droppableId: string; index: number };
        draggableId: string;
        type: string;
        combine: { draggableId: string; droppableId: string };
    }) => {
        if (result.combine) {
            if (result.type === 'COLUMN') {
                const shallow = [...(ordered as string[])];
                shallow.splice(result.source.index, 1);
                setOrdered(shallow);
                return;
            }

            const column = columns?.[result.source.droppableId];
            const withCardRemoved = [...(column || [])];
            withCardRemoved.splice(result.source.index, 1);
            const newColumns = {
                ...(columns || {}),
                [result.source.droppableId]: withCardRemoved,
            };
            setColumns(newColumns);
            return;
        }

        // dropped nowhere
        if (!result.destination) {
            return;
        }

        /* Getting the source of the draggable item. */
        const source = result.source;
        /* Getting the destination of the draggable item. */
        const destination = result.destination;

        // did not move anywhere - can bail early
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        // reordering column
        if (result.type === 'COLUMN') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            /* @ts-ignore to-fix */
            const newOrdered = reorder(ordered, source.index, destination.index); // eg. ['task', 'in-progress', 'done']
            /* Updating the board state with the new order of the columns. */
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            /* @ts-ignore to-fix */
            setNewBoardState(newOrdered?.map((name: string) => boardState?.find((item) => item.name === name)));
            setOrdered(newOrdered as string[]);
            return;
        }

        const data = reorderCardMap({
            cardMap: columns,
            source,
            destination,
        });

        const payload = {
            id: result.draggableId,
            boardID: boardState.find((b: BoardState) => b.name === destination.droppableId)?.id,
        } as Record<string, string>;

        setNewCardState(payload);

        setColumns(data.cardMap);
    };

    const board = (
        <Droppable
            droppableId="board"
            type="COLUMN"
            direction="horizontal"
            ignoreContainerClipping={Boolean(containerHeight)}
            isCombineEnabled={isCombineEnabled}
        >
            {(provided: any) => (
                <Box height="100vh" display="flex" ref={provided.innerRef} {...provided.droppableProps}>
                    {ordered?.map((key: string, index: number) => (
                        <Column
                            key={key}
                            index={index}
                            title={key}
                            cards={columns?.[key] as TaskState[]}
                            isCombineEnabled={isCombineEnabled}
                        />
                    ))}
                    {provided.placeholder}
                </Box>
            )}
        </Droppable>
    );

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                {containerHeight ? <Box height={containerHeight}>{board}</Box> : board}
            </DragDropContext>
        </>
    );
};

export const BoardView = () => {
    const board = useSelector((state: RootState) => state.board);
    const tasks = useSelector((state: RootState) => state.tasks);

    const initialBoard = columnCardMap(board, tasks);

    return (
        <>
            <TopBar />
            <Flex flexDir="column" padding={2} borderTop="1px" borderColor="gray.200" backgroundColor="white">
                <Board initialBoard={initialBoard} />
            </Flex>
        </>
    );
};
