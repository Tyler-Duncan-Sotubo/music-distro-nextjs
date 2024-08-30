import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { FaListCheck } from "react-icons/fa6";
import TicketSidebar from "../_components/TicketSidebar";
import Comments from "../_components/Comments";
import { NavLink } from "@/components/navigation/NavLinks";

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

  return (
    <div className="my-32">
      <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center">
        <FaListCheck size={80} />
        <h2 className="font-medium">Manage your Tickets</h2>
      </div>
      <div className="mt-20 flex gap-8">
        <NavLink href="/dashboard/tickets">
          <h3>Open Tickets</h3>
        </NavLink>
        <NavLink href="/dashboard/tickets">
          <h3>Closed Tickets</h3>
        </NavLink>
      </div>
      <article className="my-10 flex flex-col justify-between gap-10 md:flex-row">
        {/* Sidebar */}
        <TicketSidebar ticket={ticket} />
        {/* Chat */}
        <Comments ticketId={ticketId} user={user} />
      </article>
    </div>
  );
};

export default page;
