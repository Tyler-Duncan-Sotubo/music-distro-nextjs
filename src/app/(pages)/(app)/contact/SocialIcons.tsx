import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const SocialIcons = () => (
  <div className="flex space-x-4 my-10 gap-3 text-primary">
    <Link
      href="https://www.facebook.com/WeplugMusicDistro"
      target="_blank"
      rel="noreferrer noopener">
      <FaFacebook className="text-4xl" />
    </Link>
    <Link
      href="https://x.com/weplugmusic"
      target="_blank"
      rel="noreferrer noopener">
      <FaTwitter className="text-4xl" />
    </Link>
    <Link
      href="https://www.instagram.com/weplugmusic_distro/"
      target="_blank"
      rel="noreferrer noopener">
      <FaInstagram className="text-4xl" />
    </Link>
    <Link
      href="https://wa.link/qom9e7"
      target="_blank"
      rel="noreferrer noopener">
      <FaWhatsapp className="text-4xl" />
    </Link>
  </div>
);

export default SocialIcons;
