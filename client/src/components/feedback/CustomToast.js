import { useToast } from "@chakra-ui/react";
import { useState } from "react";

function CustomToast({ alertType }) {
    const toast = useToast();
    const [id, setId] = useState("test");

    if (alertType === "success") {
        if (!toast.isActive(id)) {
            toast({
                id,
                position: "top",
                title: "Profile Updated.",
                description: "Your profile has been successfully updated.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        }
    }
    if (alertType === "danger") {
        if (!toast.isActive(id)) {
            toast({
                id,
                position: "top",
                title: "Something went wrong.",
                description: "Try again later.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }
}

export default CustomToast;
