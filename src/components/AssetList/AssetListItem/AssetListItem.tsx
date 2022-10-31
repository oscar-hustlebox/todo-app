import React from 'react';
import { Button, Link, Tbody, Td, Tr } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { AssetState, removeAsset } from '../../../redux/slices/assets/slice';

type AssetListItemProps = { asset: AssetState };

/**
 * It takes an asset object and returns a table row with the asset's name, description, quantity,
 * status, and a button to remove the asset
 * @param AssetListItemProps - This is the type of the props that the component
 * will receive.
 * @returns A table row with the asset's name, description, quantity, status, and a button to remove
 * the asset.
 */
export const AssetListItem = ({ asset }: AssetListItemProps) => {
    const dispatch = useDispatch();

    /**
     * It takes a string that can only be one of three values and returns a string that is the title case
     * version of that value
     * @param {'pending' | 'offline' | 'online'} str - 'pending' | 'offline' | 'online'
     * @returns A string
     */
    const getTitleCase = (str: 'pending' | 'offline' | 'online') => {
        switch (str) {
            case 'pending':
                return 'Pending';
            case 'offline':
                return 'Offline';
            case 'online':
                return 'Online';
        }
    };

    return (
        <Tbody>
            <Tr>
                <Td>
                    <Link href="#nowhere" color="blue.500">
                        {asset.name}
                    </Link>
                </Td>
                <Td>{asset.description}</Td>
                <Td>{asset.quantity}</Td>
                <Td>{getTitleCase(asset.status)}</Td>
                <Td>
                    <Button onClick={() => dispatch(removeAsset(asset.id))}>Remove</Button>
                </Td>
            </Tr>
        </Tbody>
    );
};
