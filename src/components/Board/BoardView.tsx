import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Box, Heading, Divider, Text, Flex, IconButton } from '@chakra-ui/react';

import reorder, { columnCardMap, reorderCardMap } from '../../utils';
import { RootState } from '../../redux/store';
import { TopBar } from '../TopBar/TopBar';
import { AddTodo } from '../AddTodo/AddTodo';
import { updateBoard } from '../../redux/slices/board/slice';
import { TodoState, favoriteTodo, removeTodo, updateTodo } from '../../redux/slices/todos/slice';
import { DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import { TodoForm } from '../TodoForm/TodoForm';
import { TodoFormCard } from '../TodoForm/TodoFormCard';

const CardListItem = ({ card, isDragging, isGroupedOver, provided }: any) => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState<TodoState | null>();

    /* Checking if the selected todo is the same as the current todo. */
    const isSelected = selected?.id === card.id;

    return (
        <div
            isDragging={isDragging}
            isGroupedOver={isGroupedOver}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
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
                    <TodoFormCard todo={card} handleCancel={() => setSelected(null)} />
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
                <Divider />
                <Flex alignSelf="right" justifyContent="flex-end" gap={2} mt="4">
                    <IconButton
                        size="xs"
                        colorScheme={card.favorite ? 'yellow' : 'gray'}
                        aria-label="favorited todo"
                        icon={<StarIcon />}
                        onClick={() => dispatch(favoriteTodo(card.id))}
                        disabled={isSelected}
                    />
                    <IconButton
                        size="xs"
                        colorScheme="red"
                        aria-label="delete todo"
                        icon={<DeleteIcon />}
                        onClick={() => dispatch(removeTodo(card.id))}
                        disabled={isSelected}
                    />
                    <IconButton
                        size="xs"
                        colorScheme="teal"
                        aria-label="edit todo"
                        icon={<EditIcon />}
                        onClick={() => setSelected(card)}
                        disabled={isSelected}
                    />
                </Flex>
            </Box>
        </div>
    );
};

const InnerCardList = ({ cards }: any) => {
    return cards?.map((card: any, index: any) => (
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
    ));
};

const InnerList = ({ cards, dropProvided, title }: any) => {
    return (
        <div>
            {title}
            <div>
                <InnerCardList cards={cards} />
                <div ref={dropProvided.innerRef}>{dropProvided.placeholder}</div>
            </div>
        </div>
    );
};

const CardList = ({
    ignoreContainerClipping,
    internalScroll,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
    cards,
    title,
}: any) => {
    return (
        <Droppable
            droppableId={listId}
            type={listType}
            ignoreContainerClipping={ignoreContainerClipping}
            isDropDisabled={isDropDisabled}
            isCombineEnabled={isCombineEnabled}
        >
            {(dropProvided: any, dropSnapshot: any) => (
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
                    isDraggingOver={dropSnapshot.isDraggingOver}
                    isDropDisabled={isDropDisabled}
                    isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
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
                            <InnerList cards={cards} title={title} dropProvided={dropProvided} />
                        </div>
                    ) : (
                        <InnerList cards={cards} title={title} dropProvided={dropProvided} />
                    )}
                </div>
            )}
        </Droppable>
    );
};

const Column = ({ title, cards, index, isCombineEnabled }: any) => (
    <Draggable draggableId={title} index={index}>
        {(provided: any, snapshot: any) => (
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
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    /* @ts-ignore */
                    isDragging={snapshot.isDragging}
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
                        isDragging={snapshot.isDragging}
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
                <CardList
                    listId={title}
                    listType="CARD"
                    style={{
                        backgroundColor: snapshot.isDragging ? 'gray' : null,
                    }}
                    cards={cards}
                    isCombineEnabled={isCombineEnabled}
                />
            </Box>
        )}
    </Draggable>
);

const Board = ({ initialBoard }: any) => {
    const [columns, setColumns] = useState<any>();
    const [ordered, setOrdered] = useState<any>();
    const [newBoardState, setNewBoardState] = useState<any>();
    const [newCardState, setNewCardState] = useState<any>();
    const [containerHeight] = useState<any>(500);
    const [isCombineEnabled] = useState<boolean>(false);

    const boardState = useSelector((state: Pick<RootState, 'board'>) => state.board);
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
            dispatch(updateTodo(newCardState));
        }
    }, [newCardState, dispatch]);

    const onDragEnd = (result: any) => {
        if (result.combine) {
            if (result.type === 'COLUMN') {
                const shallow = [...ordered];
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
            const newOrdered = reorder(ordered, source.index, destination.index); // eg. ['todo', 'in-progress', 'done']
            /* Updating the board state with the new order of the columns. */
            setNewBoardState(newOrdered?.map((name: any) => boardState.find((item: any) => item.name === name)));
            setOrdered(newOrdered);
            return;
        }

        const data = reorderCardMap({
            cardMap: columns,
            source,
            destination,
        });

        const payload = {
            id: result.draggableId,
            boardID: boardState.find((b: any) => b.name === destination.droppableId)?.id,
        };

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
                    {ordered?.map((key: any, index: any) => (
                        <Column
                            key={key}
                            index={index}
                            title={key}
                            cards={columns?.[key]}
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
    const board = useSelector((state: Pick<RootState, 'board'>) => state.board);
    const todos = useSelector((state: Pick<RootState, 'todos'>) => state.todos);

    const initialBoard = columnCardMap(board, todos);

    return (
        <>
            <TopBar />
            <Flex flexDir="column" padding={2} borderTop="1px" borderColor="gray.200" backgroundColor="white">
                <AddTodo />
                <Board initialBoard={initialBoard} />
            </Flex>
        </>
    );
};
