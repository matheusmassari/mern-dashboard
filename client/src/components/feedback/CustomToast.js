import { useToast } from "@chakra-ui/react";

function CustomToast() {
    const toast = useToast();
    const id = "test";

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

export default CustomToast;
