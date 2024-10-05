"use client";

import { useState } from "react";
import TotalEarnings from "./_components/TotalEarnings";
import EarningsOverview from "./_components/EarningsOverview";
import SalesReportLineChart from "./_components/LineChart";
import EarningsByDSP from "./_components/EarningsByDSP";
import EarningsByCountry from "./_components/EarningsByCountry";
import { type MonthlyReport } from "./_types/sales.types";
import { type IStoreReport } from "./_types/sales.types";
import { type ICountryReport } from "./_types/sales.types";
import { type CachedEarnings } from "./_types/sales.types";
import PaymentRequest from "./PaymentRequest";

interface RenderSalesAnalyticsProps {
  monthlySalesReports: MonthlyReport[];
  earningsByDSP: IStoreReport[];
  earningsByCountry: ICountryReport[];
  revenueData: CachedEarnings;
}

const RoyaltySummary = ({
  monthlySalesReports,
  earningsByDSP,
  earningsByCountry,
  revenueData,
}: RenderSalesAnalyticsProps) => {
  const [filterStatus, setFilterStatus] = useState("sales");

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
      className={`mx-5 inline-flex items-center py-2 text-sm font-medium leading-5 text-black transition duration-500 ease-in-out focus:outline-none md:mt-10 ${
        isActive(status)
          ? "border-indigo-400 text-gray-900 focus:border-indigo-700 border-b-2 border-primary text-primary"
          : "focus:border-gray-300 focus:text-gray-700 hover:border-b-2 hover:border-primary hover:text-primary"
      }`}
    >
      <p className="md:text-xl">{label}</p>
    </button>
  );

  const renderContent = () => {
    if (filterStatus === "sales") {
      return (
        <section className="md:mt-10">
          {/* Sales Notice */}
          <h1 className="text-center text-3xl font-bold md:text-5xl">
            Sales Reports
          </h1>
          <h3 className="mb-8 mt-8 text-center text-[1.1rem] tracking-wide">
            Here you&apos;ll find detailed reports on the royalties your music
            has earned. Some stores report sales to us with up to a 3 month
            delay, so you might not see recent earnings reflected in these
            reports straight away.
          </h3>
          {/* Total Earnings Graph */}
          <SalesReportLineChart monthlyReports={monthlySalesReports} />
          {/* Earnings by DSP */}
          <EarningsByDSP earningsByDSP={earningsByDSP} />
          {/* Earnings by Country */}
          <EarningsByCountry earningsByCountry={earningsByCountry} />
          {/* sales overview */}
          <TotalEarnings earnings={monthlySalesReports} />
          {/* Earnings overview */}
          <EarningsOverview />
        </section>
      );
    } else if (filterStatus === "payout") {
      return <PaymentRequest revenueData={revenueData} />;
    }

    return (
      <p className="my-10 w-full text-center text-2xl">
        Content for the {filterStatus} filter is not implemented yet.
      </p>
    );
  };

  return (
    <div className="md:my-16">
      <div className="my-10 flex text-xl">
        <ButtonComponent status="sales" label="Sales Report" />
        <ButtonComponent status="payout" label="Request Payment" />
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default RoyaltySummary;
