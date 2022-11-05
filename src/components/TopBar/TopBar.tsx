import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export const TopBar = () => {
    return (
        <Flex paddingX={4} paddingY={4} flexDir="row" alignItems="center" gap={4}>
            <Box background="green.50" padding={2} borderRadius={8}>
                <CheckCircleIcon w={6} h={6} color="green.500" />
            </Box>

            <Heading as="h1" size="md" fontWeight="medium">
                Todos
            </Heading>
        </Flex>
    );
};
