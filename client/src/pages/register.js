import React, { useState } from "react";
import { Grid } from "@chakra-ui/react";

import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";

const RegisterPage = () => {
    const [isMember, setIsMember] = useState(true);
    const toggleMember = () => setIsMember(!isMember);

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
