import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import {
    Container,
    Center,
    Image,
    Heading,
    Text,
    VStack,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Button,
    Box,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/loginSchema";
import { useAppContext } from "../../context/appContext";

const LoginForm = ({ toggleMember }) => {
    const { user, isLoading, loginUser, showAlert, alertText } =
        useAppContext();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onBlur",
    });

    const loginSubmit = (data) => {
        const user = "";
        const { password, email } = data;
        const currentUser = { user, password, email };
        loginUser(currentUser);
    };

    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user]);

    return (
        <form onSubmit={handleSubmit(loginSubmit)}>
            <Container
                borderTop="6px solid"
                borderTopColor="blue.500"
                backgroundColor="white"
                w="30rem"
                h="fit-content"
                borderRadius="8px"
                px="3rem"
                py="2rem"
            >
                <Center mb="2rem">
                    <Image src={"jobstation-logo.svg"} alt="Logo Marca" />
                </Center>
                <Heading textAlign="center" color="gray.600" mb="2rem">
                    Login
                </Heading>
                <VStack spacing={10}>
                    {showAlert && (
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle>{alertText}</AlertTitle>
                        </Alert>
                    )}
                    <FormControl isRequired isInvalid={errors.email}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            id="email"
                            placeholder="Email"
                            {...register("email")}
                        />
                        <FormErrorMessage>
                            {errors?.email?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.password}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Password"
                            {...register("password")}
                        />
                        <FormErrorMessage>
                            {errors?.password?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Button
                        colorScheme="blue"
                        w="100%"
                        type="submit"
                        disabled={!!errors.email || !!errors.password}
                    >
                        Submit
                    </Button>
                    <Box>
                        <Text>
                            Not a member?{" "}
                            <Button
                                variant="none"
                                px="0"
                                py="0"
                                color="blue.500"
                                onClick={toggleMember}
                            >
                                Register.
                            </Button>
                        </Text>
                    </Box>
                    {isLoading && (
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                    )}
                </VStack>
            </Container>
        </form>
    );
};

export default LoginForm;
