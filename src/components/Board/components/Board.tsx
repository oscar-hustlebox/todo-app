import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { TaskState, updateTask } from '../../../redux/slices/tasks/slice';
import { BoardState, updateBoard } from '../../../redux/slices/board/slice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { reorder, reorderCardMap } from '../../../utils';
import { Box } from '@chakra-ui/react';
import { Column } from './Columns';

type BoardProps = { initialBoard: Record<string, TaskState[]> };

export const Board = ({ initialBoard }: BoardProps) => {
    const [columns, setColumns] = useState<Record<string, TaskState[]>>();
    const [ordered, setOrdered] = useState<string[]>();
    const [newBoardState, setNewBoardState] = useState<BoardState[]>();
    const [newCardState, setNewCardState] = useState<Record<string, string>>();
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
        <Droppable droppableId="board" type="COLUMN" direction="horizontal" isCombineEnabled={isCombineEnabled}>
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

    return <DragDropContext onDragEnd={onDragEnd}>{board}</DragDropContext>;
};
