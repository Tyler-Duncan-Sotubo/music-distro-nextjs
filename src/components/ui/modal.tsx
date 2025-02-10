"use client";

import { api } from "@/trpc/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/Button";
import axios from "@/libs/axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Spinner } from "../common/Spinner";
import { useRouter } from "next/navigation";

type ModalProps = {
  showModal: boolean;
  payoutAmount: number;
  closeModal: () => void;
};

const Modal = ({ showModal, payoutAmount, closeModal }: ModalProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: userSubscription, isLoading } =
    api.subscriptions.getSubscription.useQuery();

  const calculateAmountDue = () => {
    let planPercentage = 0;
    let amountDue = 0;
    let deducted = 0;

    switch (userSubscription?.plan) {
      case "Platinum":
        planPercentage = 15;
        break;
      case "Gold":
        planPercentage = 20;
        break;
      case "Bronze":
        planPercentage = 25;
        break;
      default:
        planPercentage = 0;
    }

    amountDue = payoutAmount - (payoutAmount * planPercentage) / 100;
    deducted = (payoutAmount * planPercentage) / 100;

    return {
      planPercentage,
      amountDue,
      deducted,
    };
  };

  const requestPayment = async (amount: number) => {
    try {
      const response = await axios.post(
        `/api/payment/request/${session?.user.id}`,
        {
          amount,
        },
      );

      if (response.status === 201) {
        toast.success("Payment request sent successfully", {
          position: "top-center",
          autoClose: 5000,
        });
        closeModal();
        router.push("/dashboard/sales/summary");
      }
    } catch (error) {
      toast.error("Payment unsuccessfully, Please Try Again", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {showModal && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="h-[30%] w-[95%] gap-6 rounded-xl bg-white p-6 md:h-[50%] md:w-[50%]">
            {/* Modal Title */}
            <h3 className="mt-4 font-bold">Payment Breakdown</h3>
            <div className="my-10">
              <Table>
                <TableCaption>
                  Distro % is based on your current{" "}
                  <span className="font-bold">{userSubscription?.plan}</span>{" "}
                  plan
                </TableCaption>
                <TableHeader>
                  <TableRow className="md:text-lg">
                    <TableHead>Stream Revenue</TableHead>
                    <TableHead>Distro %</TableHead>
                    <TableHead>Deducted</TableHead>
                    <TableHead className="text-right">Amount Due</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="md:text-lg">
                  <TableRow>
                    <TableCell>${payoutAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      {calculateAmountDue().planPercentage}%
                    </TableCell>
                    <TableCell>-${calculateAmountDue().deducted}</TableCell>
                    <TableCell className="text-right font-bold">
                      ${calculateAmountDue().amountDue}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-10 flex justify-end space-x-6">
              <Button variant="destructive" size="lg" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                variant="default"
                size="lg"
                // disabled={isAboveThreshold}
                onClick={() => requestPayment(calculateAmountDue().amountDue)}
              >
                Request Payment
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Modal;
