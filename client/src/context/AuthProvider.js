import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";

const AuthProvider = ({ children }) => {
    const { user, userLoading } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        // Se não houver usuário E não estiver carregando dados do usuário:
        if (!user && !userLoading) {
            router.push("/register");
            return;
        }
    }, [user]);

    if (user) {
        return children;
    }
    if (!user) {
        <Spinner
            thickness="30px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
        />;
    }
};

export default AuthProvider;
