import React from "react";
import {
    SimpleGrid,
    Heading,
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
import { profileSchema } from "../../utils/profileSchema";
import { useAppContext } from "../../context/appContext";

const ProfilePageForm = () => {
    const { user, isLoading, showAlert, alertText } = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(profileSchema),
        mode: "onBlur",
    });

    const profileSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(profileSubmit)}>
            <Box
                backgroundColor="white"
                margin="0 auto"
                w="80vw"
                h="fit-content"
                borderRadius="8px"
                mt="2rem"
                px="3rem"
                py="3rem"
            >
                <Heading color="gray.600" mb="2rem">
                    Profile
                </Heading>
                {showAlert && (
                    <Alert status="error">
                        <AlertIcon />
                        <AlertTitle>{alertText}</AlertTitle>
                    </Alert>
                )}
                <SimpleGrid columns={3} spacing={10} spacingY="2rem">
                    <FormControl isRequired isInvalid={errors.username}>
                        <FormLabel htmlFor="username">Name</FormLabel>
                        <Input
                            id="username"
                            placeholder={user?.username}
                            {...register("username")}
                        />
                        <FormErrorMessage>
                            {errors?.username?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.lastName}>
                        <FormLabel htmlFor="lastName">Last Name</FormLabel>
                        <Input
                            id="lastName"
                            placeholder={user?.lastName}
                            {...register("lastName")}
                        />
                        <FormErrorMessage>
                            {errors?.lastName?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.email}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            id="email"
                            placeholder={user?.email}
                            {...register("email")}
                        />
                        <FormErrorMessage>
                            {errors?.email?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.location}>
                        <FormLabel htmlFor="location">Location</FormLabel>
                        <Input
                            id="location"
                            placeholder={user?.location}
                            {...register("location")}
                        />
                        <FormErrorMessage>
                            {errors?.location?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <Button
                        colorScheme="blue"
                        mt="2rem"
                        type="submit"
                        disabled={
                            !!errors.username ||
                            !!errors.lastName ||
                            !!errors.email ||
                            !!errors.location
                        }
                    >
                        Submit
                    </Button>
                </SimpleGrid>
                {isLoading && (
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                )}
            </Box>
        </form>
    );
};

export default ProfilePageForm;
