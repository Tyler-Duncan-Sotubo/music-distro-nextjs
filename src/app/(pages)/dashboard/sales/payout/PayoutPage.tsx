"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Spinner } from "@/components/common/Spinner";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for bank details
const bankDetailsSchema = z.object({
  accountName: z.string().min(2, "Account holder name is required"),
  accountNumber: z
    .string()
    .min(6, "Account number too short")
    .regex(/^\d+$/, "Account number must be digits"),
  bankName: z.string().min(2, "Bank name is required"),
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .min(1, "Amount must be greater than 0"),
});

type BankDetails = z.infer<typeof bankDetailsSchema>;

const PaymentPage = ({ payoutAmount }: { payoutAmount: number }) => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const { data: userSubscription, isLoading } =
    api.subscriptions.getSubscription.useQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BankDetails>({
    resolver: zodResolver(bankDetailsSchema),
  });

  const calculateAmountDue = () => {
    let planPercentage = 0;
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
    }
    const deducted = (payoutAmount * planPercentage) / 100;
    return {
      planPercentage,
      deducted,
      amountDue: payoutAmount - deducted,
    };
  };

  const onSubmit = async (data: BankDetails) => {
    if (data.amount > calculateAmountDue().amountDue) {
      toast.error("Requested amount exceeds available balance", {
        position: "top-center",
      });
      setError("Requested amount exceeds available balance");
      return;
    }
    try {
      const response = await axios.post(
        `/api/payment/request/${session?.user.id}`,
        {
          amount: data.amount,
          accountNumber: data.accountNumber,
          accountName: data.accountName,
          bankName: data.bankName,
        },
      );
      console.log(response.data);
      if (response.status === 201) {
        toast.success("Payment request sent successfully", {
          position: "top-center",
        });
        router.push("/dashboard/sales/summary");
      }
    } catch (error) {
      toast.error("Payment unsuccessful. Please try again.", {
        position: "top-center",
      });
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="flex min-h-screen items-center bg-opacity-70">
      <div className="w-full max-w-3xl rounded-xl bg-white">
        <h2 className="text-center text-2xl font-bold">Payment Breakdown</h2>
        <div className="my-6">
          <Table>
            <TableCaption>
              Distro % based on{" "}
              <span className="font-bold">{userSubscription?.plan}</span> Plan
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Stream Revenue</TableHead>
                <TableHead>Distro %</TableHead>
                <TableHead>Deducted</TableHead>
                <TableHead className="text-right">Amount Due</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>${payoutAmount.toFixed(2)}</TableCell>
                <TableCell>{calculateAmountDue().planPercentage}%</TableCell>
                <TableCell>-${calculateAmountDue().deducted}</TableCell>
                <TableCell className="text-right font-bold">
                  ${calculateAmountDue().amountDue}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Bank Details Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="mt-6 text-lg font-semibold">Bank Details</h3>

          <div>
            <label className="block text-sm font-medium">
              Account Holder Name
            </label>
            <input
              {...register("accountName")}
              className="mt-1 w-full rounded-md border p-2 shadow-sm"
              placeholder="E.g. John Doe"
            />
            {errors.accountName && (
              <p className="text-sm text-error">{errors.accountName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Account Number</label>
            <input
              {...register("accountNumber")}
              className="mt-1 w-full rounded-md border p-2 shadow-sm"
              placeholder="E.g. 1234567890"
            />
            {errors.accountNumber && (
              <p className="text-sm text-error">
                {errors.accountNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Bank Name</label>
            <input
              {...register("bankName")}
              className="mt-1 w-full rounded-md border p-2 shadow-sm"
              placeholder="E.g. HDFC Bank"
            />
            {errors.bankName && (
              <p className="text-sm text-error">{errors.bankName.message}</p>
            )}
          </div>

          <label className="block text-sm font-medium">
            Amount to Withdraw
          </label>
          <input
            type="number"
            step="0.01"
            {...register("amount", { valueAsNumber: true })}
            className="mt-1 w-full rounded-md border p-2 shadow-sm"
            placeholder={`Max: $${calculateAmountDue().amountDue.toFixed(2)}`}
            defaultValue={calculateAmountDue().amountDue}
          />
          {errors.amount && (
            <p className="text-sm text-error">{errors.amount.message}</p>
          )}

          <div className="flex justify-end space-x-4">
            <Button type="submit" variant="default">
              Request Payment
            </Button>
          </div>

          {error && <p className="mt-4 text-sm text-error">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default PaymentPage;
