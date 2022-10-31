import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { AddAsset } from '../AddAsset/AddAsset';
import { AssetList } from '../AssetList';
import { TopBar } from '../TopBar/TopBar';

export const StoreFront = () => {
    return (
        <>
            <TopBar />
            <Flex
                flexDir="column"
                height="100vh"
                padding={2}
                borderTop="1px"
                borderColor="gray.200"
                backgroundColor="gray.100"
            >
                <AddAsset />
                <Box marginTop={4} paddingX={4}>
                    <AssetList />
                </Box>
            </Flex>
        </>
    );
};
