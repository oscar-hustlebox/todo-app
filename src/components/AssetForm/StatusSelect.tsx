import React, { ReactElement } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { Select } from '@chakra-ui/react';
import { FormValues } from './AssetForm';

export const StatusSelect = (props: UseControllerProps<FormValues>): ReactElement => {
    const { field } = useController(props);
    return (
        <Select placeholder="Select status" borderColor="#D2D4D5" {...field}>
            <option value="pending">Pending</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
        </Select>
    );
};
