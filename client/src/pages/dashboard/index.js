 import React from "react";
import { useAppContext } from "../../context/appContext";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import AuthProvider from "../../context/AuthProvider";

const Dashboard = () => {

    return (
        <AuthProvider>
            <h1>Dashboard</h1>
        </AuthProvider>
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
