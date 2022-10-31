import React from 'react';
import { Button, Heading, Link, Td, Tr } from '@chakra-ui/react';
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
    const getStatusColor = (str: 'pending' | 'offline' | 'online') => {
        switch (str) {
            case 'pending':
                return 'orange.500';
            case 'offline':
                return 'gray.500';
            case 'online':
                return 'green.500';
        }
    };

    return (
        <Tr>
            <Td padding={2} maxWidth="sm" overflow="hidden" wordBreak="break-word">
                <Link href="#nowhere" color="blue.500">
                    {asset.name}
                </Link>
            </Td>
            <Td padding={2} maxWidth="sm" overflow="hidden" wordBreak="break-word">
                {asset.description}
            </Td>
            <Td padding={2}>{asset.quantity}</Td>
            <Td padding={2} color={getStatusColor(asset.status)}>
                {getTitleCase(asset.status)}
            </Td>
            <Td padding={2}>
                <Button
                    backgroundColor="#FFF"
                    borderColor="red.500"
                    borderWidth={1}
                    _hover={{
                        backgroundColor: 'red.500',
                        color: '#FFF',
                    }}
                    color="red.500"
                    borderRadius={4}
                    width={{ sm: '100%', base: 'inherit', md: 'inherit' }}
                    onClick={() => dispatch(removeAsset(asset.id))}
                >
                    <Heading size="xs" textTransform="uppercase">
                        Remove
                    </Heading>
                </Button>
            </Td>
        </Tr>
    );
};
