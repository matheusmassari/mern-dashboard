import React from "react";
import { useAppContext } from "../../context/appContext";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import ProfilePageForm from "../../components/forms/ProfilePageForm";
import AuthProvider from "../../context/AuthProvider";

const ProfilePage = () => {
    return (
        <AuthProvider>
            <ProfilePageForm />
        </AuthProvider>
    );
};

ProfilePage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default ProfilePage;
