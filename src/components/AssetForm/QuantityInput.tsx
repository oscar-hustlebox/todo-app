import React, { ReactElement } from 'react';
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';

export const QuantityInput = ({ name }: { name: string }): ReactElement => {
    return (
        <NumberInput name={name} defaultValue={1} borderColor="#D2D4D5">
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    );
};
