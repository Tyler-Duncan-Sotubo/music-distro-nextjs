import { StreamsGraph } from "../graphs/StreamsGraph";
// import { type Stream } from "@prisma/client";
import { type Stream } from "../types/stream.type";

const RenderAnalyticsPage = ({
  streams,
}: {
  streams: Stream | undefined | null;
}) => {
  const data = streams;

  function formatNumber(number: number) {
    if (number < 1000) {
      return number?.toString();
    } else {
      return number?.toLocaleString();
    }
  }

  // Function to calculate total streams
  const calculateTotalStreams = (data: Stream | undefined | null) => {
    if (!data) return 0;
    const platforms = [
      "apple",
      "spotify",
      "youtube",
      "amazon",
      "tidal",
      "deezer",
      "boomPlay",
      "tiktok",
      "facebook",
    ] as const;

    let total = 0;
    platforms.forEach((platform) => {
      const platformData = data[platform];
      total += parseInt(String(platformData.total), 10) || 0;
    });
    return total;
  };

  // Calculate total streams
  const totalStreams = calculateTotalStreams(data);

  return (
    <>
      {/* Streams and Downloads */}
      <section className="my-20 text-center md:mt-36">
        <div className="my-16">
          <h1 className="">My Streams and Downloads</h1>
          <h3 className="my-4">
            Some stores don’t provide live sales & streaming data, so these
            reports may not reflect your exact final sales figures.
          </h3>
        </div>

        <div className="md:flex md:h-[400px]">
          <div className="md:w-[70%]">
            {Object.keys(data ?? {}).length === 0 ? (
              <section className="relative inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="flex h-[30%] w-full flex-col items-center justify-center gap-6 bg-white px-10 py-6 opacity-70 md:h-[400px]">
                  <StreamsGraph data={data} />
                  <h3 className="absolute w-2/3 font-bold lg:w-1/2">
                    No downloads reported yet for the last 7 days. Come back
                    later to check again.
                  </h3>
                </div>
              </section>
            ) : (
              <StreamsGraph data={data} />
            )}
          </div>

          <div className="flex flex-col gap-3 text-center capitalize md:w-[25%]">
            <h1 className="my-6 text-center text-2xl font-bold">
              Weekly Report
            </h1>
            <div>
              {data?.week_start && (
                <p className="text-center text-sm">
                  {data?.week_start} - {data?.week_end}
                </p>
              )}
            </div>
            <div className="mb-4 text-center text-3xl">
              <p className="text-lg">Total Streams</p>
              <h4 className="text-center text-2xl font-bold">
                {formatNumber(data?.total_streams ?? 0)}
              </h4>
            </div>
            <div className="mb-4 text-center text-3xl">
              <p className="text-lg">This Week</p>
              <h4 className="my-2 text-center text-2xl font-bold">
                {totalStreams}
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Streaming Platforms */}
      <table className="my-10 table-auto md:w-[60%]">
        {Object.keys(data ?? {}).length === 0 ? (
          ""
        ) : (
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="border-gray-400 bg-gray-200 text-gray-800 w-[45%] py-4 text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {data?.apple && (
            <tr className="mb-4 text-lg">
              <td className="flex items-center gap-2 py-4">
                <div
                  style={{ backgroundColor: "black" }}
                  className="h-1 w-6"
                ></div>
                <p>Apple Music</p>
              </td>
              <td className="py-4 text-xl">
                {formatNumber(
                  (data?.apple as { total?: number | undefined })?.total ?? 0,
                )}
              </td>
            </tr>
          )}
          {data?.spotify && (
            <tr className="mb-4 text-lg">
              <td className="flex items-center gap-2 py-4">
                <div
                  style={{ backgroundColor: "green" }}
                  className="h-1 w-6"
                ></div>
                <p>Spotify</p>
              </td>
              <td className="py-4 text-xl">
                {formatNumber(
                  (data?.spotify as { total?: number | undefined })?.total ?? 0,
                )}
              </td>
            </tr>
          )}
          {data?.youtube && (
            <tr className="mb-4 text-lg">
              <td className="flex items-center gap-2 py-4">
                <div
                  style={{ backgroundColor: "red" }}
                  className="h-1 w-6"
                ></div>
                <p>Youtube Music</p>
              </td>
              <td className="py-4 text-xl">
                {formatNumber(
                  (data?.youtube as { total?: number | undefined })?.total ?? 0,
                )}
              </td>
            </tr>
          )}
          {data?.facebook && (
            <tr className="mb-4 text-lg">
              <td className="flex items-center gap-2 py-4">
                <div
                  style={{ backgroundColor: "yellow" }}
                  className="h-1 w-6"
                ></div>
                <p>facebook</p>
              </td>
              <td className="py-4 text-xl">
                {formatNumber(
                  (data?.facebook as { total?: number | undefined })?.total ??
                    0,
                )}
              </td>
            </tr>
          )}
          {data?.tiktok && (
            <tr className="mb-4 text-lg">
              <td className="flex items-center gap-2 py-4">
                <div
                  style={{ backgroundColor: "orange" }}
                  className="h-1 w-6"
                ></div>
                <p>Tiktok</p>
              </td>
              <td className="py-4 text-xl">
                {" "}
                {formatNumber(
                  (data?.tiktok as { total?: number | undefined })?.total ?? 0,
                )}
              </td>
            </tr>
          )}
          {data?.amazon && (
            <tr className="mb-4 text-lg">
              <td className="flex items-center gap-2 py-4">
                <div
                  style={{ backgroundColor: "purple" }}
                  className="h-1 w-6"
                ></div>
                <p>Amazon</p>
              </td>
              <td className="py-4 text-xl">
                {" "}
                {formatNumber(
                  (data?.amazon as { total?: number | undefined })?.total ?? 0,
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default RenderAnalyticsPage;

const headers = ["Store", "Streams"];
