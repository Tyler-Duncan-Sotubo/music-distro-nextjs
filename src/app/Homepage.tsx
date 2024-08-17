import React from "react";
import Navigation from "@/components/navigation/Navigation";
import Image from "next/image";
import { distros } from "../data/data";
import { TestimonialSlider } from "@/components/common/TestimonialSlider";
import Footer from "@/components/layout/Footer";
import SubscriptionPlan from "@/components/common/SubscriptionPlan";
import Link from "next/link";
type DistroType = {
  name: string;
  image: string;
};

type releaseType = {
  title: string;
  artist: string;
  releaseCover: string;
  smartLink: string;
};

interface ExchangeRateResponse {
  nairaToDollarsRateToday: number;
  releases: releaseType[] | null;
}

const Homepage = ({
  nairaToDollarsRateToday,
  releases,
}: ExchangeRateResponse) => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen bg-[url('/img/hero/homepage.png')] bg-cover md:mt-[5rem]">
          <div className="absolute top-1/3 -translate-y-1/3 transform px-5 md:w-1/2 md:pl-20">
            <h1 className="font-bold tracking-wide text-white md:text-6xl">
              The simplest way to sell your music globally.
            </h1>
            <h3 className="mt-6 font-medium capitalize text-secondary">
              Helping independent artist and Labels Reach millions of listeners
              – easier than ever before
            </h3>
          </div>
          <div className="absolute top-2/3 mx-auto w-full md:top-3/4">
            <h3 className="text-center text-sm font-bold uppercase text-white">
              Get Your Music On
            </h3>
            <div className="flex flex-wrap justify-center gap-5 px-5 md:gap-10">
              {distros.map((distro: DistroType, index: number) => (
                <div
                  key={index}
                  className="relative h-16 w-24 duration-300 hover:scale-125 md:h-16 md:w-36"
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
        </section>

        {/* Why Choose Us  */}
        <section className="mt-12">
          <div className="mx-auto w-[85%]">
            <div className="items-center justify-between gap-16 md:flex">
              <div className="md:w-[50%]">
                <h1 className="text-5xl font-bold md:text-7xl">
                  Don&apos;t stand alone in the rain
                </h1>
                <h3 className="mt-6 text-xl tracking-wide">
                  - We take care of hurdles in distribution.
                </h3>
                <h3 className="mt-6 text-lg tracking-wider text-black">
                  We distribute your music to top digital music services like
                  Spotify, Apple Music, Tidal, Amazon Music, and more. We also
                  help you promote your music and get it heard by millions of
                  new fans.
                </h3>
              </div>
              <div className="justify-self-end md:w-[50%]">
                <Image
                  src="/img/image_test_four.jpg"
                  alt="why choose us"
                  width={600}
                  height={600}
                />
              </div>
            </div>
          </div>
          <div className="mx-auto w-[85%] py-24">
            <div className="flex flex-col-reverse items-center gap-16 md:flex md:flex-row">
              <div className="md:w-[50%]">
                <Image
                  src="/img/image_test_three.jpg"
                  alt="why choose us"
                  width={600}
                  height={500}
                />
              </div>
              <div className="md:w-[55%]">
                <h1 className="text-5xl font-bold md:text-7xl">
                  Keep 100% of Your Rights
                </h1>
                <h3 className="mt-6 text-xl tracking-wide">
                  - Focus on what you do best. We&apos;ll take care of the rest.
                </h3>
                <h3 className="mt-6 text-lg tracking-wider text-black">
                  Be in control of your success.We provide you with the tools
                  you need to succeed in the music industry. You can track your
                  sales, streaming revenue, and more from your dashboard.
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Releases */}
        <section className="mx-auto my-20 w-[90%]">
          <div className="flex items-center justify-center">
            <h1 className="text-4xl font-bold">New Releases</h1>
          </div>
          <div className="mt-6 grid w-full grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
            {releases
              ?.slice(0, 8)
              .map((release: releaseType, index: number) => (
                <Link href={release.smartLink} key={index} target="_blank">
                  <div className="flex w-full flex-col items-center">
                    <div className="relative h-[200px] w-[200px] md:h-[330px] md:w-[300px]">
                      <Image
                        src={release.releaseCover}
                        alt={release.title}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <h3 className="text-center text-sm font-bold md:text-lg">
                      {release.title}
                    </h3>
                    <h3 className="mb-10 mt-1 text-sm text-zinc-900 md:text-lg">
                      {release.artist}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* Subscription Plan */}
        <section className="mx-auto w-[90%]">
          <SubscriptionPlan
            header="Choose Your Perfect Plan"
            nairaToDollarsRateToday={nairaToDollarsRateToday}
          />
        </section>

        {/* Vevo */}
        <section className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-900 bg-[url('/img/VevoBg.jpg')] bg-cover bg-blend-overlay">
          <h1 className="px-3 text-center text-4xl font-bold tracking-wide text-white md:w-1/2 md:text-7xl">
            Release Official Music Videos on Vevo
          </h1>
          <h3 className="mt-6 px-3 text-center text-lg font-medium capitalize tracking-wider text-secondary md:w-1/2">
            Get your music videos live on VEVO and start earning royalties from
            the world’s most popular music video platforms. From channel setup
            to video uploads, we’ve got you covered.
          </h3>
          <div className="my-20 flex gap-9">
            <div className="relative h-16 w-24 duration-300 hover:scale-125 md:h-16 md:w-36">
              <Image
                src="/img/distros/vevo-auth.svg"
                alt="logo of vevo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="relative h-16 w-24 duration-300 hover:scale-125 md:h-16 md:w-36">
              <Image
                src="/img/distros/youtube-music-auth.svg"
                alt="logo of vevo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialSlider />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Homepage;
