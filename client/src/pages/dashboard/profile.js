import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import ProfilePageForm from "../../components/forms/ProfilePageForm";

const ProfilePage = () => {
    const { user, updateUser, isLoading } = useAppContext();
    const router = useRouter();

    // User Check
    useEffect(() => {
        if (!user) {
            router.push("/register");
        }
    }, []);

    return <ProfilePageForm />;
};

ProfilePage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default ProfilePage;
