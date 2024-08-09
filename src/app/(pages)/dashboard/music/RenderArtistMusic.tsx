import { FaMusic } from "react-icons/fa";
import { type Audio } from "@prisma/client";
import MusicReleaseComponent from "./_components/MusicReleaseComponent";
import Link from "next/link";

const RenderArtistMusic = ({
  musicReleases,
}: {
  musicReleases: Audio[] | null;
}) => {
  return (
    <div className="my-20">
      {/* Header */}
      <div className="mb-16 text-center lg:mt-36">
        <h1 className="my-3 text-6xl"> My Music</h1>
        <h3 className="mx-auto text-center lg:w-[60%]">
          Get your music on iTunes, Spotify, Apple Music, Amazon, Google Play,
          Tidal and 100+ more DSPs
        </h3>
      </div>

      {/* Music Upload */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="font-semiBold flex flex-col items-center justify-center rounded-3xl bg-primary p-6 text-white shadow-2xl">
          <h3 className="my-8 text-3xl">Standard Release</h3>
          <FaMusic className="text-5xl" />
          <Link href="/dashboard/music/release">
            <button className="my-8 rounded-2xl border-2 border-white px-12 py-4 text-lg hover:bg-secondary hover:text-black">
              Upload
            </button>
          </Link>
        </div>
      </section>

      {/* Music Releases */}
      <section className="my-20">
        <h3 className="text-4xl font-semibold">My Releases</h3>
        <MusicReleaseComponent releases={musicReleases} />
      </section>
    </div>
  );
};

export default RenderArtistMusic;
