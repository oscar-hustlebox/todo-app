import React, { ReactElement } from 'react';
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';
import { UseControllerProps, useController } from 'react-hook-form';
import { FormValues } from './AssetForm';

export const QuantityInput = (props: UseControllerProps<FormValues>): ReactElement => {
    const { field } = useController(props);

    return (
        <NumberInput {...field} min={0}>
            <NumberInputField ref={field.ref} name={field.name} />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    );
};
