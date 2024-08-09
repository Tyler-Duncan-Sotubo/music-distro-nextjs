"use client";

import { type ArtistDetailsInput } from "../types/artist.type";
import { type Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArtistDetailsSchema } from "../schema/artist.schema";
import { useState, useEffect } from "react";
import { type Social, type UserInformation } from "@prisma/client";
import { api } from "@/trpc/react";
import { toast } from "react-toastify";
import { Spinner } from "@/components/common/Spinner";
import UserInfoForm from "./_components/UserInfoForm";
import UserSocialForm from "./_components/UserSocialForm";
import { useRouter } from "next/navigation";
import ProfilePhoto from "@/components/common/ProfilePhoto";

type Props = {
  userInfo: UserInformation | null;
  userSocialUrls: Social;
};

const RenderUserAccount = ({ userInfo, userSocialUrls }: Props) => {
  // Router
  const router = useRouter();

  // State to handle submit error
  const [submitError, setSubmitError] = useState<string>("");
  // loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      country: userInfo?.country ?? "",
      artistBio: userInfo?.artistBio ?? "",
      apple: userSocialUrls?.apple ?? "",
      spotify: userSocialUrls?.spotify ?? "",
      youtube: userSocialUrls?.youtube ?? "",
      instagram: userSocialUrls?.instagram ?? "",
      twitter: userSocialUrls?.twitter ?? "",
      facebook: userSocialUrls?.facebook ?? "",
      tiktok: userSocialUrls?.tiktok ?? "",
      soundcloud: userSocialUrls?.soundcloud ?? "",
      website: userSocialUrls?.website ?? "",
    },
  });

  const createUserInfo = api.user.createUserInfo.useMutation({
    onSuccess: () => {
      toast.success("Profile created successfully", {
        position: "top-center",
      });
      setSubmitError("");
      router.push("/dashboard/artist");
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
      router.push("/dashboard/artist");
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

  // Set loading state
  useEffect(() => {
    if (createUserInfo.isPending || updateUserInfo.isPending) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [createUserInfo.isPending, updateUserInfo.isPending]);

  return (
    <>
      <h1 className="text-center text-5xl lg:mt-32">My Account</h1>
      <h3 className="mt-5 text-center">
        Update Your profile with artist information and all social media handles
      </h3>
      <section className="my-8 lg:px-10">
        <section className="mb-6 flex w-full flex-col gap-12 lg:flex-row">
          {/* artist Image */}
          <ProfilePhoto />
          {/* Artist information form */}
          <form onSubmit={handleSubmit(onSubmit)} className="lg:w-3/4">
            {/* // UserInfoForm component */}
            <h2 className="mb-6 border-b border-dashed py-6 text-4xl">
              1. Personal Information
            </h2>
            <UserInfoForm errors={errors} register={register} />

            {/* Social Media  component */}
            <h2 className="mb-10 border-b border-dashed py-6 text-4xl">
              2. Social Media
            </h2>
            <UserSocialForm errors={errors} register={register} />

            {/* submit error */}
            {submitError && <p className="my-5 text-error">{submitError}</p>}
            {/* Save Changes */}
            <div className="my-10">
              <button className="w-1/4 rounded-md bg-primary py-2 text-white">
                Save
              </button>
            </div>
          </form>
        </section>
      </section>
      {isLoading && <Spinner />}
    </>
  );
};

export default RenderUserAccount;
