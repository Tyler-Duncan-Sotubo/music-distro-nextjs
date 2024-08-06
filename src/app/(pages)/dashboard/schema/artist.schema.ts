import * as yup from "yup";

export const ArtistDetailsSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  artistName: yup.string().required("Artist name is required"),
  label: yup.string().required("Label is required"),
  phone: yup.string().required("Phone number is required"),
  country: yup.string().required("Country is required"),
  howDidYouHearAboutUs: yup
    .string()
    .required("How did you hear about us is required"),
  youtube: yup.string(),
  instagram: yup.string(),
  twitter: yup.string(),
  facebook: yup.string(),
  vevo: yup.string(),
});
