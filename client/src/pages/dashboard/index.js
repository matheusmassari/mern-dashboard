import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";

const Dashboard = () => {
    const { user } = useAppContext();
    const router = useRouter();
    

    useEffect(() => {
        if (!user) {
            router.push("/register")
        }
    }, []);

    return (
        <>
            <h1>Dashboard</h1>
        </>
    );
};

Dashboard.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default Dashboard;
