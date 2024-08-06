/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { type Subscriptions } from "@prisma/client";

type RenderDashboardProps = {
  userSubscription: Subscriptions | null;
  userAudioReleases: any;
};

const RenderDashboard = ({
  userSubscription,
  userAudioReleases,
}: RenderDashboardProps) => {
  const { data: session } = useSession();
  const user = session?.user;

  type ReleaseMobileView = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    release: any;
    description: string;
  };

  const RenderMobileViewReleaseDetails = ({
    release,
    description,
  }: ReleaseMobileView) => (
    <div className="my-4">
      <h5 className="font-medium uppercase">{description}</h5>
      <p className="font-bold">{release}</p>
    </div>
  );

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
              className="mx-1 font-bold text-primary"
            >
              password
            </Link>
            track your
            <Link
              href="/dashboard/sales"
              className="mx-1 font-bold text-primary"
            >
              royalties
            </Link>
            and your request for
            <Link
              href="/dashboard/payout"
              className="mx-1 font-bold text-primary"
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
                    <span className="font-bold"> Bronze plan</span>
                  </p>
                ) : userSubscription.plan === "Gold" ? (
                  <p>
                    You are currently on the
                    <span className="font-bold"> Gold plan</span>
                  </p>
                ) : (
                  <p>
                    You are currently on the
                    <span className="font-bold"> Platinum plan</span>
                  </p>
                )}
              </div>
              <div className="w-2/3">
                <p className="my-4 text-lg font-medium tracking-wide">
                  Your subscription will expire on {""}
                  <span className="font-bold">
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

      {/* Email Verification Warning */}
      {!user?.emailVerified ? (
        <div className="mt-10 rounded-lg bg-secondary px-2 py-3 text-center">
          <div className="items-center justify-center gap-10 md:flex">
            <p>
              Your email is not verified, please check your email for
              verification link
            </p>
            <Link href="/verify-email">
              <Button className="mt-3 bg-primary text-[10px] text-white hover:bg-primaryHover md:mt-0">
                Verify Email
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mb-5 px-2 py-3" />
      )}

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

      {/* Table body  */}
      <div className="hidden md:block">
        <table className="divide-gray-200 mb-32 min-w-full divide-y text-[14px] capitalize">
          <thead className="font-regular text-purple bg-white uppercase">
            <tr>
              <th className="p-4 text-left capitalize"></th>
              <th className="p-4 text-left capitalize">Title</th>
              <th className="p-4 text-left capitalize">Release Type</th>
              <th className="p-4 text-left capitalize">Status</th>
              <th className="p-4 text-left capitalize">Release Date</th>
              <th className="p-4 text-left capitalize">ISRC</th>
              <th className="p-4 text-left capitalize">UPC</th>
              <th className="p-4 text-left capitalize">SmartLink</th>
            </tr>
          </thead>
          <tbody className="divide-gray-200 divide-y bg-white capitalize">
            {Array.isArray(userAudioReleases) ? (
              userAudioReleases.map((release, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-4">
                    <Image
                      src={release.releaseCover}
                      alt="cover art"
                      className="h-20 w-20 object-cover"
                      width={80}
                      height={80}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-6 font-bold">
                    <p>{release.title}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-bold">
                    <p>{release.releaseType}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-bold">
                    {release.status === "pending" ||
                    release.status.includes("REQUIRES REPAIR") ? (
                      <p className="text-error">{release.status}</p>
                    ) : (
                      <p className="text-green-600">{release.status}</p>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-bold">
                    <p>{release.releaseDate?.toDateString().slice(0, 10)}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-bold">
                    <p>{release.ISRC === "" ? "N/A" : release.ISRC}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-bold">
                    <p>{release.UPC === "" ? "N/A" : release.UPC}</p>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 font-bold">
                    {release.smartLink === "" ? (
                      "N/A"
                    ) : (
                      <Link href={release.smartLink} target="_blank">
                        <Button
                          className="border-2 border-primary bg-white px-10 hover:text-white"
                          color="text-black"
                        >
                          Smartlink
                        </Button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="whitespace-nowrap px-4 py-4 text-center text-xl font-bold">
                  <p>No Release yet</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="my-10 md:hidden">
        {Array.isArray(userAudioReleases) ? (
          userAudioReleases.map((release, index) => (
            <div
              key={index}
              className="my-10 mb-4 flex flex-col rounded-xl bg-white p-3 shadow-xl"
            >
              <Image
                src={release.releaseCover}
                alt="cover art"
                className="mb-10 w-[400px] rounded-lg object-contain"
                width={400}
                height={400}
              />
              <div className="flex flex-col capitalize">
                <RenderMobileViewReleaseDetails
                  release={release.title}
                  description="song title"
                />
                <RenderMobileViewReleaseDetails
                  release={
                    release.status === "pending" ? (
                      <span className="text-error">{release.status}</span>
                    ) : (
                      <span className="text-green-600">{release.status}</span>
                    )
                  }
                  description="Release Status"
                />
                <RenderMobileViewReleaseDetails
                  release={release.releaseType}
                  description="Release Type"
                />
                <RenderMobileViewReleaseDetails
                  release={release.ISRC === "" ? "N/A" : release.ISRC}
                  description="ISRC Code"
                />
                <RenderMobileViewReleaseDetails
                  release={release.UPC === "" ? "N/A" : release.UPC}
                  description="UPC Code"
                />
                <RenderMobileViewReleaseDetails
                  release={release.createdAt?.toDateString().slice(0, 20)}
                  description="Received on"
                />
                <RenderMobileViewReleaseDetails
                  release={release.releaseDate?.toDateString().slice(0, 20)}
                  description="Release Date"
                />
                <div>
                  <h5 className="my-5 font-medium uppercase">SmartLink</h5>
                  {release.smartLink === "" ? (
                    "N/A"
                  ) : (
                    <Link href={release.smartLink} target="_blank">
                      <Button
                        className="border-2 border-primary bg-white px-10 hover:text-white"
                        color="text-black"
                      >
                        Smartlink
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="mb-4 flex flex-col items-center bg-white p-4 shadow-md">
            <h3 className="text-center font-bold">No Release yet</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default RenderDashboard;
