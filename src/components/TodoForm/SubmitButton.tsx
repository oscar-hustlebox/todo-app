import React, { ReactElement } from 'react';
import { Button, Text } from '@chakra-ui/react';

export const SubmitButton = ({ isEditing = false }: { isEditing: boolean }): ReactElement => {
    return (
        <Button
            variant="solid"
            type="submit"
            backgroundColor="gray.500"
            borderRadius={4}
            _hover={{
                backgroundColor: 'gray.500',
            }}
            color="white"
            width={{ sm: '100%', base: '100%', md: 'inherit' }}
            size={isEditing ? 'xs' : 'md'}
        >
            <Text size="xs" textTransform="uppercase">
                {isEditing ? 'Save' : 'Add'}
            </Text>
        </Button>
    );
};
