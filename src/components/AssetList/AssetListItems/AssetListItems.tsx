import React from 'react';
import { RootState } from '../../../redux/store';
import { AssetListItem } from '../AssetListItem/AssetListItem';
import { useSelector } from 'react-redux';
import { Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';

export const AssetListItems = () => {
    const assets = useSelector((state: RootState) => state.assets);
    return (
        <TableContainer border="1px" borderRadius={4} borderColor="gray.200" backgroundColor="#FFF">
            <Table variant="striped" backgroundColor="gray.200">
                <Thead>
                    <Tr>
                        <Th padding={2}>
                            <Text fontWeight="extrabold" casing="capitalize">
                                Name
                            </Text>
                        </Th>
                        <Th padding={2}>
                            <Text fontWeight="extrabold" casing="capitalize">
                                Description
                            </Text>
                        </Th>
                        <Th padding={2}>
                            <Text fontWeight="extrabold" casing="capitalize">
                                Quantity
                            </Text>
                        </Th>
                        <Th padding={2}>
                            <Text fontWeight="extrabold" casing="capitalize">
                                Status
                            </Text>
                        </Th>
                        <Th padding={2}>
                            <Text fontWeight="extrabold" casing="capitalize">
                                Actions
                            </Text>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody background="#FFF">
                    {assets.map((asset) => (
                        <AssetListItem key={asset.id} asset={asset} />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
