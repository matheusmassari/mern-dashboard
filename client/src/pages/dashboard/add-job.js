import React from "react";
import { useAppContext } from "../../context/appContext";
import Layout from "../../components/layout/Layout";
import AddJobForm from "../../components/forms/AddJobForm";
import AuthProvider from "../../context/AuthProvider"

const AddJobPage = () => {
    
    return (
        <AuthProvider>
            <AddJobForm></AddJobForm>;
        </AuthProvider>
    );
};

AddJobPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default AddJobPage;
