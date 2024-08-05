import * as yup from "yup";

export const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is a required field"),
});
