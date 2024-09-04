import React from "react";
import { api } from "@/trpc/server";

type Summary = {
  totalDownloads: number;
  totalStreams: number;
  totalStreamEarnings: number;
  totalDownloadEarnings: number;
  totalEarnings: number;
};

type CardProps = {
  title: string;
  primaryValue: number | string;
  secondaryValue: string | number;
};

interface PageProps {
  earnings: Summary;
}

const TotalEarnings = async ({ earnings }: PageProps) => {
  const Card: React.FC<CardProps> = ({
    title,
    primaryValue,
    secondaryValue,
  }) => {
    return (
      <div className="border border-gray px-4 py-6 shadow-xl">
        <h4 className="mb-4 text-xl">{title}</h4>
        <div className="flex justify-between">
          <h2 className="text-xl font-medium lg:text-lg">
            {primaryValue.toLocaleString()}
          </h2>
          <h2 className="text-xl font-bold">£{secondaryValue}</h2>
        </div>
      </div>
    );
  };

  return (
    <section className="mx-auto my-10 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
      <Card
        title="Downloads"
        primaryValue={earnings.totalDownloads}
        secondaryValue={earnings.totalDownloadEarnings}
      />
      <Card
        title="Streams"
        primaryValue={earnings.totalStreams}
        secondaryValue={earnings.totalStreamEarnings}
      />
      <Card
        title="Total Earnings"
        primaryValue="" // Optional if you don't need a primary value here
        secondaryValue={earnings.totalEarnings}
      />
    </section>
  );
};

export default TotalEarnings;
