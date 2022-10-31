import * as React from 'react';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import { StoreFront } from './components/StoreFront';

// 2. Extend the theme to include custom colors, fonts, etc
const customeTheme = extendTheme({
    colors: {},
    fonts: {},
    fontSizes: {},
});

const theme = extendTheme({ customeTheme });

function App() {
    return (
        <ChakraProvider theme={theme}>
            <StoreFront />
        </ChakraProvider>
    );
}

export default App;
