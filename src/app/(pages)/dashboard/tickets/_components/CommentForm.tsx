"use client";

import { type Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateCommentSchema } from "../schema/create-comment.schema";
import { type CreateCommentInput } from "../types/create-comment.type";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { IoIosSend } from "react-icons/io";

interface PageProps {
  ticketId: string;
}

const CommentForm = ({ ticketId }: PageProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCommentInput>({
    resolver: yupResolver(CreateCommentSchema) as Resolver<CreateCommentInput>,
  });

  const comments = api.comment.getCommentById.useQuery({
    ticketId,
  });

  const tickets = api.ticket.getTicketById.useQuery({
    ticketId,
  });

  const createComment = api.comment.createComment.useMutation({
    onSuccess: async () => {
      await comments.refetch();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = async (data: CreateCommentInput) => {
    await createComment.mutateAsync({
      ticketId,
      content: data.content,
    });
    reset({ content: "" });
  };

  const { data: session } = useSession();

  return (
    <section className="rounded-md border border-gray px-10 py-4 shadow-lg">
      {/*  content */}
      <div className="mt-4 justify-between md:flex">
        <div className="mt-10 hidden h-8 w-8 items-center justify-center rounded-full border-4 border-gray bg-black p-6 text-white md:flex">
          {session?.user?.name?.substring(0, 2).toUpperCase() ?? ""}
        </div>
        <div className="md:w-[90%]">
          <label htmlFor="content" className="text-xl font-semibold">
            Reply
          </label>
          <textarea
            {...register("content")}
            id=" content"
            className="my-2 h-32 w-full resize-none rounded-lg border-2 border-gray p-2"
            disabled={tickets.data?.status === "CLOSED"}
          />
          {errors.content && (
            <p className="mt-2 text-sm text-error">{errors.content?.message}</p>
          )}
        </div>
      </div>
      {/*  submit */}
      <div className="flex justify-end">
        <button
          disabled={tickets.data?.status === "CLOSED"}
          onClick={handleSubmit(onSubmit)}
          type="submit"
          className="cursor-pointer"
        >
          <IoIosSend size={40} />
        </button>
      </div>
    </section>
  );
};

export default CommentForm;
