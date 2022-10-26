import React from 'react';
import { RootState } from '../../../redux/store';
import { AssetListItem } from '../AssetListItem/AssetListItem';
import { StyledAssetListItems } from './styles';
import { useSelector } from 'react-redux';

export const AssetListItems = () => {
    const assets = useSelector((state: RootState) => state.assets);
    return (
        <StyledAssetListItems>
            {assets.map((asset) => (
                <AssetListItem key={`${asset.id}+${asset.key}`} asset={asset} />
            ))}
        </StyledAssetListItems>
    );
};
