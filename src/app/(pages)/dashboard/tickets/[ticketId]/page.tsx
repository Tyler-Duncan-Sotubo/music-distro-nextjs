import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { FaListCheck } from "react-icons/fa6";
import TicketSidebar from "../_components/TicketSidebar";
import { NavLink } from "@/components/navigation/NavLinks";
import { revalidatePath } from "next/cache";
import CommentForm from "../_components/CommentForm";
import { formatDate } from "@/helper/dateFormater";
import { RiAdminFill } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";
import { RefreshCache } from "@/helper/refresh-cache";
import parse from "html-react-parser";

interface PageProps {
  params: {
    ticketId: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { ticketId } = params;
  const session = await getServerAuthSession();
  const ticket = await api.ticket.getTicketById({ ticketId });
  const user = session?.user;

  const comments = await api.comment.getCommentById({
    ticketId,
  });

  const ticketChanged = ticket?.updatedAt.getTime();

  async function checkIfTicketChanged() {
    "use server";

    const newTicket = await api.ticket.getTicketById({ ticketId });
    const newTicketChanged = newTicket?.updatedAt.getTime();

    const isChanged = newTicketChanged !== ticketChanged;

    if (isChanged) {
      revalidatePath(`/`);
    }
  }

  return (
    <div className="my-32">
      <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center">
        <FaListCheck size={80} />
        <h2 className="font-medium">Manage your Tickets</h2>
      </div>
      <div className="mt-20 flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center justify-between gap-8">
          <NavLink href="/dashboard/tickets">
            <h3>Open Tickets</h3>
          </NavLink>
          <NavLink href="/dashboard/tickets">
            <h3>Closed Tickets</h3>
          </NavLink>
        </div>
        <RefreshCache check={checkIfTicketChanged} />
      </div>
      <article className="my-10 flex flex-col justify-between gap-10 md:flex-row">
        {/* Sidebar */}
        <TicketSidebar ticket={ticket} />
        {/* Chat */}
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
                  className="flex flex-col justify-between border-b border-gray py-8 lg:flex-row"
                >
                  <div className="flex gap-4">
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
                      <p className="comments text-lg font-light">
                        {parse(comment.content)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-10 font-bold lg:mt-0">
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
                    (
                      comments?.[comments.length - 1]?.createdAt ?? ""
                    ).toString(),
                  )}
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default page;
