"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import FrequentlyAskedQuestions from "@/components/common/FrequentlyAskedQuestions";
import { vevoFAQ } from "@/data/data";

const page = () => {
  const user = true;
  return (
    <section>
      <div className="relative h-[92vh] bg-[url('/img/hero/vevo.jpg')] bg-cover">
        <div className="absolute top-1/2 -translate-y-1/2 transform px-5 md:w-1/2 md:pl-20">
          <h1 className="font-bold tracking-wide text-white md:text-6xl">
            Get your music videos on VEVO
          </h1>
          <h3 className="mt-6 font-medium capitalize text-secondary">
            Make your music videos available on the largest video network in the
            world through Vevo
          </h3>
          <div className="my-10 flex gap-9">
            <div className="relative h-28 w-40">
              <Image
                src="/img/distros/vevo-auth.svg"
                alt="logo of vevo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="relative h-28 w-40">
              <Image
                src="/img/distros/youtube-music-auth.svg"
                alt="logo of vevo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* How to get on Video */}
      <article className="mx-auto my-20 w-[90%]">
        <h1 className="mx-auto my-16 text-center capitalize md:w-1/2">
          How to get your music on VEVO
        </h1>
        <div className="md:flex-row-between flex flex-col gap-10 md:flex-row">
          <ul className="flex list-inside list-decimal flex-col gap-3 text-xl tracking-wide md:w-1/2">
            <li>Sign up for an account</li>
            <li>Set up an official Vevo artist channel.</li>
            <li>Submit your music videos for review</li>
            <li>
              Add credits and any collaborators to be paid by Vevo
              automatically.
            </li>
            <li>Start earning money</li>
            <li>Track and Withdraw Your Earnings</li>
          </ul>
          <div className="md:w-1/2">
            <Image
              src="/img/vevo-inside.png"
              alt="vevo steps"
              width={800}
              height={600}
            />
          </div>
        </div>
      </article>
      <article className="">
        <div className="mx-auto my-20 w-[90%]">
          <div className="md:flex-row-between flex flex-col-reverse gap-10 md:flex-row">
            <div className="md:w-1/2">
              <Image
                src="/img/vevo-why.png"
                alt="why choose vevo"
                width={600}
                height={400}
              />
            </div>
            <div className="md:w-1/2">
              <h1 className="mx-auto my-6 text-center capitalize md:w-1/2">
                Why Vevo?
              </h1>
              <p className="mb-10 text-xl tracking-wide">
                With more than 900,000 videos from artists of all levels and
                genres, Vevo maintains the largest network of music channels on
                YouTube, as well as global distribution through a growing number
                of partners.
              </p>
              <p className="mb-10 text-xl tracking-wide">
                For over a decade, fans have come to recognize the Vevo logo as
                a verified indicator of premium, official content from the
                artists they are searching for and those they’ve yet to
                discover.
              </p>
              <p className="mb-10 text-xl tracking-wide">
                In addition to YouTube, Vevo distributes its extensive library
                of music videos to major Connected TV platforms and streaming
                services, including Apple TV, Hulu + Live TV, Pluto TV, Samsung
                TV Plus, and Roku. To learn more about Vevo&apos;s position on
                smart TVs and other connected devices.
              </p>
            </div>
          </div>
        </div>

        {/* Vevo Pricing */}
        <h1 className="mx-auto my-10 text-center capitalize md:w-1/2">
          Pricing
        </h1>
        <article className="mx-auto flex w-[90%] flex-col gap-10 text-white sm:flex-row md:w-[80%]">
          <div className="flex h-[400px] flex-col items-center justify-center gap-12 rounded-xl bg-black md:w-1/2">
            <p className="w-2/3 text-center text-3xl font-bold">
              VEVO Channel Set up & Video Upload
            </p>
            <p className="text-5xl">₦ 100,000</p>
            <Link href={user ? "/dashboard/videos" : "/login"}>
              <Button className="h-16 text-2xl">New Vevo Channel</Button>
            </Link>
          </div>
          <div className="flex h-[400px] flex-col items-center justify-center gap-12 rounded-xl bg-primary md:w-1/2">
            <p className="w-2/3 text-center text-3xl font-bold">
              VEVO Video Upload
            </p>
            <p className="text-5xl">₦ 30,000</p>
            <Link href={user ? "/dashboard/videos" : "/login"}>
              <Button variant="secondary" className="h-16 text-2xl">
                New Vevo Video
              </Button>
            </Link>
          </div>
        </article>
      </article>
      <div className="mt-20">
        <FrequentlyAskedQuestions
          faqs={vevoFAQ}
          header="Frequently Asked Questions"
        />
      </div>
    </section>
  );
};

export default page;
