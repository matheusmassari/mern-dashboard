import React from "react";
import { Box } from "@chakra-ui/react";

const JobCard = (props) => {
    const { company, jobLocation, jobType, position, status } = props;

    return (
        <Box>
            <div>{company}</div>
            <div>{jobLocation}</div>
            <div>{position}</div>
            <div>{status}</div>
        </Box>
    );
};

export default JobCard;
