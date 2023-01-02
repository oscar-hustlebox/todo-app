import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';

import reorder, { columnCardMap, reorderCardMap } from '../../utils';
import { RootState } from '../../redux/store';
import { Box } from '@chakra-ui/react';

const CardListItem = ({ card, isDragging, isGroupedOver, provided }: any) => {
    return (
        <div
            isDragging={isDragging}
            isGroupedOver={isGroupedOver}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <div
                style={{
                    display: 'flex',
                    flexGrow: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.5rem',
                    marginBottom: '0.5rem',
                    backgroundColor: 'white',
                    border: '1px solid black',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s ease',
                    userSelect: 'none',
                }}
            >
                {card.name}
            </div>
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
            <Box ref={provided.innerRef} {...provided.draggableProps} margin="2" display="flex" flexDir="column">
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
                    <h4
                        isDragging={snapshot.isDragging}
                        {...provided.dragHandleProps}
                        style={{
                            display: 'flex',
                            padding: '0.5rem',
                            transition: 'ease',
                            transitionDuration: '0.2s',
                            flexGrow: 1,
                            userSelect: 'none',
                            position: 'relative',
                        }}
                    >
                        {title}
                    </h4>
                </div>
                <CardList
                    listId={title}
                    listType="QUOTE"
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
    const [containerHeight, setContainerHeight] = useState<any>(500);
    const [isCombineEnabled, setIsCombineEnabled] = useState<boolean>(false);

    useEffect(() => {
        setColumns(initialBoard);
        setOrdered(Object.keys(initialBoard));
    }, [initialBoard]);

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

        const source = result.source;
        const destination = result.destination;

        // did not move anywhere - can bail early
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        // reordering column
        if (result.type === 'COLUMN') {
            const newOrdered = reorder(ordered, source.index, destination.index);

            setOrdered(newOrdered);
            return;
        }

        const data = reorderCardMap({
            cardMap: columns,
            source,
            destination,
        });
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
                <Box bgColor="blue.300" display="inline-flex" ref={provided.innerRef} {...provided.droppableProps}>
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
            <Board initialBoard={initialBoard} />
        </>
    );
};
