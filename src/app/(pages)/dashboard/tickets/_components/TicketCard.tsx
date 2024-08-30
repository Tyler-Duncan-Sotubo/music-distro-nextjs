"use client";

import { type Ticket } from "@prisma/client";
import React from "react";
import { formatRelativeDate } from "@/helper/dateFormater";
import Link from "next/link";

const TicketCard = ({
  filteredTickets,
}: {
  filteredTickets: Ticket[] | undefined;
}) => {
  return (
    <>
      <section className="hidden md:block">
        <table className="mb-32 w-full divide-y divide-gray rounded-xl border border-gray text-[14px] capitalize shadow-2xl">
          <thead className="py-6 text-lg font-medium uppercase text-black">
            <tr>
              <th className="p-4 text-left capitalize">Status</th>
              <th className="p-4 text-left capitalize">Reference</th>
              <th className="p-4 text-left capitalize">Ticket Type</th>
              <th className="p-4 text-left capitalize">Title</th>
              <th className="p-4 text-left capitalize">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray capitalize">
            {filteredTickets?.map((ticket: Ticket, index: number) => (
              <tr
                key={ticket.id}
                className={`font-medium ${index % 2 ? "bg-secondary" : "bg-white"}`}
              >
                <td className="text-gray-800 px-4 py-6">
                  <p> {ticket.status}</p>
                </td>
                <td className="text-gray-800 px-4 py-6 underline">
                  <Link href={`/dashboard/tickets/${ticket.id}`}>
                    <p>{ticket.referenceNumber}</p>
                  </Link>
                </td>
                <td className="text-gray-800 px-4 py-6 underline">
                  <Link href={`/dashboard/tickets/${ticket.id}`}>
                    <p> {ticket.description}</p>
                  </Link>
                </td>
                <td className="text-gray-800 px-4 py-6">
                  <p>{ticket.title}</p>
                </td>
                <td className="text-gray-800 px-4 py-6">
                  <p> {formatRelativeDate(ticket.updatedAt.toString())}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Ticket Mobile Version*/}
      <div className="md:hidden">
        {filteredTickets?.map((ticket: Ticket, index: number) => (
          <table
            className="my-16 w-full divide-y divide-gray rounded-xl border border-gray p-4 text-[14px] text-lg capitalize shadow-xl"
            key={index}
          >
            <tbody>
              <tr className="border-t border-gray">
                <th className="bg-gray-100 text-gray-600 px-4 py-5 text-left font-medium">
                  Status
                </th>
                <td className="text-gray-800 px-4 py-5">{ticket.status}</td>
              </tr>
              <tr className="border-t border-gray">
                <th className="bg-gray-100 text-gray-600 px-4 py-5 text-left font-medium">
                  Reference
                </th>
                <td className="text-gray-800 px-4 py-5 underline">
                  <Link href={`/dashboard/tickets/${ticket.id}`}>
                    {ticket.referenceNumber}
                  </Link>
                </td>
              </tr>
              <tr className="border-t border-gray">
                <th className="bg-gray-100 text-gray-600 px-4 py-5 text-left font-medium">
                  Title
                </th>
                <td className="text-gray-800 px-4 py-5">{ticket.title}</td>
              </tr>
              <tr className="border-t border-gray">
                <th className="bg-gray-100 text-gray-600 px-4 py-5 text-left font-medium">
                  Type
                </th>
                <td className="text-gray-800 px-4 py-5 underline">
                  <Link href={`/dashboard/tickets/${ticket.id}`}>
                    {ticket.description}{" "}
                  </Link>
                </td>
              </tr>
              <tr className="border-t border-gray">
                <th className="bg-gray-100 text-gray-600 px-4 py-5 text-left font-medium">
                  Last Updated
                </th>
                <td className="text-gray-800 px-4 py-5">
                  {formatRelativeDate(ticket.updatedAt.toString())}
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </>
  );
};

export default TicketCard;
