import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
  shouldRemember: yup.boolean(),
});
