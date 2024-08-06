import * as yup from "yup";

export const AudioReleaseSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  artist: yup.string().required("Artist is required"),
  releaseDate: yup.string().required("Release Date is required"),
  primaryGenre: yup.string().required("Genre is required"),
  secondaryGenre: yup.string().required("Genre is required"),
  lyrics: yup.string(),
  label: yup.string().required("Label is required"),
  productionHolder: yup.string().required("Production Holder is required"),
  productionYear: yup.string().required("Production Year is required"),
  copyrightHolder: yup.string().required("copyright Holder is required"),
  copyrightYear: yup.string().required("copyright Year is required"),
  language: yup.string().required("Language is required"),
  releaseAudioLink: yup.string(),
});
