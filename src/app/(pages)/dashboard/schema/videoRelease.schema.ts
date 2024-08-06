import * as yup from "yup";

export const VideoReleaseSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  releaseDate: yup.string().required("Release Date is required"),
  keywords: yup.string().required("Keywords is required"),
  description: yup.string().required("Description is required"),
  link: yup.string().required("Language is required"),
});
