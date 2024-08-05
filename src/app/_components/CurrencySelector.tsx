import { IoChevronDownSharp } from "react-icons/io5";
import React from "react";

const CurrencySelectorComponent = ({
  currency,
  setCurrency,
}: {
  currency: string | null;
  setCurrency: (currency: string) => void;
}) => {
  return (
    <div className="group relative font-bold">
      <div className="flex cursor-pointer items-center gap-2">
        <button className="flex items-center gap-2">
          <span>{currency}</span>
        </button>
        <IoChevronDownSharp className="text-xl" />
      </div>
      <div className="absolute right-2 z-[9999] hidden w-16 rounded-md border border-gray bg-white shadow-lg group-hover:block">
        <div className="flex flex-col items-center justify-center gap-2 p-2">
          <button
            className="flex items-center gap-2"
            onClick={() => {
              if (currency !== "USD") {
                setCurrency("USD");
              } else {
                setCurrency("NGN");
              }
            }}
          >
            <span>{currency === "USD" ? "NGN" : "USD"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrencySelectorComponent;
