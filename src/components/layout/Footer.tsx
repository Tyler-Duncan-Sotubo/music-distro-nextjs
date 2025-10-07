"use client";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaArrowCircleUp,
} from "react-icons/fa";
import Link from "next/link";
import { Link as Scroll } from "react-scroll";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-backgroundTo from-15% via-black via-30% to-black to-90% py-16 text-white">
      <section className="mx-auto w-[90%]">
        <div className="grid w-[80%] grid-cols-1 gap-6 md:grid-cols-3">
          {get_started.map((item, index) => (
            <div key={index}>
              <h3 className="mb-6 text-xl font-bold">{item.title}</h3>
              <ul className="flex flex-col gap-3">
                {item.links.map((link, index) => (
                  <li key={index} className="flex list-none items-center gap-2">
                    <Link
                      href={link.href}
                      className="tracking-wider hover:text-primary"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 flex justify-between">
          <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
          <div className="flex justify-between gap-6">
            <FaFacebook size={30} />
            <FaTwitter size={30} />
            <FaInstagram size={30} />
          </div>
        </div>
      </section>
      <Scroll
        key="stores"
        activeClass="active"
        to="nav"
        spy={true}
        smooth={true}
        offset={-10}
        duration={500}
      >
        <div className="absolute right-0 top-3 cursor-pointer p-10">
          <FaArrowCircleUp size={40} />
        </div>
      </Scroll>
    </footer>
  );
};

export default Footer;

const get_started = [
  {
    title: "Get Started",

    links: [
      {
        href: "/register",
        title: "Sign Up",
      },
      {
        href: "/login",
        title: "Login",
      },
      {
        href: "https://weplugmusic.com/pricing",
        title: "Pricing",
      },
      {
        href: "https://weplugmusic.com/contact",
        title: "Contact Us",
      },
    ],
  },
  {
    title: "Services",
    links: [
      {
        href: "/dashboard/music",
        title: "Music Submission",
      },
      {
        href: "https://weplugmusic.com/vevo",
        title: "Vevo Channel",
      },
      {
        href: "https://weplugmusic.com/promo",
        title: "Music Promotion",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        href: "https://weplugmusic.com/support",
        title: "FAQ",
      },
      {
        href: "https://weplugmusic.com/terms",
        title: "Terms & Conditions",
      },
      {
        href: "https://weplugmusic.com/privacy",
        title: "Privacy",
      },
      {
        href: "https://weplugmusic.com/blog",
        title: "Blog",
      },
    ],
  },
];
