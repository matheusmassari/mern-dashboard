import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../styles/theme";
import { AppProvider } from "../context/appContext";

function MyApp({ Component, pageProps }) {
    return (
        <AppProvider>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </AppProvider>
    );
}

export default MyApp;
