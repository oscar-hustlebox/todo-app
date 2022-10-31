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
    Flex,
} from '@chakra-ui/react';
import { UseControllerProps, useController } from 'react-hook-form';
import { FormValues } from './AssetForm';
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../../assets/arrow-up.svg';

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
            {errors?.quantity?.message && (
                <Alert status="error">
                    <AlertIcon />
                    {errors.quantity.message}
                </Alert>
            )}
        </Box>
    );
};
