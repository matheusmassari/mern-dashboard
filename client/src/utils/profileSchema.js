import * as yup from "yup";

export const profileSchema = yup
    .object()
    .shape({
        username: yup
            .string("Não deve conter caracteres especiais")
            .required("Campo obrigatório")
            .matches(
                /^[a-zA-Z0-9]{4,10}$/,
                "Seu nome não pode conter caracteres especiais."
            ),
        lastName: yup
            .string("Não deve conter caracteres especiais")
            .required("Campo obrigatório")
            .matches(
                /^[a-zA-Z ]*$/,
                "Seu sobrenome não pode conter caracteres especiais."
            ),
        email: yup
            .string()
            .email("Email inválido")
            .required("O email é obrigatório"),
        location: yup
            .string("Não deve conter caracteres especiais")
            .required("Campo obrigatório")
            .matches(
                /^[a-zA-Z ]*$/,
                "Seu sobrenome não pode conter caracteres especiais."
            ),
    })
    .required();
