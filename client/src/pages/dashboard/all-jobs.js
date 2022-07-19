import React from "react";
import { useAppContext } from "../../context/appContext";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import SearchJobForm from "../../components/forms/SearchJobForm";
import JobCard from "../../components/cards/JobCard";
import AuthProvider from "../../context/AuthProvider";

const AllJobsPage = () => {
    const { jobs } = useAppContext();
    
    return (
        <AuthProvider>
            <SearchJobForm />
            {jobs.map((singleJob, index) => {
                return <JobCard {...singleJob} key={index} />;
            })}
        </AuthProvider>
    );
};

AllJobsPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default AllJobsPage;
