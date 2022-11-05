import React, { ReactElement } from 'react';
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Box,
    Flex,
    Heading,
} from '@chakra-ui/react';
import { UseControllerProps, useController } from 'react-hook-form';
import { FormValues } from './TodoForm';
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../../assets/arrow-up.svg';
import { ErrorMessage } from './ErrorMessage';

type QuantityInputProps = UseControllerProps<FormValues> & { labelText: string };

export const QuantityInput = (props: QuantityInputProps): ReactElement => {
    const {
        field,
        formState: { errors },
    } = useController(props);

    return (
        <Box mb={3}>
            <Heading size="xs" fontWeight="light" mb={1}>
                {props.labelText}
            </Heading>
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
                    <NumberIncrementStepper
                        children={
                            <Flex alignItems="center">
                                <ArrowUp style={{ width: 16, height: 16 }} />
                            </Flex>
                        }
                    />
                    <NumberDecrementStepper
                        children={
                            <Flex alignItems="center">
                                <ArrowDown style={{ width: 16, height: 16 }} />
                            </Flex>
                        }
                    />
                </NumberInputStepper>
            </NumberInput>
            {errors?.[props.name]?.message && (
                <ErrorMessage message={errors?.[props.name]?.message?.toString() || ''} />
            )}
        </Box>
    );
};
