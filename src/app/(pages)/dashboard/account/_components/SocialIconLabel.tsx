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

type SocialIconLabelProps = {
  platform: string;
  description: string;
};

export const SocialIconLabel = ({
  description,
  platform,
}: SocialIconLabelProps) => {
  return (
    <div className="flex items-center gap-3 p-2">
      <div>
        {platform === "spotify" && <FaSpotify size={25} />}
        {platform === "apple" && <FaApple size={25} />}
        {platform === "youtube" && <FaYoutube size={25} />}
        {platform === "instagram" && <FaInstagram size={25} />}
        {platform === "facebook" && <FaFacebookF size={25} />}
        {platform === "tiktok" && <FaTiktok size={25} />}
        {platform === "soundcloud" && <FaSoundcloud size={25} />}
        {platform === "website" && <FaGlobe size={25} />}
        {platform === "twitter" && <FaXTwitter size={25} />}
      </div>
      <div className="text-[1rem] text-primary">{description}</div>
    </div>
  );
};
