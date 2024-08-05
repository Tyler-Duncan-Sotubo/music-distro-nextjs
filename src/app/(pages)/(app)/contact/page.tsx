"use client";

import { Button } from "@/app/_components/Button";
import { toast } from "react-toastify";
import Label from "@/app/_components/Label";
import {
  type FieldValues,
  type Resolver,
  useForm,
  type UseFormRegister,
  type SubmitHandler,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type ContactInput } from "./types/contactInput.type";
import { ContactSchema } from "./schema/contactInput.schema";
import TextInput from "@/app/_components/TextInput";
import emailjs from "@emailjs/browser";
import SocialIcons from "./SocialIcons";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: yupResolver(ContactSchema) as Resolver<ContactInput>,
  });

  const onSubmit: SubmitHandler<ContactInput> = (data, e): void => {
    let subject = "";

    if (data.general) {
      subject = "General";
    } else if (data.digital_distribution) {
      subject = "Digital distribution";
    } else if (data.payment_error) {
      subject = "Payment Error";
    }

    // send email
    const emailData = {
      email: data.email,
      name: data.name,
      message: data.message,
      subject,
    };

    emailjs
      .send(
        "service_ai7oteq",
        "template_brr0qvb",
        emailData,
        "CyMbXRk8pnr8YsgLJ",
      )
      .then(
        (result) => {
          if (result.text === "OK") {
            toast.success("Message sent", {
              position: "top-right",
            });
            if (e) {
              (e.target as HTMLFormElement).reset();
            }
          }
        },
        (error: { text: string }) => {
          console.log(error.text);
        },
      );
  };

  const Divider = () => (
    <div className="my-10 flex items-center">
      <div className="border-gray-300 w-1/2 border-t-4 border-primary md:w-1/3"></div>
    </div>
  );

  return (
    <div className="mx-auto mb-6 mt-12 w-[90%] md:mt-40">
      <h1 className="text-6xl">Contact Us</h1>
      <Divider />
      {/* Social Media Links */}
      <SocialIcons />

      {/* Email form*/}
      <form onSubmit={handleSubmit(onSubmit)} className="my-20 md:w-1/2">
        {/* Name */}
        <div>
          <Label htmlFor="Name">Full Name</Label>
          <TextInput
            register={register as unknown as UseFormRegister<FieldValues>}
            name="name"
            error={errors.name?.message}
            id="email"
            type="text"
          />
        </div>

        {/* Email Address */}
        <div>
          <Label htmlFor="email">Email</Label>
          <TextInput
            register={register as unknown as UseFormRegister<FieldValues>}
            name="email"
            error={errors.email?.message}
            id="email"
            type="email"
          />
        </div>

        {/* Nature Of Enquiry */}
        <section>
          <Label htmlFor="natureOfEnquiry">
            What&apos;s the nature of your inquiry? (Select all that apply)
          </Label>
          <div className="mt-6 flex items-center justify-between">
            <label
              htmlFor="general"
              className="inline-flex items-center"
              data-testid="remember me"
            >
              <input
                id="general"
                type="checkbox"
                {...register("general")}
                className="border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring-indigo-200 rounded shadow-sm focus:ring focus:ring-opacity-50"
              />
              <span className="text-gray-600 ml-2 text-sm">General</span>
            </label>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <label
              htmlFor="digital_distribution"
              className="inline-flex items-center"
              data-testid="remember me"
            >
              <input
                id="digital_distribution"
                type="checkbox"
                {...register("digital_distribution")}
                className="border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring-indigo-200 rounded shadow-sm focus:ring focus:ring-opacity-50"
              />
              <span className="text-gray-600 ml-2 text-sm">
                Digital distribution
              </span>
            </label>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <label
              htmlFor="payment_error"
              className="inline-flex items-center"
              data-testid="remember me"
            >
              <input
                id="payment_error"
                type="checkbox"
                {...register("payment_error")}
                className="border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring-indigo-200 rounded shadow-sm focus:ring focus:ring-opacity-50"
              />
              <span className="text-gray-600 ml-2 text-sm">Payment Error</span>
            </label>
          </div>
        </section>

        {/* Subject */}
        <div className="my-10">
          <Label htmlFor="subject" className="text-xl">
            Tell us more *
          </Label>
          <textarea
            className="border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 h-60 w-full resize-none rounded-md bg-secondary shadow-sm outline-none focus:ring focus:ring-opacity-50"
            {...register("message")}
          ></textarea>
        </div>

        <div className="mt-10 flex items-center">
          <Button className="px-8">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
