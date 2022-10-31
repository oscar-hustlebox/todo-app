import React, { ReactElement } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { Box, Heading, Select } from '@chakra-ui/react';
import { FormValues } from './AssetForm';
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg';
import { ErrorMessage } from './ErrorMessage';

/* A React component that is using the `useController` hook from `react-hook-form` to get the `field`
and `formState` props. */
export const StatusSelect = (props: UseControllerProps<FormValues> & { labelText: string }): ReactElement => {
    const {
        field,
        formState: { errors },
    } = useController(props);

    return (
        <Box>
            <Heading size="xs" fontWeight="light">
                {props.labelText}
            </Heading>
            <Select
                {...field}
                placeholder="Select status"
                icon={<ArrowDown />}
                borderColor="gray.200"
                backgroundColor="#FFFFFF"
                errorBorderColor="red.300"
                isInvalid={!!errors.name}
            >
                <option value="pending">Pending</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
            </Select>
            {errors?.[props.name]?.message && (
                <ErrorMessage message={errors?.[props.name]?.message?.toString() || ''} />
            )}
        </Box>
    );
};
