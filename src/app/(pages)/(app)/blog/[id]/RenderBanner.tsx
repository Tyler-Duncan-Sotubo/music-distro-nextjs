import Image from "next/image";

const RenderBanner = () => (
  <div className="w-full">
    <Image
      src="https://tooxclusive-artist-profile.s3.amazonaws.com/blog/banner.jpg"
      alt="blog image"
      width={400}
      height={600}
    />
  </div>
);

export default RenderBanner;
