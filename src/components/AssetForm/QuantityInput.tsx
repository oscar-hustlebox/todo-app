import React, { ReactElement } from 'react';
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Box,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { UseControllerProps, useController } from 'react-hook-form';
import { FormValues } from './AssetForm';

export const QuantityInput = (props: UseControllerProps<FormValues>): ReactElement => {
    const {
        field,
        formState: { errors },
    } = useController(props);

    return (
        <Box>
            <NumberInput
                {...field}
                min={0}
                borderColor="gray.200"
                borderRadius={8}
                backgroundColor="#FFFFFF"
                errorBorderColor="red.300"
                isInvalid={!!errors.name}
            >
                <NumberInputField ref={field.ref} name={field.name} />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            {errors?.quantity?.message && (
                <Alert status="error">
                    <AlertIcon />
                    {errors.quantity.message}
                </Alert>
            )}
        </Box>
    );
};
