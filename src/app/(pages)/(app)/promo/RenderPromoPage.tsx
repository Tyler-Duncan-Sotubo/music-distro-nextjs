"use client";

import FrequentlyAskedQuestions from "@/components/common/FrequentlyAskedQuestions";
import Image from "next/image";
import React from "react";
import { Link as Scroll } from "react-scroll";
import { promo, whyPromoteWithUs, promoFAQ } from "@/data/promo";

const RenderPromoPage = () => {
  return (
    <section className="bg-gradient-to-r from-backgroundTo from-15% via-black via-30% to-black to-90%">
      {/* Hero Section */}
      <div className="relative mx-auto h-[92vh] w-[95%]">
        <div className="absolute top-1/2 -translate-y-1/2 transform px-10 md:top-1/3 md:w-[55%] md:-translate-y-1/3 md:pl-20">
          <h1 className="text-5xl font-bold uppercase tracking-wide text-white drop-shadow-2xl md:text-7xl">
            Music promotion
          </h1>
          <h1 className="mt-2 text-3xl font-bold capitalize tracking-wide text-primaryHover drop-shadow-2xl md:text-6xl">
            <span className="text-white">done</span> right!
          </h1>
          <h3 className="mt-6 font-medium capitalize leading-relaxed tracking-wider text-secondary">
            Promote your music with Spotify playlists and influencers’ TikTok
            videos. Online press. Social strategy. Sponsored Ads. to elevate
            your music career to the next level.
          </h3>
          <div className="mt-10">
            <Scroll to="packages" smooth={true} duration={600}>
              <button className="rounded-full border border-x-gray bg-primary px-16 py-6 text-sm font-bold uppercase tracking-normal text-white hover:bg-primaryHover focus:bg-primaryHover md:text-xl">
                Choose A Package
              </button>
            </Scroll>
          </div>
        </div>

        <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 transform px-10 md:top-2/3 md:block md:-translate-y-2/3 md:pl-20">
          <div className="flex gap-10">
            <Image
              src="/img/promo/spotify-charts.svg"
              alt="promo"
              width={250}
              height={250}
            />
            <Image
              src="/img/promo/tiktok-chart.svg"
              alt="promo"
              width={250}
              height={250}
            />
          </div>
        </div>
      </div>

      {/* Why Promote With Us */}
      <div className="mx-auto text-white">
        <h1 className="text-center text-2xl font-bold text-white md:text-4xl">
          Why promote with us?
        </h1>
        <article className="mx-auto my-20 md:w-[80%]">
          {whyPromoteWithUs.map((item, index) => (
            <div
              key={index}
              className={`mb-12 flex flex-col-reverse items-center text-center md:mb-0 md:flex-row md:gap-20 md:text-left ${
                index % 2 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex justify-center md:justify-normal">
                <div
                  key={index}
                  className="relative mt-6 h-[400px] w-[400px] md:h-[350px] md:w-[350px]"
                >
                  <Image
                    src={item.image}
                    alt={`logo of ${item.title}`}
                    fill
                    style={{ objectFit: "contain" }}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="mt-8 text-2xl font-bold md:text-4xl">
                  {item.title}
                </h2>
                <p className="mt-4 text-lg tracking-wide text-secondary">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </article>
      </div>

      {/* Choose A Package */}
      <section
        id="packages"
        className="mx-auto flex w-[85%] flex-col items-center justify-center py-20"
      >
        <h1 className="text-4xl font-bold text-white">Choose A Package</h1>
        <h3 className="mt-8 w-[50%] text-center text-2xl font-bold uppercase text-secondary">
          Get your music heard by the right audience with our range of promotion
        </h3>

        {/* Promo Packages */}
        <div className="my-10 grid grid-cols-1 gap-3 md:grid-cols-3">
          {promo.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white px-8 py-4 text-center shadow-xl"
            >
              <div className="mt-2 flex w-full flex-col items-center justify-center text-black">
                <h3 className="text-lg font-bold capitalize md:text-2xl">
                  {item.name}
                </h3>
                <p className="mt-2 text-lg tracking-wide">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions For Promotion */}
      <FrequentlyAskedQuestions
        faqs={promoFAQ}
        header="Frequently Asked Questions"
        className="text-white md:w-[80%]"
      />
    </section>
  );
};

export default RenderPromoPage;
