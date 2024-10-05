import React from "react";
import RoyaltySummary from "./RoyaltySummary";

import {
  fetchMonthlyReports,
  fetchReportByStore,
  fetchReportByCountry,
} from "@/hooks/fetch-sales-report";
import { fetchRevenue } from "@/hooks/fetch-revenue";
import { getServerAuthSession } from "@/server/auth";

const RenderSalesPage = async () => {
  const session = await getServerAuthSession();
  const userId = session?.user?.id;

  const monthlySalesReports = await fetchMonthlyReports(userId);
  const earningsByDSP = await fetchReportByStore(userId);
  const earningsByCountry = await fetchReportByCountry(userId);

  const revenueData = await fetchRevenue(userId);

  return (
    <>
      <RoyaltySummary
        monthlySalesReports={monthlySalesReports}
        earningsByDSP={earningsByDSP}
        earningsByCountry={earningsByCountry}
        revenueData={revenueData}
      />
    </>
  );
};

export default RenderSalesPage;
