import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            html: {
                scrollBehavior: "smooth",
            },
            body: {
                background: "#E2E8F0",
            },
            "*": {
                boxSizing: "border-box",
            },
        },
    },
    fonts: {
        heading: `Roboto Condensed, sans-serif`,
        body: `Poppins`,
    },
});

export default theme;
