import { Draggable } from 'react-beautiful-dnd';
import { TaskState } from '../../../redux/slices/tasks/slice';
import { CardListItem } from './CardListItem';

type InnerCardListProps = { cards: TaskState[] };

export const InnerCardList = ({ cards }: InnerCardListProps) => {
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
