import styled from 'styled-components';

export const Button = styled.button`
    background: transparent;
    border-radius: 4px;
    border: 2px solid palevioletred;
    color: palevioletred;
    padding: 0.25rem 1rem;
    &:hover {
        background: palevioletred;
        color: white;
        cursor: pointer;
    }
    &:active {
        background: black;
        color: white;
    }
`;
