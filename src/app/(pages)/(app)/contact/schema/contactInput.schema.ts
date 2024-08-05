import * as yup from "yup";

export const ContactSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is a required field"),
  message: yup.string().required("Message is a required field"),
  name: yup.string().required("Name is a required field"),
  general: yup.boolean(),
  digital_distribution: yup.boolean(),
  payment_error: yup.boolean(),
});
