"use client";

import React from "react";
import { api } from "@/trpc/react";
import { FaListCheck } from "react-icons/fa6";
import Tickets from "./_components/Tickets";

const page = () => {
  const tickets = api.ticket.getTickets.useQuery().data;
  return (
    <div className="my-32">
      <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center">
        <FaListCheck size={80} />
        <h2 className="font-medium">Manage your Tickets</h2>
      </div>
      <Tickets tickets={tickets} />
    </div>
  );
};

export default page;
