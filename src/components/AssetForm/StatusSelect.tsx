import React, { ReactElement } from 'react';
import { Select } from '@chakra-ui/react';

export const StatusSelect = ({ name }: { name: string }): ReactElement => {
    return (
        <Select name={name} placeholder="Select status" borderColor="#D2D4D5">
            <option value="pending">Pending</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
        </Select>
    );
};
