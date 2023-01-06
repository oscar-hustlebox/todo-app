import { TaskState } from '../../../redux/slices/tasks/slice';
import { InnerCardList } from './InnerCardList';
import { Box } from '@chakra-ui/react';

type InnerListProps = { cards: TaskState[]; dropProvided: any };

export const InnerList = ({ cards, dropProvided }: InnerListProps) => {
    return (
        <>
            <InnerCardList cards={cards} />
            <Box ref={dropProvided.innerRef}>{dropProvided.placeholder}</Box>
        </>
    );
};
