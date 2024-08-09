"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

type faq = {
  question: string;
  answer: string | string[];
};

type FAQ = {
  faqs: faq[];
  header?: string;
  className?: string;
};

const FrequentlyAskedQuestions = ({
  faqs,
  header = "",
  className = "",
}: FAQ) => {
  // State
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className={`${className} mx-auto w-[90%] md:w-[70%]`}>
      <div>
        <h1 className="mb-16 mt-4 text-center text-4xl">{header}</h1>
        {/* FAQ */}
        <div className="flex flex-col items-center justify-center">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-10 w-full">
              <div
                className="flex cursor-pointer flex-col items-center justify-between"
                onClick={() =>
                  activeIndex === index
                    ? setActiveIndex(null)
                    : setActiveIndex(index)
                }
              >
                <div className="mb-5 flex w-full items-center justify-between gap-10 border-b px-2">
                  <h2 className="my-2 text-lg capitalize md:text-2xl">
                    {faq.question}
                  </h2>
                  <span className="text-xl">
                    {activeIndex === index ? (
                      <FaChevronDown className="animate-bounce duration-700" />
                    ) : (
                      <FaChevronDown />
                    )}
                  </span>
                </div>
                <div
                  className={
                    activeIndex === index ? "mt-2 animate-slideIn" : "hidden"
                  }
                >
                  <div className="text-xl tracking-wide md:text-2xl">
                    {Array.isArray(faq.answer) ? (
                      faq.answer.map((ans, index) => (
                        <div
                          key={index}
                          className="my-2 flex items-center gap-3"
                        >
                          <FaCheck size={20} />
                          <p>{ans}</p>
                        </div>
                      ))
                    ) : (
                      <p>{faq.answer}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAskedQuestions;
