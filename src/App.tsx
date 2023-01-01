import * as React from 'react';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import { TodosView } from './components/TodosView';

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
            <TodosView />
        </ChakraProvider>
    );
}

export default App;
