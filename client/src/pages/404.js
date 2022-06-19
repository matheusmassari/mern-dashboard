import React from "react";
import { Box, Image, Center, Text, VStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const NotFoundPage = () => {
    return (
        <Box>
            <Center mt="6rem">
                <Image
                    src="page-not-found.svg"
                    alt="pagina nao encontrada"
                    d="inline-block"
                    w="30rem"
                />
            </Center>
            <Center mt="4rem">
                <VStack spacing={4} >
                    <Text fontSize="3rem">Ohh! Page Not Found</Text>
                    <Text fontSize="1.5rem" color="gray.400">
                        We can&apos;t seem to find the page you&apos;re looking
                        for
                    </Text>
                    <NextLink href="landing" passHref>
                        <Link style={{textDecoration: "none"}}>
                            <Text color="teal.500" as="u" >Back Home</Text>
                        </Link>
                    </NextLink>
                </VStack>
            </Center>
        </Box>
    );
};

export default NotFoundPage;
