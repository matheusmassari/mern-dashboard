import React from "react";
import {
    Heading,
    Text,
    Box,
    Image,
    Button,
    chakra,
    Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

const LandingPage = () => {
    return (
        <>
            <Box as="nav">
                <Image
                    src="jobstation-logo.svg"
                    alt="Jobstation Logo"
                    ml={"1rem"}
                    h={"5rem"}
                />
            </Box>
            <Box minH="calc(100vh - 5rem)" maxW="1400px" margin="0 auto">
                <Box
                    display="grid"
                    minH="calc(100vh - 5rem)"
                    alignItems="center"
                    gridTemplateColumns={{
                        base: "1fr",
                        md: "1fr 1fr",
                    }}
                    columnGap="3rem"
                    px="2rem"
                    mt="-3rem"
                >
                    <Box>
                        <Heading fontWeight={"700"}>
                            Job{" "}
                            <chakra.span color="blue.500">Tracking</chakra.span>{" "}
                            App
                        </Heading>
                        <Text mt="2rem">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ratione facilis quam, eos sapiente voluptatum
                            tenetur odio pariatur quidem vel, voluptatibus,
                            dolorum dolorem voluptate debitis. Hic possimus
                            excepturi magni explicabo necessitatibus.
                        </Text>
                        <Button colorScheme="blue" mt="2rem">
                            <NextLink href="/register" passHref>
                                <Link style={{ textDecoration: "none" }}>
                                    Register/Login
                                </Link>
                            </NextLink>
                        </Button>
                    </Box>
                    <Image
                        src="main-picture.svg"
                        alt="Main Hero Picture"
                        display={["none", "none", "block"]}
                        w="40rem"
                    />
                </Box>
            </Box>
        </>
    );
};

export default LandingPage;
