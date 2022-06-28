import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../styles/theme";
import { AppProvider } from "../context/appContext";

function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <AppProvider>
            <ChakraProvider theme={theme}>
                {getLayout(<Component {...pageProps} />)}
            </ChakraProvider>
        </AppProvider>
    );
}

export default MyApp;
