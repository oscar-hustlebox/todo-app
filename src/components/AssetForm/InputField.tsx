import React, { ReactElement } from 'react';
import { Box, Heading, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';

export const InputField = ({
    name,
    labelText,
    placeholderText,
}: {
    name: string;
    labelText: string;
    placeholderText: string;
}): ReactElement => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <Box mb={3}>
            <Heading size="xs" fontWeight="light" mb={1}>
                {labelText}
            </Heading>
            <Input
                {...register(name)}
                type="text"
                placeholder={placeholderText}
                borderColor="gray.200"
                backgroundColor="#FFFFFF"
                errorBorderColor="red.300"
                isInvalid={!!errors.name}
            />
            {errors?.[name]?.message && <ErrorMessage message={errors?.[name]?.message?.toString() || ''} />}
        </Box>
    );
};
