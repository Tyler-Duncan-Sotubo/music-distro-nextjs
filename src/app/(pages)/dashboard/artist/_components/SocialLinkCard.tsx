import Link from "next/link";
import React from "react";
import {
  FaSpotify,
  FaApple,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaSoundcloud,
  FaGlobe,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type SocialLinkCardProps = {
  platform: string;
  url?: string;
  description: string;
};

const LinkPlaceholder = () => {
  return <div className="h-6 w-full rounded-lg bg-secondary" />;
};

export const SocialLinkCard = ({
  url,
  description,
  platform,
}: SocialLinkCardProps) => {
  return (
    <div className="mb-10 flex items-center gap-3 md:mb-0 md:w-1/2">
      <div>
        {platform === "spotify" && <FaSpotify size={40} />}
        {platform === "apple" && <FaApple size={40} />}
        {platform === "youtube" && <FaYoutube size={40} />}
        {platform === "instagram" && <FaInstagram size={40} />}
        {platform === "facebook" && <FaFacebookF size={40} />}
        {platform === "tiktok" && <FaTiktok size={40} />}
        {platform === "soundcloud" && <FaSoundcloud size={40} />}
        {platform === "website" && <FaGlobe size={40} />}
        {platform === "twitter" && <FaXTwitter size={40} />}
      </div>
      <div className="w-full">
        <div className="mb-1 text-[1rem]">{description}</div>
        {url ? (
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[.9rem] text-primary"
          >
            {url.substring(0, 40) + "..."}
          </Link>
        ) : (
          <LinkPlaceholder />
        )}
      </div>
    </div>
  );
};

export const SocialCardContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="my-10 items-center justify-between gap-10 md:mb-0 md:flex">
      {children}
    </div>
  );
};
