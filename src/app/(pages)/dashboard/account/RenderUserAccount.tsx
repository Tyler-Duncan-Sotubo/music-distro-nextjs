"use client";

import { type ArtistDetailsInput } from "../types/artist.type";
import { type Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArtistDetailsSchema } from "../schema/artist.schema";
import { useState } from "react";
import { type Social, type UserInformation } from "@prisma/client";
import { toast } from "react-toastify";
import { Spinner } from "@/components/common/Spinner";
import UserInfoForm from "./_components/UserInfoForm";
import UserSocialForm from "./_components/UserSocialForm";
import { useRouter } from "next/navigation";
import ProfilePhoto from "@/components/common/ProfilePhoto";
import axios from "@/libs/axios";
import { useSession } from "next-auth/react";
import { QueryClient } from "@tanstack/react-query";

type Props = {
  userInfo: UserInformation | null;
  userSocialUrls: Social | null;
};

const RenderUserAccount = ({ userInfo, userSocialUrls }: Props) => {
  // Router
  const router = useRouter();

  // loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: session } = useSession();

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

  const createUserInfo = async (data: ArtistDetailsInput) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/user-info", {
        ...data,
        user_id: session?.user.id,
      });

      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Profile created successfully", {
          position: "top-center",
        });

        router.push("/dashboard/artist");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Error Updating Profile", {
        position: "top-center",
      });
    }
  };

  const updateUserInfo = async (data: ArtistDetailsInput) => {
    try {
      setIsLoading(true);
      const res = await axios.put("/api/user-info", {
        ...data,
        user_id: session?.user.id,
      });

      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Profile created successfully", {
          position: "top-center",
        });
        await new QueryClient().invalidateQueries({
          queryKey: ["user-info", session?.user.id],
        });
        router.push("/dashboard/artist");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Error Updating Profile", {
        position: "top-center",
      });
    }
  };

  // On Submit
  const onSubmit = async (data: ArtistDetailsInput) => {
    if (userInfo) {
      await updateUserInfo(data);
    } else {
      await createUserInfo(data);
    }
  };

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
