interface MonthlyReport {
  month: number;
  year: number;
  earnings: number;
}

export interface Payout {
  amount: number;
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
  userId: string;
}

interface CachedEarnings {
  message: string;
  earnings: number;
  monthlyReports: MonthlyReport[];
}

export const fetchRevenue = async (userId: string | undefined) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/revenue/${userId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch revenue");
  }

  const revenueData = (await response.json()) as CachedEarnings;

  return revenueData;
};

export const fetchPayout = async (userId: string | undefined) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/payouts/${userId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch revenue");
  }

  const payout = (await response.json()) as Payout[];

  return payout;
};
