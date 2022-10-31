import React, { ReactElement } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';

export const SubmitButton = (): ReactElement => {
    return (
        <Box>
            <Heading size="xs" fontWeight="light">
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
