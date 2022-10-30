import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import { AddAsset } from '../AddAsset/AddAsset';
import { AssetList } from '../AssetList';
import { StyledWrapper } from './styles';

export const StoreFront = () => {
    return (
        <>
            <Flex paddingX={4} paddingY={4} flexDir="row" alignItems="center" gap={4}>
                <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" width={8} height={8} />

                <Heading as="h1" size="lg" fontWeight="medium">
                    Assets
                </Heading>
            </Flex>
            <StyledWrapper>
                <AddAsset />
                <Box marginTop={4}>
                    <AssetList />
                </Box>
            </StyledWrapper>
        </>
    );
};
