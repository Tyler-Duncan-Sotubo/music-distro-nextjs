"use client";

import { BsFillPatchCheckFill } from "react-icons/bs";
import { features } from "../../data/data";
import Link from "next/link";
import CurrencySelectorComponent from "./CurrencySelector";
import React from "react";
import { useState } from "react";

type SubscriptionPlanProps = {
  header?: string;
  nairaToDollarsRateToday: number;
};

const SubscriptionPlan = ({
  header = "",
  nairaToDollarsRateToday = 0,
}: SubscriptionPlanProps) => {
  const user = true;
  const [currency, setCurrency] = useState<string | null>("NGN");

  return (
    <section>
      <div className="pb-20">
        <h2 className="mb-10 text-center text-3xl font-bold">{header}</h2>
        <section className="my-10 flex justify-center gap-4 capitalize">
          <p>selected preferred currency</p>
          <div className="w-16">
            <CurrencySelectorComponent
              currency={currency}
              setCurrency={setCurrency}
            />
          </div>
        </section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`border px-7 py-6 duration-1000 hover:scale-105 ${
                index === 1 &&
                "bg-gradient-to-r from-backgroundTo from-15% via-black via-30% to-black to-90% text-white"
              }`}
            >
              {index === 1 ? (
                <div className="text-right">
                  <p className="inline-block bg-primary px-2 py-1 text-[10px]">
                    Popular Plan
                  </p>
                </div>
              ) : (
                <div className="py-3" />
              )}
              <h3 className="capitalize">{feature.plan}</h3>
              <div className="my-2 flex items-center gap-2">
                {currency === "NGN" ? (
                  <h1>₦{feature.price}</h1>
                ) : (
                  <h1>
                    $
                    {(
                      nairaToDollarsRateToday *
                      Number(feature.price.replace(/,/g, ""))
                    ).toFixed(0)}
                  </h1>
                )}
                <p>Per Year</p>
              </div>
              <h6 className="font-light">{feature.description}</h6>
              <div className="my-3 flex flex-col">
                {!user ? (
                  <Link href="/login" className="my-3 flex flex-col">
                    <button
                      className={`py-3 text-white ${
                        index === 1 ? "bg-primary" : "bg-black"
                      }`}
                    >
                      <p>Get Started</p>
                    </button>
                  </Link>
                ) : (
                  <Link
                    href="/dashboard/subscription"
                    className="my-3 flex flex-col"
                  >
                    <button
                      className={`py-3 text-white ${
                        index === 1 ? "bg-primary" : "bg-black"
                      }`}
                    >
                      <p>Get Started</p>
                    </button>
                  </Link>
                )}
              </div>
              <div className="mt-6">
                <h3 className="mb-3 font-bold">Features</h3>
                <ul className="mb-10 flex flex-col gap-2">
                  {feature.features.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <BsFillPatchCheckFill className="text-primary" />
                      <p className="text-lg">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlan;
