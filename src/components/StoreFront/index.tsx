import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import { AddAsset } from '../AddAsset/AddAsset';
import { AssetList } from '../AssetList';
import { StyledWrapper } from './styles';
import { ReactComponent as AssetLogo } from '../../assets/logo.svg';

export const StoreFront = () => {
    return (
        <>
            <Flex paddingX={4} paddingY={4} flexDir="row" alignItems="center" gap={4}>
                <Box background="purple.50" padding={2} borderRadius={8}>
                    <AssetLogo color="#995CBD" />
                </Box>

                <Heading as="h1" size="md" fontWeight="medium">
                    Assets
                </Heading>
            </Flex>
            <Flex
                flexDir="column"
                padding={2}
                borderTop="1px"
                borderColor="gray.200"
                backgroundColor="gray.100"
                height="100vh"
            >
                <AddAsset />
                <Box marginTop={4}>
                    <AssetList />
                </Box>
            </Flex>
        </>
    );
};
