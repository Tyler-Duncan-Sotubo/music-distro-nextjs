import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchPayout } from "@/hooks/fetch-revenue";
import { getServerAuthSession } from "@/server/auth";

const page = async () => {
  const session = await getServerAuthSession();
  const payouts = await fetchPayout(session?.user.id);

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
                <TableCell className="text-right">CSV</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default page;
