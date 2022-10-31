import { Box, Button, Link, Tbody, Td, Tr } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AssetState, removeAsset } from '../../../redux/slices/assets/slice';

type AssetListItemProps = { asset: AssetState };

export const AssetListItem = ({ asset }: AssetListItemProps) => {
    const dispatch = useDispatch();
    return (
        <Tbody>
            <Tr>
                <Td>
                    <Link href="#nowhere" isExternal color="blue.500">
                        {asset.name}
                    </Link>
                </Td>
                <Td>{asset.description}</Td>
                <Td>{asset.quantity}</Td>
                <Td>{asset.status}</Td>
                <Td>
                    <Box>
                        <Button onClick={() => dispatch(removeAsset(asset.id))}>Remove</Button>
                    </Box>
                </Td>
            </Tr>
        </Tbody>
    );
};
