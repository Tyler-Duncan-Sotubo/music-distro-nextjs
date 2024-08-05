"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { testimonials } from "../_data/data";
import Image from "next/image";

type TestimonialType = {
  name: string;
  review: string;
  img: string;
};

export const TestimonialSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode:
            false /* set centerMode to false to show complete slide instead of 3 */,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="m-auto my-20 w-[90%] overflow-hidden">
      <h1 className="text-center text-4xl font-bold">What Our Artists Say</h1>
      <div className="mt-20">
        <Slider {...settings}>
          {testimonials.map((testimonial: TestimonialType, index: number) => (
            <div
              key={index}
              className="min-h-[450px] rounded-xl bg-white text-black md:w-2/3"
            >
              <div className="relative flex h-52 w-full items-center justify-center rounded-xl">
                <Image
                  src={testimonial.img}
                  alt=""
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-4 p-4">
                <p className="text-xl font-semibold">{testimonial.name}</p>
                <p className="text-center tracking-wider">
                  {testimonial.review}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
