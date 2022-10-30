import { Box } from '@chakra-ui/react';
import React from 'react';
import { AddAsset } from '../AddAsset/AddAsset';
import { AssetList } from '../AssetList';
import { StyledWrapper } from './styles';

export const StoreFront = () => {
    return (
        <StyledWrapper>
            <AddAsset />
            <Box marginTop={4}>
                <AssetList />
            </Box>
        </StyledWrapper>
    );
};
