import { Tbody, Td, Tr } from '@chakra-ui/react';
import React from 'react';
import { AssetState } from '../../../redux/slices/assets/slice';

type AssetListItemProps = { asset: AssetState };

export const AssetListItem = ({ asset }: AssetListItemProps) => {
    return (
        <Tbody>
            <Tr>
                <Td>{asset.name}</Td>
                <Td>{asset.description}</Td>
                <Td isNumeric>{asset.quantity}</Td>
                <Td>{asset.status}</Td>
            </Tr>
        </Tbody>
    );
};
