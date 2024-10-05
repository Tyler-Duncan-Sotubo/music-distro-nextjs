"use client";

import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import IdentityConfirmationModal from "./_components/payment/IdentityConfirmationModal";
import useFetchApiData from "@/hooks/use-fetch-api-data";
import { BiError } from "react-icons/bi";
import { type CachedEarnings } from "./_types/sales.types";

interface IDocument {
  id: string;
}

interface Props {
  revenueData: CachedEarnings;
}

const PaymentRequest = ({ revenueData }: Props) => {
  const [showModal, setShowModal] = useState(false);

  // Fetching data from the API
  const { data: documentData } = useFetchApiData<IDocument>("api/id-check");

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up when the modal is closed or component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  return (
    <>
      <section className="my-10 md:w-2/3">
        {/* Identity Verification */}
        {!documentData && (
          <section className="relative rounded-xl border border-secondary bg-gradient-to-r from-primary from-15% via-primary via-30% to-black to-90% px-5 py-8 text-white shadow-2xl">
            <div className="md:w-2/3">
              <h1 className="py-4">Identity Verification</h1>
              <p className="text-lg">
                To ensure the security of your account,Please complete this
                quick, one-time identity check. It&apos;ll only take a few
                minutes and once you&apos;re verified we can start sending
                royalties!
              </p>
            </div>
            <div className="mt-10 flex max-h-14 justify-end">
              <Button onClick={() => setShowModal(true)}>
                Verify Identity
              </Button>
            </div>
            {showModal && (
              <IdentityConfirmationModal setShowModal={setShowModal} />
            )}
          </section>
        )}
      </section>
      {/* Payment Request */}
      <section className="bg-warning my-10 flex items-center justify-between gap-6 border border-secondary p-5">
        <BiError size={100} />
        <p className="text-lg">
          You can request a payment once you have reached the minimum threshold
          of £50.00. Please note that payments are processed on a monthly basis.
        </p>
      </section>

      <section className="flex items-center justify-between border border-secondary p-5 shadow-xl">
        <p className="text-xl">
          Current Balance:{" "}
          <span className="text-2xl">£{revenueData.earnings}</span>
        </p>
        <Button disabled>Request Payment</Button>
      </section>

      <section className="my-10">
        <h1 className="text-2xl">Monthly Earnings</h1>
        <table className="my-6 min-w-full divide-y divide-gray text-[14px] capitalize">
          <thead className="font-regular bg-white uppercase">
            <tr>
              <th className="p-4 text-left">Month</th>
              <th className="p-4 text-left">Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray bg-white text-left capitalize">
            {revenueData.monthlyReports.map((report) => (
              <tr key={report.month}>
                <td className="p-4">{`${report.month}/${report.year}`}</td>
                <td className="p-4">£{report.totalEarnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default PaymentRequest;
