import { type Audio } from "@/app/(pages)/dashboard/types/audio.type";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import { ButtonWithIcon } from "./ButtonWithIcon";
import { FaChevronRight } from "react-icons/fa";
import { convertIsoDateString } from "@/helper/convertIsoDate";

type ReleaseMobileView = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  release: any;
  description: string;
};

const MobileViewReleaseDetails = ({
  release,
  description,
}: ReleaseMobileView) => (
  <div className="my-2">
    <h5 className="my-2 font-medium uppercase">{description}</h5>
    <p className="font-bold">{release}</p>
  </div>
);

const ReleaseCard = ({ releases }: { releases: Audio[] | null }) => {
  return (
    <div>
      <div className="hidden md:block">
        <table className="mb-32 min-w-full divide-y divide-gray text-[14px] capitalize">
          <thead className="bg-black font-medium uppercase text-white">
            <tr>
              <th className="p-4 text-left capitalize">Status</th>
              <th className="p-4 text-left capitalize">Release</th>
              <th className="p-4 text-left capitalize">Artist</th>
              <th className="p-4 text-left capitalize">Release Date</th>
              <th className="p-4 text-left capitalize">UPC</th>
              <th className="p-4 text-left capitalize">SmartLink</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray capitalize">
            {Array.isArray(releases) ? (
              releases.map((release: Audio | null, index) => (
                <tr
                  key={index}
                  className={`font-medium ${index % 2 ? "bg-secondary" : "bg-white"}`}
                >
                  <td className="whitespace-nowrap border-b border-gray px-4 py-4 text-center font-medium text-white">
                    {release?.status === "pending" ||
                    release?.status.includes("REQUIRES REPAIR") ? (
                      <p className="rounded-xl bg-error p-3">
                        {release?.status}
                      </p>
                    ) : (
                      <p className="rounded-xl bg-green-600 p-3">
                        {release?.status}
                      </p>
                    )}
                  </td>
                  <td className="flex items-center gap-3 whitespace-nowrap border-b border-gray px-4 py-4">
                    {release && (
                      <Image
                        src={release?.releaseCover ?? ""}
                        alt="cover art"
                        className="h-16 w-16 object-cover"
                        width={60}
                        height={60}
                      />
                    )}
                    <p className="w-1/2">
                      {(release?.title?.length ?? 0) > 30
                        ? `${release?.title.slice(0, 30)}...`
                        : release?.title}
                    </p>
                  </td>
                  <td className="whitespace-nowrap border-b border-gray px-4 py-4">
                    <p>{release?.artist}</p>
                  </td>
                  <td className="whitespace-nowrap border-b border-gray px-4 py-4">
                    <p>{convertIsoDateString(release?.releaseDate)}</p>
                  </td>
                  <td className="whitespace-nowrap border-b border-gray px-4 py-4">
                    <p>{release?.UPC === "" ? "N/A" : release?.UPC}</p>
                  </td>
                  <td className="whitespace-nowrap border-b border-gray px-4 py-4">
                    {release?.smartLink === "" ? (
                      "N/A"
                    ) : (
                      <Link href={release?.smartLink ?? ""} target="_blank">
                        <Button
                          className="border-2 border-primary bg-white px-10 hover:text-white"
                          color="text-black"
                        >
                          Smartlink
                        </Button>
                      </Link>
                    )}
                  </td>
                  <td className="whitespace-nowrap border-b border-gray px-4 py-4">
                    <Link href={`/dashboard/music/release/view/${release?.id}`}>
                      <FaChevronRight size={30} />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="whitespace-nowrap px-4 py-4 text-center text-xl font-medium">
                  <p>No Release yet</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Mobile view */}
      <div className="my-10 md:hidden">
        {Array.isArray(releases) ? (
          releases.map((release: Audio | null, index) => (
            <div
              key={index}
              className="my-10 mb-4 flex flex-col rounded-xl bg-white p-3 shadow-xl"
            >
              <Image
                src={release?.releaseCover ?? ""}
                alt="cover art"
                className="mb-10 w-[400px] rounded-lg object-contain"
                width={400}
                height={400}
              />
              <div className="flex flex-col capitalize">
                <MobileViewReleaseDetails
                  release={release?.title}
                  description="song title"
                />
                <MobileViewReleaseDetails
                  release={
                    release?.status === "pending" ? (
                      <span className="mt-10 rounded-xl bg-error px-4 py-2 text-white">
                        {release?.status}
                      </span>
                    ) : (
                      <span className="rounded-xl bg-green-600 px-4 py-2 text-white">
                        {release?.status}
                      </span>
                    )
                  }
                  description="Status"
                />
                <MobileViewReleaseDetails
                  release={release?.UPC === "" ? "N/A" : release?.UPC}
                  description="UPC Code"
                />

                <MobileViewReleaseDetails
                  release={convertIsoDateString(release?.releaseDate)}
                  description="Release Date"
                />
                <div>
                  <h5 className="my-3 font-medium uppercase">SmartLink</h5>
                  {release?.smartLink === "" ? (
                    <p className="my-3 font-bold uppercase">N/A</p>
                  ) : (
                    <Link href={release?.smartLink ?? ""} target="_blank">
                      <Button
                        className="border-2 border-primary bg-white px-10 hover:text-white"
                        color="text-black"
                      >
                        Smartlink
                      </Button>
                    </Link>
                  )}
                </div>
                <Link href={`/dashboard/music/release/view/${release?.id}`}>
                  <ButtonWithIcon className="mt-5" iconName="view">
                    View
                  </ButtonWithIcon>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="mb-4 flex flex-col items-center bg-white p-4 shadow-md">
            <h3 className="text-center font-medium">No Release yet</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReleaseCard;
