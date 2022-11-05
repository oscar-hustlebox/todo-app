import React from 'react';
import { Button, Text } from '@chakra-ui/react';

export const CancelButton = ({ handleClose }: { handleClose?: () => void }): React.ReactElement | null => {
    if (!handleClose) return null;
    return (
        <Button
            variant="outline"
            borderColor="gray.500"
            borderWidth={1}
            _hover={{
                backgroundColor: 'gray.500',
                color: '#FFF',
            }}
            color="blackalpha.800"
            borderRadius={4}
            width={{ sm: '100%', base: 'inherit', md: 'inherit' }}
            onClick={() => handleClose()}
        >
            <Text size="xs" textTransform="uppercase">
                Cancel
            </Text>
        </Button>
    );
};
