import React from "react";
import TotalEarnings from "./_components/TotalEarnings";
import EarningsOverview from "./_components/EarningsOverview";
import SalesReportLineChart from "./_components/LineChart";
import EarningsByDSP from "./_components/EarningsByDSP";
import EarningsByCountry from "./_components/EarningsByCountry";
import {
  fetchMonthlyReports,
  fetchReportByStore,
  fetchReportByCountry,
} from "@/hooks/fetch-sales-report";
import { getServerAuthSession } from "@/server/auth";

const RenderSalesPage = async () => {
  const session = await getServerAuthSession();
  const userId = session?.user?.id;

  const monthlySalesReports = await fetchMonthlyReports(userId);
  const earningsByDSP = await fetchReportByStore(userId);
  const earningsByCountry = await fetchReportByCountry(userId);

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
    </>
  );
};

export default RenderSalesPage;
