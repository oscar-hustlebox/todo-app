import React, { ReactElement } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { Alert, AlertIcon, Box, Select } from '@chakra-ui/react';
import { FormValues } from './AssetForm';
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg';

/* A React component that is using the `useController` hook from `react-hook-form` to get the `field`
and `formState` props. */
export const StatusSelect = (props: UseControllerProps<FormValues>): ReactElement => {
    const {
        field,
        formState: { errors },
    } = useController(props);

    return (
        <Box>
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
            {errors?.status?.message && (
                <Alert status="error">
                    <AlertIcon />
                    {errors.status.message}
                </Alert>
            )}
        </Box>
    );
};
