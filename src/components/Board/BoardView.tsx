import { useSelector } from 'react-redux';
import { Flex } from '@chakra-ui/react';

import { columnCardMap } from '../../utils';
import { RootState } from '../../redux/store';
import { TopBar } from '../TopBar/TopBar';
import { Board } from './components/Board';

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
