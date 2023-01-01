import React from 'react';
import { Text } from '@chakra-ui/react';

type ErrorMessageProps = { message: string };

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
    <Text mt={1} size="sm" color="red.400">
        {message}
    </Text>
);
