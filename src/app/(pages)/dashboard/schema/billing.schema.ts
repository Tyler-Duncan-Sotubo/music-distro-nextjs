import * as yup from "yup";

export const BillingSchema = yup.object().shape({
  firstName: yup.string().required("Name is required"),
  lastName: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  phone: yup.string().required("Phone is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
});
