import * as yup from "yup";

export const CreateTicketSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  content: yup.string().required("Comment is required"),
});
