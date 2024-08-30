"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import { useRouter } from "next/navigation";
import {
  type FieldValues,
  type Resolver,
  useForm,
  type UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/ui/TextInput";
import { type CreateTicketInput } from "../types/create-ticket.type";
import { CreateTicketSchema } from "../schema/create-ticket.schema";
import { api } from "@/trpc/react";

type PageProps = {
  setOpenTicketsModal: (value: boolean) => void;
  openTicketsModal: boolean;
};

const CreateTicketModal = ({
  setOpenTicketsModal,
  openTicketsModal,
}: PageProps) => {
  const router = useRouter();
  // Login State Management with Redux
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTicketInput>({
    resolver: yupResolver(CreateTicketSchema) as Resolver<CreateTicketInput>,
  });

  const getTickets = api.ticket.getTickets.useQuery();

  const createTicket = api.ticket.createTicket.useMutation({
    onSuccess: async (data) => {
      await getTickets.refetch();
      setOpenTicketsModal(false);
      router.push("/dashboard/tickets/" + data?.id);
    },
    onError: (error) => {
      setSubmitError(error.message);
    },
  });

  const onSubmit = async (data: CreateTicketInput) => {
    createTicket.mutate({
      title: data.title,
      description: data.description,
      content: data.content,
    });
  };

  return (
    <section className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-70">
      <div className="flex h-[80%] w-[90%] flex-col gap-6 rounded-xl bg-white md:h-[65%] md:w-[40%]">
        <div className="m-0 w-full bg-primaryHover py-5 text-white">
          <div>
            <h2 className="text-center text-xl font-medium">Create a Ticket</h2>
          </div>
        </div>

        <form className="overflow-y-auto px-6">
          <Label htmlFor="description">How can We Help?</Label>
          {/* Description (Radio Buttons) */}
          <div className="my-4 w-full rounded-xl bg-secondary p-3">
            <div className="mt-2 flex flex-col gap-2">
              <label className="flex items-center border-b border-gray py-2">
                <input
                  type="radio"
                  {...register("description", {
                    required: "Please select a description",
                  })}
                  value="Music Release"
                  className="form-radio h-4 w-4 text-primary"
                />
                <span className="text-gray-700 ml-2 text-[.9rem]">
                  Issues with Music Release
                </span>
              </label>
              <label className="flex items-center border-b border-gray py-2">
                <input
                  type="radio"
                  {...register("description", {
                    required: "Please select a description",
                  })}
                  value="Royalty Payment"
                  className="form-radio h-4 w-4 text-primary"
                />
                <span className="text-gray-700 ml-2 text-[.9rem]">
                  Questions about My Royalty Payment
                </span>
              </label>
              <label className="flex items-center py-2">
                <input
                  type="radio"
                  {...register("description", {
                    required: "Please select a description",
                  })}
                  value="Account or Sales Enquiry"
                  className="form-radio h-4 w-4 text-primary"
                />
                <span className="text-gray-700 ml-2 text-[.9rem]">
                  I have an Account or Sales Enquiry
                </span>
              </label>
            </div>
            {errors.description && (
              <p className="mt-2 text-sm text-error">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* title Address */}
          <div>
            <Label htmlFor="title">Title</Label>
            <TextInput
              register={register as unknown as UseFormRegister<FieldValues>}
              name="title"
              error={errors.title?.message}
              id="title"
              type="text"
              placeholder="Enter the title of your ticket"
            />
          </div>

          {/*  content */}
          <div className="mt-4">
            <Label htmlFor=" content">Detailed Description</Label>
            <textarea
              {...register("content")}
              id=" content"
              className="border-gray-300 h-32 w-full resize-none rounded-lg border bg-secondary p-2"
            />
            {errors.content && (
              <p className="mt-2 text-sm text-error">
                {errors.content?.message}
              </p>
            )}
          </div>

          {/* Submit Error */}
          {submitError && (
            <p className="mt-7 text-center text-[.9rem] text-error">
              {submitError}
            </p>
          )}
        </form>
        <div className="mb-5 mt-5 flex justify-between px-6">
          <button
            type="button"
            onClick={() => setOpenTicketsModal(!openTicketsModal)}
            className="text-gray-700 hover:bg-gray-200 rounded-lg bg-secondary px-6 py-2 text-[.9rem] font-medium focus:outline-none"
          >
            Cancel
          </button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Create Ticket
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CreateTicketModal;
