import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { ReactComponent as TodoLogo } from '../../assets/logo.svg';

export const TopBar = () => {
    return (
        <Flex paddingX={4} paddingY={4} flexDir="row" alignItems="center" gap={4}>
            <Box background="purple.50" padding={2} borderRadius={8}>
                <TodoLogo color="#995CBD" />
            </Box>

            <Heading as="h1" size="md" fontWeight="medium">
                Todos
            </Heading>
        </Flex>
    );
};
