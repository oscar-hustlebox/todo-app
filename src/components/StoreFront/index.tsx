import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { AddTodo } from '../AddTodo/AddTodo';
import { TodoListTable } from '../TodoListTable';
import { TopBar } from '../TopBar/TopBar';

export const StoreFront = () => {
    return (
        <>
            <TopBar />
            <Flex
                flexDir="column"
                height="100vh"
                padding={2}
                borderTop="1px"
                borderColor="gray.200"
                backgroundColor="gray.100"
            >
                <AddTodo />
                <Box marginTop={4} paddingX={4}>
                    <TodoListTable />
                </Box>
            </Flex>
        </>
    );
};
