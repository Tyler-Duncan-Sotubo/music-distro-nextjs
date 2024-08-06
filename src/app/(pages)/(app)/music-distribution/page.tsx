"use client";

import React from "react";
import Image from "next/image";
import { distros } from "@/data/data";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="relative h-[92vh] bg-[url('/img/hero/musicdistro.png')] bg-cover">
        <div className="absolute top-1/3 -translate-y-1/3 transform px-10 md:w-[45%] md:pl-20">
          <h1 className="text-5xl font-bold capitalize tracking-wide text-white md:text-6xl">
            Get on the biggest music platforms.
          </h1>
          <h3 className="mt-6 font-medium capitalize text-secondary">
            Reach millions of listeners worldwide and keep everything you earn.
          </h3>
        </div>
        <div className="absolute top-2/3 mx-auto w-full md:top-3/4">
          <div className="mt-10 flex flex-wrap justify-center gap-5 px-5 md:gap-10">
            {distros.map((distro, index) => (
              <div
                key={index}
                className="relative h-16 w-24 duration-300 hover:scale-125 md:h-20 md:w-36"
              >
                <Image
                  src={distro.image}
                  alt={`logo of ${distro.name}`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stores Section */}
      <section className="stores mx-auto min-h-screen w-[90%] bg-white py-10">
        <h4 className="my-10 text-center text-xl capitalize">
          Get on Biggest Stores in the world
        </h4>
        <div className="grid grid-cols-2 items-center justify-center gap-3 md:grid-cols-5 md:gap-10">
          {distro.map((distro, index) => (
            <div
              key={index}
              className="relative flex h-36 w-full items-center justify-center rounded-xl bg-white shadow-xl"
            >
              <div className="relative h-36 w-36">
                <Image
                  src={distro.image}
                  alt={`logo of distro`}
                  fill
                  style={{ objectFit: "contain" }}
                  className="duration-500 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="mx-auto w-[85%] py-24">
          <div className="mx-auto flex items-center md:w-1/2">
            <h1 className="md:text-58xl mb-10 mt-4 text-center text-4xl">
              How to Sell Your Music Online
            </h1>
          </div>
          <div className="my-10 grid grid-cols-1 justify-center gap-10 md:grid-cols-3">
            {howToSell.map((how, index) => (
              <div key={index}>
                <h1 className="text-center">{index + 1}</h1>
                <h3 className="my-8 text-center text-3xl font-bold tracking-wide">
                  {how.title}
                </h3>
                <p className="mt-4 text-center text-lg tracking-wide">
                  {how.description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <Link href="/register">
              <Button className="mx-auto bg-primary px-8 py-3 text-white">
                <p className="text-xl capitalize">Sign Up Now</p>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;

const distro = [
  { image: "/img/distros/apple_music.svg" },
  { image: "/img/distros/deezer.svg" },
  { image: "/img/distros/spotify.svg" },
  { image: "/img/distros/boomplay.svg" },
  { image: "/img/distros/tidal.svg" },
  { image: "/img/distros/itunes.svg" },
  { image: "/img/distros/youtube_music.svg" },
  { image: "/img/distros/itunes_radio.svg" },
  { image: "/img/distros/saavn.svg" },
  { image: "/img/distros/soundcloud.svg" },
  { image: "/img/distros/tiktok.svg" },
  { image: "/img/distros/huawei.svg" },
  { image: "/img/distros/kkbox.svg" },
  { image: "/img/distros/peleton.svg" },
  { image: "/img/distros/audiomack.svg" },
  { image: "/img/distros/youtube.svg" },
  { image: "/img/distros/vevo.svg" },
  { image: "/img/distros/beatport.svg" },
  { image: "/img/distros/napster.svg" },
  { image: "/img/distros/digital.svg" },
];

const howToSell = [
  {
    title: "Upload Your Music",
    description:
      "Upload your tracks, artwork, and release information quickly and easily. In addition to Spotify, Apple Music, Amazon, and iTunes, choose from 150+ additional digital store and streaming services.",
  },
  {
    title: "Get Discovered",
    description:
      "We'll help you get your music heard by millions of new fans. We'll also help you promote your music and get it featured on top playlists.",
  },
  {
    title: "Earn Money",
    description:
      "Keep 100% of your rights. We'll pay you every time your music is streamed or downloaded.",
  },
];
