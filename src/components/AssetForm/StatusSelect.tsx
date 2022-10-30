import React, { ReactElement } from 'react';
import { Controller, Control } from 'react-hook-form';
import { Select } from '@chakra-ui/react';

export const StatusSelect = ({ control, name }: { control: Control<any>; name: string }): ReactElement => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Select placeholder="Select status" borderColor="#D2D4D5" {...field}>
                    <option value="pending">Pending</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                </Select>
            )}
        />
    );
};
