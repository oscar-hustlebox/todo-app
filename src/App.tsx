import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import { BoardView } from './components/Board/BoardView';

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
            <BoardView />
        </ChakraProvider>
    );
}

export default App;
