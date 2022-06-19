import * as yup from "yup";

export const registerSchema = yup
    .object()
    .shape({
        username: yup
            .string("Não deve conter caracteres especiais")
            .required("Campo obrigatório"),
        email: yup
            .string()
            .email("Email inválido")
            .required("O email é obrigatório"),
        password: yup
            .string()
            .required("Por favor, digite sua senha.")
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "A senha deve conter pelo menos 8 caracteres, uma maiúscula, um número e um caractere especial."
            ),
    })
    .required();
