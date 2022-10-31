import React from 'react';
import { Text } from '@chakra-ui/react';

export const ErrorMessage = ({ message }: { message: string }) => {
    console.log('message', message);
    return (
        <Text mt={1} size="sm" color="red.400">
            {message}
        </Text>
    );
};
