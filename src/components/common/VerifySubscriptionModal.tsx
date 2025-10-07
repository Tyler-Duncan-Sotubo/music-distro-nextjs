"use client";

import { type Subscriptions } from "@prisma/client";
import Link from "next/link";

type VerifySubscriptionModalProps = {
  showModal: boolean;
  userSubscription: Subscriptions | null;
};

const VerifySubscriptionModal = ({
  showModal,
  userSubscription,
}: VerifySubscriptionModalProps) => {
  return (
    <>
      {/* Subscription Modal */}
      {showModal && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          {(!userSubscription ||
            userSubscription.status === "" ||
            userSubscription.status !== "active" ||
            !userSubscription.expiresAt ||
            userSubscription.expiresAt <= new Date()) && (
            <div className="flex h-[30%] w-[80%] flex-col items-center justify-center gap-6 rounded-2xl bg-white px-10 py-6 md:h-[30%] md:w-[40%]">
              <h3 className="text-center text-lg capitalize">
                You need to subscribe to upload music
              </h3>
              <Link href="/dashboard/subscription">
                <button className="w-full bg-primary px-3 py-4 text-center text-white">
                  Subscribe Now
                </button>
              </Link>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default VerifySubscriptionModal;
