import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import AddJobForm from "../../components/forms/AddJobForm";

const AddJobPage = () => {
    const { user } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/register");
        }
    }, [user]);
    return <AddJobForm></AddJobForm>;
};

AddJobPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default AddJobPage;
