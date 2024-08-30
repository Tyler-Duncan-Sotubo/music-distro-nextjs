"use client";

import { type Ticket } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { formatRelativeDate } from "@/helper/dateFormater";
import { api } from "@/trpc/react";
import { toast } from "react-toastify";

interface PageProps {
  ticket: Ticket | null;
}

const TicketSidebar = ({ ticket }: PageProps) => {
  const getTickets = api.ticket.getTickets.useQuery();
  const closeTicket = api.ticket.updateTicket.useMutation({
    onSuccess: async () => {
      await getTickets.refetch();
      toast.success(`${ticket?.status === "CLOSED" ? "OPEN" : "CLOSED"}`, {
        position: "bottom-center",
      });
    },
  });

  const onSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    const newStatus = ticket?.status === "CLOSED" ? "OPEN" : "CLOSED";
    closeTicket.mutate({
      ticketId: ticket?.id ?? "",
      status: newStatus,
    });
  };

  return (
    <aside className="max-h-[600px] rounded-md border border-gray p-5 shadow-2xl md:w-1/3">
      <div className="relative mx-auto my-3 flex self-center bg-black sm:h-16 sm:w-16">
        <Image
          fill
          referrerPolicy="no-referrer"
          src="/img/mobilelogo.png"
          alt={`Admin profile picture`}
          className="rounded-full p-2"
        />
      </div>
      <p className="text-center text-lg font-medium">
        {ticket?.referenceNumber}
      </p>
      <p className="text-center">
        Opened {formatRelativeDate(ticket?.createdAt?.toString() ?? "")}
      </p>
      <button
        className="my-6 w-full border-2 border-secondary bg-white py-3 text-center hover:bg-secondary"
        color="text-black"
        onClick={onSubmit}
      >
        <p className="font-semibold">
          {ticket?.status === "CLOSED" ? "Re-Open Ticket" : "Close Ticket"}
        </p>
      </button>
      <table className="my-3 min-w-full table-auto">
        <tbody>
          <tr className="border-b border-secondary">
            <th className="bg-gray-100 text-gray-600 px-4 py-4 text-left text-lg font-medium">
              Status
            </th>
            <td className="text-gray-800 px-4 py-4 text-lg">
              {ticket?.status}
            </td>
          </tr>
          <tr className="border-b border-secondary">
            <th className="bg-gray-100 text-gray-600 px-4 py-4 text-left text-lg font-medium">
              Type
            </th>
            <td className="text-gray-800 px-4 py-4 text-lg">
              {ticket?.description}
            </td>
          </tr>
          <tr className="border-b border-secondary">
            <th className="bg-gray-100 text-gray-600 px-4 py-4 text-left text-lg font-medium">
              Last Updated
            </th>
            <td className="text-gray-800 px-4 py-4 text-lg">
              {formatRelativeDate(ticket?.updatedAt?.toString() ?? "")}
            </td>
          </tr>
          <tr className="">
            <th className="bg-gray-100 text-gray-600 px-4 py-4 text-left text-lg font-medium">
              Priority
            </th>
            <td className="text-gray-800 px-4 py-4 text-lg">
              {ticket?.priority}
            </td>
          </tr>
        </tbody>
      </table>
    </aside>
  );
};

export default TicketSidebar;
