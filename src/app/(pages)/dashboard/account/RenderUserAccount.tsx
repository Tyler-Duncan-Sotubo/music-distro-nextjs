"use client";

import SocialInput from "@/app/_components/SocialMediaInput";
import Label from "@/app/_components/Label";
import TextInput from "@/app/_components/TextInput";
import { type ArtistDetailsInput } from "../types/artist.type";
import {
  type FieldValues,
  type Resolver,
  useForm,
  type UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArtistDetailsSchema } from "../schema/artist.schema";
import countries from "@/data/countries.json";
import { useState } from "react";
import { type UserInformation } from "@prisma/client";
import { api } from "@/trpc/react";
import { toast } from "react-toastify";

type Props = {
  userInfo: UserInformation | null;
};

const RenderUserAccount = ({ userInfo }: Props) => {
  // State to handle submit error
  const [submitError, setSubmitError] = useState<string>("");

  // Form Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArtistDetailsInput>({
    resolver: yupResolver(ArtistDetailsSchema) as Resolver<ArtistDetailsInput>,
    defaultValues: {
      firstName: userInfo?.firstName,
      lastName: userInfo?.lastName ?? "",
      artistName: userInfo?.artistName ?? "",
      label: userInfo?.label ?? "",
      phone: userInfo?.phone ?? "",
      howDidYouHearAboutUs: userInfo?.howDidYouHearAboutUs ?? "",
      twitter: userInfo?.twitter ?? "",
      vevo: userInfo?.vevo ?? "",
      facebook: userInfo?.facebook ?? "",
      instagram: userInfo?.instagram ?? "",
      youtube: userInfo?.youtube ?? "",
    },
  });

  const createUserInfo = api.user.createUserInfo.useMutation({
    onSuccess: () => {
      toast.success("Profile created successfully", {
        position: "top-center",
      });
      setSubmitError("");
    },
    onError: (error) => {
      setSubmitError(error.message);
    },
  });

  const updateUserInfo = api.user.updateUserInfo.useMutation({
    onSuccess: () => {
      toast.success("Profile updated successfully", {
        position: "top-center",
      });
      setSubmitError("");
    },
    onError: (error) => {
      setSubmitError(error.message);
    },
  });

  // On Submit
  const onSubmit = (data: ArtistDetailsInput) => {
    if (userInfo) {
      updateUserInfo.mutate(data);
    } else {
      createUserInfo.mutate(data);
    }
  };

  return (
    <>
      <h1 className="text-center text-5xl md:mt-32">My Account</h1>
      <h3 className="mt-5 text-center">
        Update Your profile with artist information and all social media handles
      </h3>
      {/* Artist information form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto my-10">
        <h2 className="mb-10 border-b border-dashed py-10 text-4xl">
          1. Personal Information
        </h2>
        <article className="grid grid-cols-1 gap-2 md:w-[60%] md:grid-cols-2 md:gap-4">
          {/* First Name */}
          <div className="relative w-full">
            <Label htmlFor="firstName">First Name</Label>
            <TextInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="firstName"
              error={errors.firstName?.message}
              id="firstName"
              type="text"
            />
          </div>

          {/* Last Name */}
          <div className="relative w-full">
            <Label htmlFor="lastName">Last Name</Label>
            <TextInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="lastName"
              error={errors.lastName?.message}
              id="lastName"
              type="text"
            />
          </div>
          {/* Artist Name */}
          <div className="relative w-full">
            <Label htmlFor="artistName">Artist Name</Label>
            <TextInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="artistName"
              error={errors.artistName?.message}
              id="artistName"
              type="text"
            />
          </div>

          {/* Label */}
          <div className="relative w-full">
            <Label htmlFor="label">Label</Label>
            <TextInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="label"
              error={errors.label?.message}
              id="label"
              type="text"
            />
          </div>

          {/* Phone Number */}
          <div className="relative w-full">
            <Label htmlFor="phone">Phone Number</Label>
            <TextInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="phone"
              error={errors.phone?.message}
              id="phone"
              type="text"
            />
          </div>
          {/* Country */}
          <div className="relative w-full">
            <Label htmlFor="country">Country</Label>
            <select
              {...register("country")}
              id="country"
              className="w-full rounded-md shadow-sm"
            >
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && (
              <p style={{ color: "red" }}> {errors.country.message}</p>
            )}
          </div>

          {/* How did you hear about us */}
          <div className="relative mt-6 w-full md:mt-0">
            <Label htmlFor="howDidYouHearAboutUs">
              How did you hear about us
            </Label>
            <TextInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="howDidYouHearAboutUs"
              error={errors.howDidYouHearAboutUs?.message}
              id="howDidYouHearAboutUs"
              type="text"
            />
          </div>
        </article>

        {/* Social Media */}
        <h2 className="mb-10 border-b border-dashed py-10 text-4xl">
          2. Social Media
        </h2>

        <article className="grid grid-cols-1 gap-2 md:grid-cols-5 md:gap-4">
          {/* Twitter */}
          <div className="relative w-full">
            <Label htmlFor="twitter">Twitter</Label>
            <SocialInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="twitter"
              error={errors.twitter?.message}
              id="twitter"
              type="text"
            />
          </div>

          {/* Vevo */}
          <div className="relative w-full">
            <Label htmlFor="vevo">Vevo</Label>
            <SocialInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="vevo"
              error={errors.vevo?.message}
              id="vevo"
              type="text"
            />
          </div>

          {/* Facebook */}
          <div className="relative w-full">
            <Label htmlFor="facebook">Facebook</Label>
            <SocialInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="facebook"
              error={errors.facebook?.message}
              id="facebook"
              type="text"
            />
          </div>
          {/* Instagram */}
          <div className="relative w-full">
            <Label htmlFor="instagram">Instagram</Label>
            <SocialInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="instagram"
              error={errors.instagram?.message}
              id="instagram"
              type="text"
            />
          </div>
          {/* Youtube */}
          <div className="relative w-full">
            <Label htmlFor="youtube">Youtube</Label>
            <TextInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="youtube"
              error={errors.youtube?.message}
              id="howDidYouHearAboutUs"
              type="text"
            />
          </div>
        </article>
        {/* submit error */}
        {submitError && <p className="my-5 text-error">{submitError}</p>}
        {/* Save Changes */}
        <div className="my-10">
          <button className="w-1/4 rounded-md bg-primary py-2 text-white">
            Save Details
          </button>
        </div>
      </form>
    </>
  );
};

export default RenderUserAccount;
