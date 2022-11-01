import React, { ReactElement } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';

export const SubmitButton = (): ReactElement => {
    return (
        <Box mb={3}>
            <Heading size="xs" fontWeight="light" mb={1}>
                &nbsp;
            </Heading>
            <Button
                type="submit"
                backgroundColor="gray.500"
                borderRadius={4}
                _hover={{
                    backgroundColor: 'gray.600',
                }}
                color="white"
                width={{ sm: '100%', base: 'inherit', md: 'inherit' }}
            >
                <Heading size="xs" textTransform="uppercase">
                    Add
                </Heading>
            </Button>
        </Box>
    );
};
