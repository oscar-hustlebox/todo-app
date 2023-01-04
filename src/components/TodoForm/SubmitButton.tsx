import React, { ReactElement } from 'react';
import { Button, Text } from '@chakra-ui/react';

export const SubmitButton = ({ isEditing = false }: { isEditing: boolean }): ReactElement => {
    return (
        <Button
            variant="solid"
            type="submit"
            width="full"
            backgroundColor="gray.500"
            _hover={{
                backgroundColor: 'gray.600',
            }}
            borderRadius={4}
            color="white"
            size={isEditing ? 'xs' : 'md'}
        >
            <Text size="xs" textTransform="uppercase">
                {isEditing ? 'Save' : 'Add'}
            </Text>
        </Button>
    );
};
