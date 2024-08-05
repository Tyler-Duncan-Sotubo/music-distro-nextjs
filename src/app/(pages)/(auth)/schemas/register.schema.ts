import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});
