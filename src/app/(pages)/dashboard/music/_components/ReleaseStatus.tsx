"use client";

import React from "react";
import { MdOutlinePending, MdRateReview, MdLibraryMusic } from "react-icons/md";
import { FaRegCircleCheck, FaPlugCircleCheck } from "react-icons/fa6";

const statuses = [
  {
    component: <MdOutlinePending size={30} />,
    color: "grey",
    label: "Pending",
  },
  { component: <MdRateReview size={30} />, color: "grey", label: "In Review" },
  {
    component: <FaRegCircleCheck size={30} />,
    color: "grey",
    label: "Approved",
  },
  {
    component: <FaPlugCircleCheck size={30} />,
    color: "grey",
    label: "Sent to Stores",
  },
  { component: <MdLibraryMusic size={35} />, color: "grey", label: "Live" },
];

const ReleaseStatus = ({ status }: { status: string | undefined }) => {
  let currentStatusIndex = 0;

  switch (status) {
    case "in review":
      currentStatusIndex = 1;
      break;
    case "approved":
      currentStatusIndex = 2;
      break;
    case "sent to stores":
      currentStatusIndex = 3;
      break;
    case "live":
      currentStatusIndex = 4;
      break;
    default:
      currentStatusIndex = 0;
      break;
  }
  return (
    <section className="mt-10 w-[60%] lg:mt-32 lg:w-1/2">
      <h1 className="mb-6 text-3xl font-bold">Release Status</h1>
      <div className="flex items-center justify-center space-x-4 px-4">
        {statuses.map((status, index) => (
          <React.Fragment key={index}>
            {/* Dotted line before the current status */}
            {index > 0 && (
              <p
                className="dotted-line mx-2 h-[4px] flex-1"
                style={{
                  color: index <= currentStatusIndex ? "green" : "gray",
                }}
              />
            )}
            <div className="flex flex-col items-center">
              <div
                className="font-bold"
                style={{
                  color: index === currentStatusIndex ? "green" : status.color,
                }}
              >
                {status.component}
              </div>
              <span className="mt-2 text-sm">{status.label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default ReleaseStatus;
