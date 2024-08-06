"use client";

import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import TextInput from "@/components/TextInput";
import Label from "@/components/Label";
import { Resolver, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMusicRelease } from "../types/musicRelease.type";
import { AudioReleaseSchema } from "../schema/musicRelease.schema";
import genres from "@/data/genres.json";
import languages from "@/data/languages.json";
import { FaImage, FaUpload, FaArrowLeftLong } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import Button from "@/components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMusic } from "@/hooks/music";
import Link from "next/link";
import VerifySubscriptionModal from "@/components/VerifySubscriptionModal";

const RenderMusicReleasePage = ({ userSubscription, user }: any) => {
  const [releaseCover, setReleaseCover] = useState<string | ArrayBuffer | null>(
    null
  );
  const [imageFileName, setImageFileName] = useState<string>("");
  const [releaseAudio, setReleaseAudio] = useState<string | ArrayBuffer | null>(
    null
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const [audioFileName, setAudioFileName] = useState<string>("");
  const [audioSubmitError, setAudioSubmitError] = useState<string>("");
  const [imageSubmitError, setImageSubmitError] = useState<string>("");
  const [submitError, setSubmitError] = useState<string | null>("");

  var tenDaysFromCurrentDate = new Date();
  tenDaysFromCurrentDate.setDate(tenDaysFromCurrentDate.getDate() + 10);

  // Date Picker
  const [startDate, setStartDate] = useState<any>(tenDaysFromCurrentDate);
  const handleDateChange = (dateChange: any) => {
    const ISOdate = dateChange.toISOString();
    setValue("releaseDate", ISOdate, {
      shouldDirty: true,
    });
    setStartDate(ISOdate);
  };

  // get current year
  const currentYear = new Date().getFullYear();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IMusicRelease>({
    resolver: yupResolver(AudioReleaseSchema) as unknown as Resolver<
      IMusicRelease,
      any
    >,
    defaultValues: {
      copyrightYear: `${currentYear}`,
      productionYear: `${currentYear}`,
    },
  });

  // image upload functions
  const handleDrop = (event: any) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImage(file);
  };

  const handleImage = (file: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      setReleaseCover(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    setImageFileName(file.name);
    handleImage(file);
  };
  // end of image upload functions

  // Audio upload functions
  const handleAudioDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleAudio(file);
  };

  const handleAudio = (file: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      setReleaseAudio(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAudioDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleAudioInputChange = (e: any) => {
    setUploadProgress(0);
    const file = e.target.files[0];
    setAudioFileName(file.name);
    handleAudio(file);
    handleUpload();
  };

  const handleUpload = () => {
    // Simulating upload process
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 20;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 300);
  };

  const cancelAudioUpload = (e: any) => {
    e.preventDefault();
    setUploadProgress(0);
    setReleaseAudio(null);
    setAudioFileName("");
  };

  // Submit Music to backend
  const { uploadUserMusic } = useMusic();
  const onSubmit = (data: IMusicRelease) => {
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

    uploadUserMusic({
      ...data,
      user,
      releaseCover,
      releaseAudio,
      audioFileName,
      imageFileName,
      setSubmitError,
    });
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
        pageTitle="Upload Music"
      />

      {/* header */}
      <div className="flex flex-col items-center gap-6 md:mt-32">
        <h1 className="text-6xl text-center ">My Music</h1>
        <h3>
          Get your music on iTunes, Spotify, Apple Music, Amazon, Google Play,
          Tidal and 100+ more DSPs
        </h3>
      </div>

      {/* Release Information */}
      <form className="my-20" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-4xl mb-10 border-b py-10">
          1. Release Information
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-2 md:w-1/2 gap-3">
          <div className="relative w-full mb-2">
            <Label htmlFor="title">Title</Label>
            <TextInput
              register={register}
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
              register={register}
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
              register={register}
              name="copyrightHolder"
              error={errors.copyrightYear?.message}
              id="lastName"
              type="text"
              className="py-3"
            />
          </div>
          <div className="relative w-full">
            <Label htmlFor="copyrightYear">Copyright Year </Label>
            <TextInput
              register={register}
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
              register={register}
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
              register={register}
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
              register={register}
              name="label"
              error={errors.label?.message}
              id="lastName"
              type="text"
              className="py-3"
            />
          </div>

          <div className="-mt-6 md:-mt-0.5 mb-2">
            <Label htmlFor="Release Date">Release Date</Label>
            <Controller
              name="releaseDate"
              control={control}
              defaultValue={startDate}
              render={() => (
                <DatePicker
                  selected={startDate}
                  placeholderText="Select date"
                  minDate={tenDaysFromCurrentDate}
                  onChange={(date: Date) => handleDateChange(date)}
                  className="w-full py-3 bg-secondary rounded-lg"
                  wrapperClassName="w-full"
                />
              )}
            />
          </div>
        </section>

        {/* Release Genre */}
        <section className="mb-20 ">
          <h2 className="text-4xl border-b py-5 mb-10">2. Release Genres</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="relative w-full">
              <Label htmlFor="primaryGenre">Primary Genre</Label>
              <select
                {...register("primaryGenre")}
                id="country"
                className="w-full rounded-md shadow-sm capitalize">
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
                className="w-full rounded-md shadow-sm capitalize">
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
                className="w-full rounded-md shadow-sm capitalize">
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
        <h2 className="text-4xl border-b py-5 mb-10">3. Release Artwork</h2>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          <div className="relative flex h-[400px] md:w-[400px] w-full text-4xl items-center justify-center bg-gray shadow-2xl  uppercase">
            {releaseCover ? (
              <Image src={releaseCover.toString()} alt="Uploaded" fill />
            ) : (
              <p>No Image</p>
            )}
          </div>
          <div className="border-2 border-dashed p-4">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex h-full items-center justify-center shadow-2xl bg-secondary ">
              <label className="w-64 flex flex-col items-center px-4 py-6  text-primary tracking-wide cursor-pointer">
                <FaImage size={60} />
                <span className="my-6 text-center font-bold">
                  Drag and drop an image
                </span>
                <span className="mt-2 font-bold leading-normal rounded-3xl border-2 px-6 py-3">
                  Select a file
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInputChange}
                />
              </label>
            </div>
          </div>

          {/* Image instructions */}
          <div className="">
            <h3 className="text-2xl tracking-wider">Artwork Guidelines</h3>
            <p className="text-sm my-4">
              Cover art must be a square .jpg or .jpeg file, at least 3000x3000
              pixels, not blurry or pixelated and no more than 10mb in size.
            </p>
            <p className="text-sm tracking-wider my-4">
              Cover art cannot contain: - Social media logos or handles -
              Website links or brand/record label logos - Any text except for
              artist names and/or the name of the release
            </p>
            <p className="text-sm my-4 tracking-wider">
              If your cover art contains any of the above, we will have to
              reject your release. These rules are set by the music stores and
              we have to follow them.
            </p>
          </div>
        </section>
        {imageSubmitError && <p className="text-error">{imageSubmitError}</p>}
        {/* Release Lyrics */}
        <h2 className="text-4xl border-b py-5 mb-10">4. Release Lyrics</h2>
        <section>
          <div className="relative w-full">
            <h4 className="text-xl font-bold mb-4">Add Lyrics Below</h4>
            <textarea
              {...register("lyrics")}
              id="lyrics"
              className="w-full h-96 rounded-md shadow-sm resize-none p-4"
            />
            {errors.lyrics && (
              <p className="text-error"> {errors.lyrics.message}</p>
            )}
          </div>
        </section>

        {/* Release Track */}
        <h2 className="text-4xl border-b py-10 mb-10">5. Release Track</h2>
        <section className="my-10 min-h-60">
          {/* Upload Audio file Input */}
          <div className="border-2 border-dashed p-4 h-[100px]">
            <div
              onDrop={handleAudioDrop}
              onDragOver={handleAudioDragOver}
              className="flex h-full items-center justify-center">
              <label className="flex items-center px-4 py-6 gap-4 text-primary tracking-wide cursor-pointer">
                <FaUpload size={30} />
                <span className="text-lg">
                  {uploadProgress <= 0
                    ? "Drag and drop an audio file"
                    : uploadProgress < 100 && uploadProgress > 0
                    ? "Uploading"
                    : "Drag and drop an audio file"}
                </span>
                <input
                  type="file"
                  accept=".mp3,.wav"
                  className="hidden"
                  onChange={handleAudioInputChange}
                />
              </label>
            </div>
          </div>
          {audioSubmitError && (
            <p className="text-error my-2">{audioSubmitError}</p>
          )}
          {/* Audio Progress */}
          <div className="my-5">
            {audioFileName && (
              <div className="flex justify-between items-center">
                <p>{audioFileName}</p>
                <button
                  onClick={cancelAudioUpload}
                  className="bg-red-500 text-black px-4 py-2 rounded-md">
                  <MdCancel size={30} />
                </button>
              </div>
            )}
            {/* Audio Progress */}
            {uploadProgress > 0 && (
              <div className="flex items-center gap-2 h-[10px] rounded-md bg-zinc-900">
                <div
                  style={{
                    width: `${uploadProgress}%`,
                    height: "10px",
                    backgroundColor: "green",
                    borderRadius: "5px",
                  }}
                />
              </div>
            )}
          </div>

          <div className="relative w-full mt-6">
            <Label htmlFor="title">Files Download Link</Label>
            <TextInput
              register={register}
              name="releaseAudioLink"
              error={errors.releaseAudioLink?.message}
              id="lastName"
              type="text"
              className="py-3"
            />
          </div>
        </section>

        {/* Submission Error */}
        {submitError && <p className="text-error">{submitError}</p>}

        {/* Submit Button */}
        <div className="flex justify-start">
          <Button className="">Submit</Button>
        </div>
      </form>
    </>
  );
};

export default RenderMusicReleasePage;
