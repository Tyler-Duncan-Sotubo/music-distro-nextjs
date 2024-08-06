"use client";

import Link from "next/link";
import { useState, useLayoutEffect } from "react";
import { Resolver, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Label from "@/components/Label";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { VideoRelease } from "../types/videoRelease.type";
import { VideoReleaseSchema } from "../schema/videoRelease.schema";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMusic } from "@/hooks/music";
import { useAppSelector } from "@/redux/hooks/hooks";
import VerifySubscriptionModal from "@/components/VerifySubscriptionModal";

const RenderVideoReleasePage = ({ userSubscription }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>("");
  const vevoPackage = false;

  useLayoutEffect(() => {
    if (userSubscription?.status === "active") {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, [userSubscription]);

  // Date Picker
  const [startDate, setStartDate] = useState<any>(new Date());
  const handleDateChange = (dateChange: any) => {
    const ISOdate = dateChange.toISOString();
    setValue("releaseDate", ISOdate, {
      shouldDirty: true,
    });
    setStartDate(ISOdate);
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<VideoRelease>({
    resolver: yupResolver(VideoReleaseSchema) as unknown as Resolver<
      VideoRelease,
      any
    >,
  });

  // Upload video to backend
  const { uploadVideo } = useMusic();
  const onSubmit = async (data: VideoRelease) => {
    uploadVideo({ setSubmitError, ...data });
  };

  // get user email
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      {/* Subscription Modal */}
      {!vevoPackage && (
        <>
          {!showModal && (
            <section className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
              <div className="bg-white px-10 flex flex-col gap-6 justify-center items-center py-6 w-[80%] h-[30%] md:w-[40%] md:h-[30%] rounded-2xl">
                <h3 className="text-lg text-center capitalize">
                  You need to subscribe For Vevo Package
                </h3>
                <Link href="/promo">
                  <button className="px-3 py-4 w-full text-center text-white bg-primary">
                    Get Vevo Package
                  </button>
                </Link>
              </div>
            </section>
          )}
        </>
      )}

      <VerifySubscriptionModal
        showModal={showModal}
        pageTitle="Upload video"
        userSubscription={userSubscription}
      />

      {/* header */}
      <div className="flex flex-col items-center gap-6 md:mt-28">
        <h1 className="text-6xl text-center">My Video</h1>
        <h3 className="text-center">
          Get your music on Youtube and Vevo with our video distribution
        </h3>
      </div>

      {/* Release Information */}
      <form onSubmit={handleSubmit(onSubmit)} className="my-10">
        <section className="my-10">
          <div className="md:flex-row-between gap-16 md:gap-4">
            <div className="relative w-full">
              <Label htmlFor="title">Video Title</Label>
              <TextInput
                register={register}
                name="title"
                error={errors.title?.message}
                id="lastName"
                type="text"
              />
            </div>
            <div className="relative w-full">
              <div className="flex-row-between">
                <Label htmlFor="link">Link To Video File</Label>
                <p className="font-medium text-sm text-gray-700 mb-2">
                  Drive, Dropbox or WeTransfer
                </p>
              </div>
              <TextInput
                register={register}
                name="link"
                error={errors.link?.message}
                id="link"
                type="text"
              />
            </div>
          </div>
          <div className="relative w-full mt-10 md:mt-4 md: mb-10">
            <div className="md:flex-row-between">
              <Label htmlFor="description">Description</Label>
              <p className="font-medium text-sm text-gray-700 mb-2">
                Press release, download links, socials and more
              </p>
            </div>
            <textarea
              {...register("description")}
              name="description"
              id="description"
              className="resize-none py-3 w-full bg-secondary rounded-lg h-44"></textarea>
            {errors.description && (
              <p className="text-error">{errors.description.message}</p>
            )}
          </div>
          <div className="md:flex-row-between md:gap-4 gap-8 mt-8 md:mt-4">
            <div className="relative md:w-2/3">
              <div className="flex-row-between">
                <Label htmlFor="keywords">Keywords</Label>
                <p className="font-medium text-sm text-gray-700 mb-2">
                  nigerian music, afropop, new music, africa
                </p>
              </div>
              <TextInput
                register={register}
                name="keywords"
                error={errors.keywords?.message}
                id="keywords"
                type="text"
                className="py-3"
              />
            </div>
            <div className="relative md:w-1/3 md:-mt-6">
              <Label htmlFor="releaseDate">Release Date</Label>
              <Controller
                name="releaseDate"
                control={control}
                defaultValue={startDate}
                render={() => (
                  <DatePicker
                    selected={startDate}
                    placeholderText="Select date"
                    minDate={new Date()}
                    onChange={(date: Date) => handleDateChange(date)}
                    className="w-full py-3 bg-secondary rounded-lg"
                    wrapperClassName="w-full"
                  />
                )}
              />
            </div>
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

export default RenderVideoReleasePage;
