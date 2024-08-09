"use client";

import { useLayoutEffect, useState } from "react";
import TextInput from "@/components/ui/TextInput";
import Label from "@/components/ui/Label";
import {
  type Resolver,
  useForm,
  type UseFormRegister,
  type FieldValues,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type IMusicRelease } from "../../types/musicRelease.type";
import { AudioReleaseSchema } from "../../schema/musicRelease.schema";
import genres from "@/data/genres.json";
import languages from "@/data/languages.json";
import { Button } from "@/components/ui/Button";
import { currentYear } from "./../_utils/getCurrentYear";
import VerifySubscriptionModal from "@/components/common/VerifySubscriptionModal";
import DatePickerForm from "@/components/forms/DatePickerForm";
import ReleaseImage from "./../_components/ReleaseImage";
import ReleaseTrack from "./../_components/ReleaseTrack";
import { type Subscriptions } from "@prisma/client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/common/Spinner";
import axios from "@/libs/axios";
import { useSession } from "next-auth/react";

const RenderMusicReleasePage = ({
  userSubscription,
}: {
  userSubscription: Subscriptions | null;
}) => {
  // Music Submission State
  const [releaseCover, setReleaseCover] = useState<string | ArrayBuffer | null>(
    null,
  );
  const [imageFileName, setImageFileName] = useState<string>("");
  const [releaseAudio, setReleaseAudio] = useState<string | ArrayBuffer | null>(
    null,
  );
  const [audioFileName, setAudioFileName] = useState<string>("");

  // Errors States
  const [audioSubmitError, setAudioSubmitError] = useState<string>("");
  const [imageSubmitError, setImageSubmitError] = useState<string>("");
  const [submitError, setSubmitError] = useState<string | null>("");

  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IMusicRelease>({
    resolver: yupResolver(
      AudioReleaseSchema,
    ) as unknown as Resolver<IMusicRelease>,
    defaultValues: {
      copyrightYear: `${currentYear}`,
      productionYear: `${currentYear}`,
    },
  });

  const router = useRouter();

  const user = useSession().data?.user;

  const onSubmit = async (data: IMusicRelease) => {
    if (!releaseCover) {
      setImageSubmitError("An image is required for release");
      return;
    } else {
      setImageSubmitError("");
    }

    if (!releaseAudio && !data.releaseAudioLink) {
      setAudioSubmitError("An audio file is required for release");
      return;
    } else if (data.releaseAudioLink) {
      setAudioSubmitError("");
    }

    setIsLoading(true);
    const res = await axios.post("/api/audio-upload", {
      ...data,
      releaseCover: releaseCover as string,
      releaseAudio: releaseAudio as string,
      imageFileName,
      audioFileName,
      user: user,
    });

    if (res.status === 201) {
      setIsLoading(false);
      toast.success("Music release submitted successfully", {
        position: "top-center",
      });
      router.push("/dashboard");
    }

    if (res.status >= 400) {
      setIsLoading(false);
      setSubmitError("An error occurred while submitting your release");
    }
  };

  // Check if user is subscribed
  const [showModal, setShowModal] = useState(false);

  useLayoutEffect(() => {
    if (userSubscription?.status === "active") {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, [userSubscription]);

  return (
    <>
      {/* Subscription Modal */}
      <VerifySubscriptionModal
        showModal={showModal}
        userSubscription={userSubscription}
      />

      {/* header */}
      <div className="flex flex-col items-center gap-6 md:mt-32">
        <h1 className="text-center text-6xl">Create a new release</h1>
        <h3 className="mx-auto text-center lg:w-[50%]">
          If it’s your first release don’t worry, we’ve got you covered.
          Releasing your music with us is quick and easy.
        </h3>
      </div>

      {/* Release Information */}
      <form className="my-20" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-10 border-b py-10 text-4xl">
          1. Release Information
        </h2>
        <section className="grid grid-cols-1 gap-3 md:w-1/2 md:grid-cols-2">
          <div className="relative mb-2 w-full">
            <Label htmlFor="title">Title</Label>
            <TextInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="title"
              error={errors.title?.message}
              id="lastName"
              type="text"
              className="py-3"
            />
          </div>
          <div className="relative w-full">
            <Label htmlFor="artist">Artist</Label>
            <TextInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="artist"
              error={errors.artist?.message}
              id="lastName"
              type="text"
              className="py-3"
            />
          </div>

          <div className="relative w-full">
            <Label htmlFor="CopyrightHolder">Copyright Holder</Label>
            <TextInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="copyrightHolder"
              error={errors.copyrightHolder?.message}
              id="lastName"
              type="text"
              className="py-3"
            />
          </div>
          <div className="relative w-full">
            <Label htmlFor="copyrightYear">Copyright Year </Label>
            <TextInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="copyrightYear"
              error={errors.copyrightYear?.message}
              id="lastName"
              type="text"
              className="py-3"
            />
          </div>
          <div className="relative w-full">
            <Label htmlFor="productionHolder">Production Holder</Label>
            <TextInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="productionHolder"
              error={errors.productionHolder?.message}
              id="lastName"
              type="text"
              className="py-3"
            />
          </div>
          <div className="relative w-full">
            <Label htmlFor="productionYear">Production Year </Label>
            <TextInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="productionYear"
              error={errors.productionYear?.message}
              id="lastName"
              type="text"
              className="py-3"
            />
          </div>
          <div className="relative w-full">
            <Label htmlFor="label">Label</Label>
            <TextInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="label"
              error={errors.label?.message}
              id="lastName"
              type="text"
              className="py-3"
            />
          </div>

          {/* // Date Picker */}
          <DatePickerForm control={control} setValue={setValue} />
        </section>

        {/* Release Genre */}
        <section className="mb-20">
          <h2 className="mb-10 border-b py-5 text-4xl">2. Release Genres</h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="relative w-full">
              <Label htmlFor="primaryGenre">Primary Genre</Label>
              <select
                {...register("primaryGenre")}
                id="country"
                className="w-full rounded-md capitalize shadow-sm"
              >
                {genres.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.primaryGenre && (
                <p className="text-error"> {errors.primaryGenre.message}</p>
              )}
            </div>
            <div className="relative w-full">
              <Label htmlFor="secondaryGenre">Secondary Genre</Label>
              <select
                {...register("secondaryGenre")}
                id="country"
                className="w-full rounded-md capitalize shadow-sm"
              >
                {genres.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.secondaryGenre && (
                <p className="text-error"> {errors.secondaryGenre.message}</p>
              )}
            </div>
            <div className="relative w-full">
              <Label htmlFor="language">Language</Label>
              <select
                {...register("language")}
                id="country"
                className="w-full rounded-md capitalize shadow-sm"
              >
                {languages.map((language, index) => (
                  <option key={index} value={language}>
                    {language}
                  </option>
                ))}
              </select>
              {errors.language && (
                <p className="text-error"> {errors.language?.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Release Artwork */}
        <ReleaseImage
          imageSubmitError={imageSubmitError}
          setImageFileName={setImageFileName}
          releaseCover={releaseCover}
          setReleaseCover={setReleaseCover}
        />

        {/* Release Lyrics */}
        <h2 className="mb-10 border-b text-4xl">4. Release Lyrics</h2>
        <section>
          <div className="relative w-full">
            <h4 className="mb-4 text-xl font-bold">Add Lyrics Below</h4>
            <textarea
              {...register("lyrics")}
              id="lyrics"
              className="h-96 w-full resize-none rounded-md p-4 shadow-sm"
            />
            {errors.lyrics && (
              <p className="text-error"> {errors.lyrics.message}</p>
            )}
          </div>
        </section>

        {/* Release Audio */}
        <ReleaseTrack
          audioFileName={audioFileName}
          audioSubmitError={audioSubmitError}
          setReleaseAudio={setReleaseAudio}
          setAudioFileName={setAudioFileName}
          setAudioSubmitError={setAudioSubmitError}
        />

        {/* File Download Url */}
        <div className="relative w-full">
          <Label htmlFor="title">Files Download Link</Label>
          <TextInput
            register={register as unknown as UseFormRegister<FieldValues>}
            name="releaseAudioLink"
            error={errors.releaseAudioLink?.message}
            id="lastName"
            type="text"
            className="py-3"
          />
        </div>

        {/* Submission Error */}
        {submitError && <p className="text-error">{submitError}</p>}

        {/* Submit Button */}
        <div className="flex justify-start">
          <Button className="">Submit</Button>
        </div>
      </form>

      {/* Loading Spinner */}
      {isLoading && <Spinner />}
    </>
  );
};

export default RenderMusicReleasePage;
