import React from "react";
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/registerSchema";

const RegisterForm = ({ toggleMember }) => {

        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm({
            resolver: yupResolver(registerSchema),
            mode: "onBlur",
        });

        const registerUser = (data) => {
            console.log(data);
        };

    return (
        <form>
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
                    Register
                </Heading>
                <VStack spacing={10}>
                    <FormControl isRequired isInvalid={errors.username}>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input
                            id="username"
                            placeholder="Username"
                            {...register("username")}
                        />
                        <FormErrorMessage>
                            {errors?.username?.message}
                        </FormErrorMessage>
                    </FormControl>
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
                        onClick={handleSubmit(registerUser)}
                        disabled={
                            !!errors.email ||
                            !!errors.password ||
                            !!errors.username
                        }
                    >
                        Submit
                    </Button>
                    <Box>
                        <Text>
                            Already a member?{" "}
                            <Button
                                variant="none"
                                px="0"
                                py="0"
                                color="blue.500"
                                onClick={toggleMember}
                            >
                                Login.
                            </Button>
                        </Text>
                    </Box>
                </VStack>
            </Container>
        </form>
    );
};

export default RegisterForm;
