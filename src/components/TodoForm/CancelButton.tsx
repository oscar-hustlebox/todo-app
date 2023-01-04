import React from 'react';
import { Button, Text } from '@chakra-ui/react';

export const CancelButton = ({
    handleClose,
    isEditing = false,
}: {
    handleClose?: () => void;
    isEditing?: boolean;
}): React.ReactElement | null => {
    if (!handleClose) return null;
    return (
        <Button
            variant="outline"
            width="full"
            borderColor="gray.500"
            borderWidth={1}
            _hover={{
                backgroundColor: 'gray.500',
                color: '#FFF',
            }}
            borderRadius={4}
            color="gray.800"
            onClick={() => handleClose()}
            size={isEditing ? 'xs' : 'md'}
        >
            <Text size="xs" textTransform="uppercase">
                Cancel
            </Text>
        </Button>
    );
};
