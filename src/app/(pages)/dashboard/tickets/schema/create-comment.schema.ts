import * as yup from "yup";

export const CreateCommentSchema = yup.object().shape({
  content: yup.string().required("Comment is required"),
});
