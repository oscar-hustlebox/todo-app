import styled from 'styled-components';

export const StyledAssetListItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 14px;
    background: #fff;
`;

export const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const StyledText = styled.p<{ color?: 'primary' | 'secondary' }>`
    margin: 0;
    color: ${({ color }) => (color === 'primary' ? '#5576A8' : '#000')};
    font-weight: 600;
`;

export const StyledFooter = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;
