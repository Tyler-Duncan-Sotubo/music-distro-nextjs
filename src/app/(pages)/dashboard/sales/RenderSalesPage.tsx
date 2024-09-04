import React from "react";
import TotalEarnings from "./_components/TotalEarnings";
import EarningsOverview from "./_components/EarningsOverview";
import { api } from "@/trpc/server";
import SalesReportLineChart from "./_components/LineChart";
import EarningsByDSP from "./_components/EarningsByDSP";
import EarningsByCountry from "./_components/EarningsByCountry";

type Summary = {
  totalDownloads: number;
  totalStreams: number;
  totalStreamEarnings: number;
  totalDownloadEarnings: number;
  totalEarnings: number;
};

const RenderSalesPage = async () => {
  const earnings = (await api.report.getTotalEarnings()) as Summary;
  const monthlyEarnings = await api.report.getMonthlyEarnings();
  const earningsByDSP = await api.report.getReportByPlatform();
  const earningsByCountry = await api.report.getReportByCountry();
  const monthlyStats = await api.report.getMonthlyStats();
  const trackStats = await api.report.getTrackStats();

  console.log(trackStats);

  return (
    <>
      {/* Sales Notice */}
      <h1 className="text-center text-3xl font-bold md:mt-32 md:text-5xl">
        Sales Reports
      </h1>
      <h3 className="mb-8 mt-8 text-center text-[1.1rem] tracking-wide">
        Here you&apos;ll find detailed reports on the royalties your music has
        earned. Some stores report sales to us with up to a 3 month delay, so
        you might not see recent earnings reflected in these reports straight
        away.
      </h3>

      <section>
        {/* Total Earnings Graph */}
        <SalesReportLineChart monthlyEarnings={monthlyEarnings} />
        {/* Earnings by DSP */}
        <EarningsByDSP earningsByDSP={earningsByDSP} />
        {/* Earnings by Country */}
        <EarningsByCountry earningsByCountry={earningsByCountry} />
        {/* sales overview */}
        <TotalEarnings earnings={earnings} />
        {/* Earnings overview */}
        <EarningsOverview
          earnings={earnings}
          monthlyStats={monthlyStats}
          trackStats={trackStats}
        />
      </section>
    </>
  );
};

export default RenderSalesPage;
