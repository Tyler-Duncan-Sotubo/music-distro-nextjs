import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Payout } from "@/hooks/fetch-revenue";

type SummaryPageProps = {
  payouts: Payout[];
};

const RenderSummaryPage = async ({ payouts }: SummaryPageProps) => {
  const generateCSV = (payout: {
    index: number;
    amount: number;
    createdAt?: string;
    id?: string;
    status: string;
    updatedAt?: string;
    userId?: string;
  }) => {
    const csvContent = `data:text/csv;charset=utf-8,Invoice,Method,Amount,Status\n000${payout.index + 1},Transfer,${payout.amount},${payout.status}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `payout_${payout.index + 1}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="my-40 space-y-9">
      <h1 className="my-4">Royalty Summary</h1>
      <h3>
        This is the summary of your earnings from the sales of your music
        releases.
      </h3>
      <section className="mt-10 flex items-center justify-between border border-secondary p-5 shadow-xl">
        <p className="text-xl">
          Total Earnings: <span className="text-2xl">$1000</span>
        </p>
      </section>
      <h3 className="font-bold">Recent Payments</h3>

      {payouts.length === 0 ? (
        <p>No recent payments</p>
      ) : (
        <Table className="space-y-3 text-lg">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Invoice</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payouts.map((payout, index) => (
              <TableRow key={index} className="capitalize">
                <TableCell className="font-medium">000{index + 1}</TableCell>
                <TableCell>Transfer</TableCell>
                <TableCell>${payout.amount}</TableCell>
                <TableCell>{payout.status}</TableCell>
                <TableCell className="text-right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default RenderSummaryPage;
