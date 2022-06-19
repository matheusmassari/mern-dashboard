import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Grid } from "@chakra-ui/react";

import LoginForm from "../components/forms/loginForm";
import RegisterForm from "../components/forms/registerForm";

const RegisterPage = () => {
    const [isMember, setIsMember] = useState(true);

    const toggleMember = () => setIsMember(!isMember);

    const submitUser = (data) => {
        console.log(data);
    };

    return (
        <Grid minH="95vh" alignItems="center">
            {/* LOGIN EXISTING USER */}
            {isMember && <LoginForm toggleMember={toggleMember} />}

            {/* REGISTER NEW USER */}
            {!isMember && <RegisterForm toggleMember={toggleMember} />}
        </Grid>
    );
};

export default RegisterPage;
