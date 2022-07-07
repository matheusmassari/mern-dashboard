import * as yup from "yup";

export const profileSchema = yup
    .object()
    .shape({
        name: yup
            .string("Não deve conter caracteres especiais")
            .required("Campo obrigatório")
            .matches(
                /^[a-zA-Z \u00C0-\u00FF]*$/,
                "Seu nome não pode conter caracteres especiais."
            ),
        lastName: yup
            .string("Não deve conter caracteres especiais")
            .required("Campo obrigatório")
            .matches(
                /^[a-zA-Z \u00C0-\u00FF]*$/,
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
                /^[a-zA-Z \u00C0-\u00FF]*$/,
                "Local não pode conter caracteres especiais."
            ),
    })
    .required();
