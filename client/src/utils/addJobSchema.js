import * as yup from "yup";

export const addJobSchema = yup
    .object()
    .shape({
        position: yup
            .string("Não deve conter caracteres especiais")
            .required("Campo obrigatório")
            .matches(
                /^[a-zA-Z \u00C0-\u00FF]*$/,
                "Seu nome não pode conter caracteres especiais."
            ),
        company: yup
            .string("Não deve conter caracteres especiais")
            .required("Campo obrigatório")
            .matches(
                /^[a-zA-Z \u00C0-\u00FF]*$/,
                "Seu sobrenome não pode conter caracteres especiais."
            ),
        jobLocation: yup.string("Algo deu errado!").required("Campo obrigatório"),
        jobType: yup.string("Algo deu errado!").required("Campo obrigatório"),
        status: yup.string("Algo deu errado!").required("Campo obrigatório"),
    })
    .required();
