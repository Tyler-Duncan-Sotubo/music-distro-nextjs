"use client";

import Link from "next/link";
import { useState, useLayoutEffect } from "react";
import {
  type FieldValues,
  type Resolver,
  useForm,
  type UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Label from "@/components/ui/Label";
import TextInput from "@/components/ui/TextInput";
import { Button } from "@/components/ui/Button";
import { type VideoRelease } from "../types/videoRelease.type";
import { VideoReleaseSchema } from "../schema/videoRelease.schema";
import DatePickerForm from "@/components/forms/DatePickerForm";

const RenderVideoReleasePage = () => {
  const [showModal, setShowModal] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>("");
  const vevoPackage = false;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<VideoRelease>({
    resolver: yupResolver(
      VideoReleaseSchema,
    ) as unknown as Resolver<VideoRelease>,
  });

  const onSubmit = async (data: VideoRelease) => {
    try {
      console.log(data);
    } catch (error) {}
  };

  return (
    <>
      {/* Subscription Modal */}
      {!vevoPackage && (
        <>
          {showModal && (
            <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
              <div className="flex h-[30%] w-[80%] flex-col items-center justify-center gap-6 rounded-2xl bg-white px-10 py-6 md:h-[30%] md:w-[40%]">
                <h3 className="text-center text-lg capitalize">
                  You need to subscribe For Vevo Package
                </h3>
                <Link href="/promo">
                  <button className="w-full bg-primary px-3 py-4 text-center text-white">
                    Get Vevo Package
                  </button>
                </Link>
              </div>
            </section>
          )}
        </>
      )}

      {/* header */}
      <div className="flex flex-col items-center gap-6 md:mt-28">
        <h1 className="text-center text-6xl">My Video</h1>
        <h3 className="text-center">
          Get your music on Youtube and Vevo with our video distribution
        </h3>
      </div>

      {/* Release Information */}
      <form onSubmit={handleSubmit(onSubmit)} className="my-10">
        <section className="my-10">
          <div className="gap-16 md:flex md:justify-between md:gap-4">
            {/* Video Title */}
            <div className="relative w-full">
              <Label htmlFor="title">Video Title</Label>
              <TextInput
                register={register as unknown as UseFormRegister<FieldValues>}
                name="title"
                error={errors.title?.message}
                id="lastName"
                type="text"
              />
            </div>

            {/* Video File */}
            <div className="relative mb-10 w-full md:mb-2">
              <div className="md:flex md:justify-between">
                <Label htmlFor="link">Link To Video File</Label>
                <p className="text-gray-700 text-sm font-medium">
                  Drive, Dropbox or WeTransfer
                </p>
              </div>
              <TextInput
                register={register as unknown as UseFormRegister<FieldValues>}
                name="link"
                error={errors.link?.message}
                id="link"
                type="text"
              />
            </div>
          </div>
          {/* Date Picker */}
          <DatePickerForm control={control} setValue={setValue} />

          {/* Press Release  */}
          <div className="relative mb-10 mt-10 w-full md:mt-4">
            <div className="md:flex md:justify-between">
              <Label htmlFor="description">Description</Label>
              <p className="text-gray-700 mb-2 text-sm font-medium">
                Press release, download links, socials and more
              </p>
            </div>
            <textarea
              {...register("description")}
              name="description"
              id="description"
              className="h-44 w-full resize-none rounded-lg bg-secondary py-3"
            ></textarea>
            {errors.description && (
              <p className="text-error">{errors.description.message}</p>
            )}
          </div>

          {/* Keywords */}
          <div className="mt-8 gap-8 md:mt-4 md:flex md:justify-between md:gap-4">
            <div className="relative md:w-2/3">
              <div className="flex-row-between">
                <Label htmlFor="keywords">Keywords</Label>
                <p className="text-gray-700 mb-2 text-sm font-medium">
                  nigerian music, afropop, new music, africa
                </p>
              </div>
              <TextInput
                register={register as unknown as UseFormRegister<FieldValues>}
                name="keywords"
                error={errors.keywords?.message}
                id="keywords"
                type="text"
                className="py-3"
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
