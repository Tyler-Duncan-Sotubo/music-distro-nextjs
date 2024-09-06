"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { IoIosSend } from "react-icons/io";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface PageProps {
  ticketId: string;
}

const CommentForm = ({ ticketId }: PageProps) => {
  const [content, setContent] = useState<string>("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: ``,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  const tickets = api.ticket.getTicketById.useQuery({
    ticketId,
  });

  const createComment = api.comment.createComment.useMutation({
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = async () => {
    if (!content) return;
    await createComment.mutateAsync({
      ticketId,
      content: content,
    });
    editor?.commands.setContent("");
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
          <div className="my-4">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
      {/*  submit */}
      <div className="flex justify-end">
        <button
          disabled={tickets.data?.status === "CLOSED"}
          onClick={onSubmit}
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
