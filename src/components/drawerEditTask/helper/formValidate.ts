import * as Yup from "yup";
import i18n from "i18next";

export const formValidate = () => {
  return Yup.object().shape({
    name: Yup.string().required(i18n.t("generic.required_input_value")),
    description: Yup.string(),
    items: Yup.array().of(Yup.string().required(i18n.t("generic.required_input_value"))).strict(),
  });
};
