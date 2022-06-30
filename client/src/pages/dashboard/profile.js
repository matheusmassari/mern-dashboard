import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";

const ProfilePage = () => {
    const { user } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/register");
        }
    }, []);
    return <div>ProfilePage</div>;
};

ProfilePage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default ProfilePage;
