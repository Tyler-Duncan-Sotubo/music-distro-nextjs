/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FieldValues, type UseFormRegister } from "react-hook-form";
import Label from "@/components/ui/Label";
import TextInput from "@/components/ui/TextInput";
import { type ArtistDetailsInput } from "../../types/artist.type";
import countries from "@/data/countries.json";
import { type UserInfoErrorObject } from "./errorObject.type";

type UserInfoFormProps = {
  errors: UserInfoErrorObject;
  register: UseFormRegister<ArtistDetailsInput>;
};

const UserInfoForm = ({ errors, register }: UserInfoFormProps) => {
  return (
    <section className="w-full">
      <article className="grid grid-cols-1 gap-2 md:w-full md:grid-cols-2 md:gap-4">
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
        <div />
      </article>
      {/* Artist Bio */}
      <div className="relative mt-10 md:mt-4 md:w-[60%]">
        <Label htmlFor="artistBio">Artist Bio (Max Characters 500)</Label>
        <p className="mb-3 text-[.8rem] font-light">
          If your Artist Bio exceeds the character limit, please paste a link to
          your bio instead.
        </p>
        <textarea
          {...register("artistBio")}
          id="artistBio"
          className="border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 h-40 w-full resize-none rounded-md bg-secondary py-2 shadow-sm focus:ring focus:ring-opacity-50"
        ></textarea>
        {errors.artistBio && (
          <p style={{ color: "red" }}> {errors.artistBio.message}</p>
        )}
      </div>{" "}
    </section>
  );
};

export default UserInfoForm;
