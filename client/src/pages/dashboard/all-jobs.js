import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";

const AllJobsPage = () => {
    const { user, getJobs, state } = useAppContext();
    const router = useRouter();    

    useEffect(() => {                
        if (!user) {
            router.push("/register");
        }
    }, [user]);

    useEffect(()=> {
        getJobs()
    }, [])

    return <div>AllJobsPage</div>;
};


AllJobsPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default AllJobsPage;
