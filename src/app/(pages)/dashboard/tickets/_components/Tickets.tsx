"use client";

import { type Ticket } from "@prisma/client";
import React, { useEffect, useState } from "react";
import TicketCard from "./TicketCard";
import { Button } from "@/components/ui/Button";
import { FaStar } from "react-icons/fa6";
import CreateTicketModal from "./CreateTicketModal";
import { MdOutlineWork } from "react-icons/md";

const Tickets = ({ tickets }: { tickets: Ticket[] | null | undefined }) => {
  const [filterStatus, setFilterStatus] = useState("open");
  const [openTicketsModal, setOpenTicketsModal] = useState(false);
  const isActive = (status: string) => filterStatus === status;

  useEffect(() => {
    if (openTicketsModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openTicketsModal]);

  const ButtonComponent = ({
    status,
    label,
  }: {
    status: string;
    label: string;
  }) => (
    <button
      onClick={() => setFilterStatus(status)}
      className={`inline-flex items-center py-2 text-sm font-medium leading-5 text-black transition duration-500 ease-in-out focus:outline-none ${
        isActive(status)
          ? "border-indigo-400 text-gray-900 focus:border-indigo-700 border-b-2 border-primary text-primary"
          : "focus:border-gray-300 focus:text-gray-700 hover:border-b-2 hover:border-primary hover:text-primary"
      }`}
    >
      <p className="md:text-xl">{label}</p>
    </button>
  );

  const filteredTickets = tickets?.filter(
    (ticket) =>
      (ticket.status.toLowerCase() === "open" &&
        (filterStatus === "open" || filterStatus === "all")) ||
      (ticket.status.toLowerCase() === "closed" &&
        (filterStatus === "closed" || filterStatus === "all")),
  );

  return (
    <div className="my-20">
      <div className="flex gap-10">
        <ButtonComponent status="open" label="Open Tickets" />
        <ButtonComponent status="closed" label="Closed Tickets" />
      </div>

      <div className="my-10 flex flex-col items-center justify-between rounded-lg border border-gray p-5 shadow-2xl md:flex-row">
        <div className="my-6 flex items-center gap-2 text-center">
          <FaStar size={25} className="hidden md:block" />
          <p className="text-lg font-medium">
            Our experts are online and ready to help you.
          </p>
        </div>
        <Button onClick={() => setOpenTicketsModal(!openTicketsModal)}>
          Create Ticket
        </Button>
      </div>

      {/* CreateTicketModal component is rendered here */}
      {openTicketsModal && (
        <CreateTicketModal
          setOpenTicketsModal={setOpenTicketsModal}
          openTicketsModal={openTicketsModal}
        />
      )}

      <div>
        <ul
          className={`${
            (filteredTickets?.length ?? 0 > 0) ? "grid" : "block"
          } grid-cols-1 gap-3 md:gap-6`}
        >
          {(filteredTickets?.length ?? 0 > 0) ? (
            <TicketCard filteredTickets={filteredTickets} />
          ) : (
            <div className="mx-auto flex w-full flex-col items-center justify-center border border-gray p-16 shadow-xl">
              <div className="mb-2">
                <MdOutlineWork size={60} />
              </div>
              <p className="w-full text-center text-xl">No tickets</p>
              <p className="w-full text-center text-lg">
                No tickets available to show
              </p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Tickets;
