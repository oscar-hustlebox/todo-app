import React, { ReactElement } from 'react';
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

export const QuantityInput = ({ control, name }: { control: any; name: string }): ReactElement => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <NumberInput {...field} min={0} defaultValue={1}>
                    <NumberInputField ref={field.ref} name={field.name} />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            )}
        />
    );
};
