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
    Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addJobSchema } from "../../utils/addJobSchema";
import { useAppContext } from "../../context/appContext";
import CustomToast from "../feedback/CustomToast";

const AddJobForm = () => {
    const {
        user,
        isLoading,
        showAlert,
        alertType,
        jobTypeOptions,
        statusOptions,
    } = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(addJobSchema),
        mode: "onBlur",
    });

    const addJobSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(addJobSubmit)}>
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
                        Add Job
                    </Heading>
                    <SimpleGrid columns={3} spacing={10} spacingY="2rem">
                        <FormControl isRequired isInvalid={errors.name}>
                            <FormLabel htmlFor="position">Position</FormLabel>
                            <Input
                                id="position"
                                placeholder="Ex.: Web Developer"
                                {...register("position")}
                            />
                            <FormErrorMessage>
                                {errors?.position?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={errors.lastName}>
                            <FormLabel htmlFor="company">Company</FormLabel>
                            <Input
                                id="company"
                                placeholder="Ex.: Web Developer"
                                {...register("company")}
                            />
                            <FormErrorMessage>
                                {errors?.company?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={errors.email}>
                            <FormLabel htmlFor="jobLocation">
                                Job Location
                            </FormLabel>
                            <Input
                                id="jobLocation"
                                placeholder="Ex.: Web Developer"
                                {...register("jobLocation")}
                            />
                            <FormErrorMessage>
                                {errors?.jobLocation?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={errors.location}>
                            <FormLabel htmlFor="status">Status</FormLabel>
                            <Select id="status" {...register("status")}>
                                {statusOptions.map((optionValue) => (
                                    <option value={optionValue}>
                                        {optionValue}
                                    </option>
                                ))}
                            </Select>
                            <FormErrorMessage>
                                {errors?.status?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={errors.email}>
                            <FormLabel htmlFor="jobType">Job Type</FormLabel>
                            <Select id="jobType" {...register("jobType")}>
                                {jobTypeOptions.map((optionValue) => (
                                    <option value={optionValue}>
                                        {optionValue}
                                    </option>
                                ))}
                            </Select>
                            <FormErrorMessage>
                                {errors?.jobType?.message}
                            </FormErrorMessage>
                        </FormControl>

                        <Button
                            isLoading={isLoading}
                            loadingText="Submitting"
                            colorScheme="blue"
                            mt="2rem"
                            type="submit"
                            disabled={
                                !!errors.position ||
                                !!errors.company ||
                                !!errors.jobLocation ||
                                !!errors.status ||
                                !!errors.jobType
                            }
                        >
                            Submit
                        </Button>
                    </SimpleGrid>
                </Box>
            </form>
            {showAlert && <CustomToast alertType={alertType} />}
        </>
    );
};

export default AddJobForm;
