"use client";

import { useState } from "react";
import FrequentlyAskedQuestions from "@/components/common/FrequentlyAskedQuestions";
import React from "react";
import { supportFAQ } from "@/data/data";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import SearchBar from "./SearchBar";

const SupportPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="mb-16 mt-32">
      <h1 className="text-center">Support and Help Center</h1>
      <p className="mt-5 text-center">
        Welcome to our support and help center. Here you can find answers to
        common questions.
      </p>

      {/* search bar */}
      <SearchBar />

      {/* FAQ */}
      <article>
        {supportFAQ.map((faq, index) => (
          <div key={index}>
            <div
              className="mx-auto my-10 flex w-[90%] cursor-pointer justify-between rounded-xl border p-5 md:w-[70%]"
              onClick={() =>
                activeIndex === index
                  ? setActiveIndex(null)
                  : setActiveIndex(index)
              }
            >
              <h3 className="font-bold">{faq.Header}</h3>
              {activeIndex === index ? (
                <FaChevronCircleUp />
              ) : (
                <FaChevronCircleDown />
              )}
            </div>
            {/* FAQ */}
            {activeIndex === index && (
              <div className="animate-slideIn">
                <FrequentlyAskedQuestions faqs={faq.faqs} />
              </div>
            )}
          </div>
        ))}
      </article>
    </section>
  );
};

export default SupportPage;
