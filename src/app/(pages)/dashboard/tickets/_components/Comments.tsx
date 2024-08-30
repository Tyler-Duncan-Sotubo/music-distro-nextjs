"use client";

import { type Comment } from "@prisma/client";
import CommentForm from "./CommentForm";
import { api } from "@/trpc/react";
import { formatDate } from "@/helper/dateFormater";
import { RiAdminFill } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";

interface PageProps {
  ticketId: string;
  user:
    | {
        id: string;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
}

const Comments = ({ ticketId, user }: PageProps) => {
  const comments: Comment[] | null | undefined =
    api.comment.getCommentById.useQuery({
      ticketId,
    }).data;

  return (
    <div className="md:w-2/3">
      <CommentForm ticketId={ticketId} />
      <section className="mt-6 rounded-md border border-gray py-4 shadow-2xl">
        <h3 className="border-b border-gray px-10 py-2 font-semibold">
          Ticket Thread
        </h3>
        <div className="mt-4 px-8 md:px-20">
          {comments?.map((comment) => (
            <div
              key={comment.id}
              className="flex justify-between border-b border-gray py-8"
            >
              <div className="flex items-center gap-4">
                <div className="hidden md:block">
                  {comment.userId === user?.id ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-4 border-gray bg-black p-6 text-white">
                      {user?.name?.substring(0, 2).toUpperCase()}
                    </div>
                  ) : (
                    <div className="relative mx-auto my-3 flex h-12 w-12 items-center justify-center rounded-full border-4 border-gray bg-black text-white">
                      <RiAdminFill size={20} className="z-50" />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold">
                    {comment.userId === user?.id ? user?.name : "Admin"}
                  </h4>
                  <p className="text-lg font-light">{comment.content}</p>
                </div>
              </div>
              <div>
                <p>{formatDate(comment.createdAt.toString())}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between px-8 py-4 md:px-20">
          <div className="flex items-center gap-4">
            <div className="relative mx-auto my-3 flex h-14 w-14 items-center justify-center rounded-full border-4 border-gray bg-black text-white">
              <FaInfoCircle size={20} className="z-50" />
            </div>
            <div>
              <p className="font-semibold">System Message</p>
              Ticket Created
            </div>
          </div>
          <div>
            <p>
              {formatDate(
                (comments?.[comments.length - 1]?.createdAt ?? "").toString(),
              )}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Comments;
