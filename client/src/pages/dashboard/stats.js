import React from "react";
import { useAppContext } from "../../context/appContext";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import AuthProvider from "../../context/AuthProvider";

const StatsPage = () => {
    return (
        <AuthProvider>
            <div>stats page</div>
        </AuthProvider>
    );
};

StatsPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default StatsPage;
