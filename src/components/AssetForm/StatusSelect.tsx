import React, { ReactElement } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { Alert, AlertIcon, Box, Select } from '@chakra-ui/react';
import { FormValues } from './AssetForm';

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
