import { Box, Button, Heading } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

export const SubmitButton = (): ReactElement => {
    return (
        <Box>
            <Heading size="xs" fontWeight="light">
                &nbsp;
            </Heading>
            <Button
                type="submit"
                backgroundColor="gray.500"
                color="white"
                borderRadius={2}
                width={{ sm: '100%', base: 'inherit', md: 'inherit' }}
            >
                <Heading size="xs" textTransform="uppercase">
                    Add
                </Heading>
            </Button>
        </Box>
    );
};
