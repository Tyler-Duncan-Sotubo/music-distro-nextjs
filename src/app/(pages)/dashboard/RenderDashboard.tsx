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

const RenderDashboard = ({
  userSubscription,
  userAudioReleases,
}: RenderDashboardProps) => {
  return (
    <>
      {/* Subscription Plan */}
      <section className="mt-12 flex flex-col justify-between gap-6 md:mt-44 md:flex-row md:gap-3">
        {/* Welcome Message for user */}
        <p className="mb-4 text-2xl text-black md:hidden">
          {/* Welcome, {user?.name} */}
        </p>

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
        <div className="h-72 bg-white p-10 shadow-md md:w-[40%]">
          <h2 className="mb-8 font-semibold">Your Subscription</h2>
          {userSubscription?.status === "active" ? (
            <div className="font-medium">
              <div className="my-4 text-lg font-medium tracking-wider">
                {userSubscription.plan === "Bronze" ? (
                  <p>
                    You are currently on the
                    <span className="font-medium"> Bronze plan</span>
                  </p>
                ) : userSubscription.plan === "Gold" ? (
                  <p>
                    You are currently on the
                    <span className="font-medium"> Gold plan</span>
                  </p>
                ) : (
                  <p>
                    You are currently on the
                    <span className="font-medium"> Platinum plan</span>
                  </p>
                )}
              </div>
              <div className="w-2/3">
                <p className="my-4 text-lg font-medium tracking-wide">
                  Your subscription will expire on {""}
                  <span className="font-medium">
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
