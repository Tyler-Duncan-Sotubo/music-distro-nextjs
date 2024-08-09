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
  artistBio: yup.string().max(500, "Bio must be less than 500 characters"),
  apple: yup.string().url("Apple link must be a valid URL"),
  spotify: yup.string().url("Spotify link must be a valid URL"),
  instagram: yup.string().url("Instagram link must be a valid URL"),
  youtube: yup.string().url("YouTube link must be a valid URL"),
  facebook: yup.string().url("Facebook link must be a valid URL"),
  tiktok: yup.string().url("TikTok link must be a valid URL"),
  twitter: yup.string().url("Twitter link must be a valid URL"),
  soundcloud: yup.string().url("Soundcloud link must be a valid URL"),
  website: yup.string().url("Website link must be a valid URL"),
});
