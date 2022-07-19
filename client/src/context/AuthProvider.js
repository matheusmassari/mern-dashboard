import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useRouter } from "next/router";

const AuthProvider = ({ children }) => {
    const { user, userLoading } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        if (!user && !userLoading) {
            router.push("/register");
            return;
        }
    }, []);

    return children;
};

export default AuthProvider;
