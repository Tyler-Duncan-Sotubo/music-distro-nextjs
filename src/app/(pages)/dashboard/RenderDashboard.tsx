/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { type Subscriptions } from "@prisma/client";
import { type Audio } from "@prisma/client";
import ReleaseCard from "@/components/ui/ReleaseCard";

type RenderDashboardProps = {
  userSubscription: Subscriptions | null;
  userAudioReleases: Audio[] | null;
};

const RenderPlanName = ({ name }: { name: string }) => {
  return (
    <span className="bg-primaryHover px-6 py-3 font-bold uppercase text-white">
      {name}
    </span>
  );
};

const PlanDetails = ({
  userSubscription,
}: {
  userSubscription: Subscriptions;
}) => {
  if (userSubscription.plan === "Bronze") {
    return <RenderPlanName name="Bronze plan" />;
  } else if (userSubscription.plan === "Gold") {
    return <RenderPlanName name="Gold plan" />;
  } else {
    return <RenderPlanName name="Platinum plan" />;
  }
};

const RenderDashboard = ({
  userSubscription,
  userAudioReleases,
}: RenderDashboardProps) => {
  return (
    <>
      {/* Information Area*/}
      <div className="bg-secondary p-3 md:mt-32">
        <p className="text-center">
          For assistance or to address a specific issue, please open a{" "}
          <Link href="/dashboard/tickets" className="text-primary">
            support ticket
          </Link>
          . This ensures your inquiry is handled promptly. Thank you.
        </p>
      </div>
      {/* Subscription Plan */}
      <section className="mt-12 flex flex-col justify-between gap-6 md:mt-12 md:flex-row md:gap-3">
        <div className="capitalize md:w-1/2">
          <h1 className="mb-5 text-5xl font-semibold leading-tight tracking-wider md:text-7xl">
            track and control your subscription
          </h1>
          <h4>
            From your account dashboard you can view your recent releases,
            manage your account details, edit your
            <Link
              href="/forgot-password"
              className="mx-1 font-medium text-primary"
            >
              password
            </Link>
            track your
            <Link
              href="/dashboard/sales"
              className="mx-1 font-medium text-primary"
            >
              royalties
            </Link>
            and your request for
            <Link
              href="/dashboard/payout"
              className="mx-1 font-medium text-primary"
            >
              payout
            </Link>
            .
          </h4>
        </div>

        {/* Subscription Plan */}
        <div className="h-[350px] border border-gray bg-white p-8 shadow-md md:h-[330px] md:w-[45%]">
          <h2 className="mb-8 font-semibold">Your Plan</h2>
          {userSubscription?.status === "active" ? (
            <div>
              <div className="my-4 text-lg font-medium tracking-wider">
                <PlanDetails userSubscription={userSubscription} />
                <p className="my-6 text-lg font-medium tracking-wider">
                  Unlimited releases for 1 artist, music publishing, sync and
                  all Pro features.
                </p>
              </div>
              <div className="md:w-2/3">
                <p className="my-4 text-lg tracking-wide">
                  Your subscription will expire on {""}
                  <span className="my-2 block font-bold">
                    {userSubscription.expiresAt?.toDateString().slice(0, 20)}
                  </span>
                </p>
              </div>
            </div>
          ) : userSubscription?.status === "unpaid" ? (
            <div>
              <h5 className="my-4 text-lg font-semibold">
                Your subscription has not been paid for, please check your email
                for payment details
              </h5>
              <p className="inline-block bg-error p-5 text-white">
                <p className="text-[14px] font-semibold uppercase">
                  Payment Pending
                </p>
              </p>
            </div>
          ) : (
            <div>
              <h5 className="my-4 text-lg font-semibold">
                You don&apos;t have a subscription plan yet, please subscribe to
                a plan
              </h5>
              <Link href="/dashboard/subscription">
                <Button className="bg-primary text-white hover:bg-primaryHover">
                  <p className="text-[14px]">Get Started</p>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* header */}
      <div className="mb-10 mt-20 flex items-center justify-between">
        <h2 className="text-sm md:text-2xl">Recent Release</h2>
        {/* create new release button */}
        <Link href="/dashboard/music">
          <Button className="bg-primary text-xs text-white hover:bg-primaryHover">
            Create New Release
          </Button>
        </Link>
      </div>

      {/* Recent Release */}
      <ReleaseCard releases={userAudioReleases} />
    </>
  );
};

export default RenderDashboard;
