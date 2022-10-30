import React from 'react';
import { RootState } from '../../../redux/store';
import { AssetListItem } from '../AssetListItem/AssetListItem';
import { useSelector } from 'react-redux';
import { Table, TableContainer, Text, Th, Thead, Tr } from '@chakra-ui/react';

export const AssetListItems = () => {
    const assets = useSelector((state: RootState) => state.assets);
    return (
        <TableContainer border="1px" borderRadius={4} borderColor="#BEBFC0">
            <Table variant="striped">
                <Thead>
                    <Tr>
                        <Th>
                            <Text fontWeight="extrabold" casing="capitalize">
                                Name
                            </Text>
                        </Th>
                        <Th>
                            <Text fontWeight="extrabold" casing="capitalize">
                                Description
                            </Text>
                        </Th>
                        <Th isNumeric>
                            <Text fontWeight="extrabold" casing="capitalize">
                                Quantity
                            </Text>
                        </Th>
                        <Th>
                            <Text fontWeight="extrabold" casing="capitalize">
                                Status
                            </Text>
                        </Th>
                    </Tr>
                </Thead>
                {assets.map((asset) => (
                    <AssetListItem key={asset.id} asset={asset} />
                ))}
            </Table>
        </TableContainer>
    );
};
