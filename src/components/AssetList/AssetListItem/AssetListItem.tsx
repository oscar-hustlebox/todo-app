import React from 'react';
import { AssetState } from '../../../redux/slices/assets/slice';
import { StyledAssetListItem, StyledHeader, StyledText } from './styles';

type AssetListItemProps = { asset: AssetState };

export const AssetListItem = ({ asset }: AssetListItemProps) => {
    return (
        <StyledAssetListItem>
            {/* TODO add image of asset */}
            <StyledHeader>
                <StyledText color="primary">{asset.name}</StyledText>
                <StyledText>{asset.description}</StyledText>
                <StyledText>{asset.quantity}</StyledText>
                <StyledText>{asset.status}</StyledText>
            </StyledHeader>
        </StyledAssetListItem>
    );
};
