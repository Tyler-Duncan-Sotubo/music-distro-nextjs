"use client";

import { useState } from "react";
import { type Summary } from "../types/sales.types";
import Overview from "./overview/Overview";
import Monthly from "./overview/Monthly";
import { type MonthlyStatsProps, type TrackStats } from "../types/sales.types";
import TrackOverview from "./overview/TrackStats";

interface PageProps {
  earnings: Summary;
  monthlyStats: MonthlyStatsProps | never[];
  trackStats: TrackStats[];
}

const EarningsOverview = ({
  earnings,
  monthlyStats,
  trackStats,
}: PageProps) => {
  const [filterStatus, setFilterStatus] = useState("overview");

  const isActive = (status: string) => filterStatus === status;

  const ButtonComponent = ({
    status,
    label,
  }: {
    status: string;
    label: string;
  }) => (
    <button
      onClick={() => setFilterStatus(status)}
      className={`mx-5 inline-flex items-center py-2 text-sm font-medium leading-5 text-black transition duration-500 ease-in-out focus:outline-none ${
        isActive(status)
          ? "border-indigo-400 text-gray-900 focus:border-indigo-700 border-b-2 border-primary text-primary"
          : "focus:border-gray-300 focus:text-gray-700 hover:border-b-2 hover:border-primary hover:text-primary"
      }`}
    >
      <p className="md:text-xl">{label}</p>
    </button>
  );

  const renderContent = () => {
    if (filterStatus === "overview") {
      return <Overview earnings={earnings} />;
    } else if (filterStatus === "months") {
      return <Monthly monthlyStats={monthlyStats} />;
    } else if (filterStatus === "tracks") {
      return <TrackOverview trackStats={trackStats} />;
    }

    return (
      <p className="my-10 w-full text-center text-2xl">
        Content for the {filterStatus} filter is not implemented yet.
      </p>
    );
  };

  return (
    <div className="my-16">
      <div className="my-2 flex gap-4 text-xl">
        <ButtonComponent status="overview" label="Overview" />
        <ButtonComponent status="tracks" label="Tracks" />
        <ButtonComponent status="months" label="Months" />
        {/* <ButtonComponent status="countries" label="Countries" /> */}
      </div>
      <div className="border-t border-secondary">{renderContent()}</div>
    </div>
  );
};

export default EarningsOverview;
