import React from "react";
import PlatformDoughnutChart from "./DoughnutChart";

type PlatformSummary = {
  platform: string;
  totalStreams: number;
  totalDownloads: number;
  totalEarnings: number;
};

interface Props {
  earningsByDSP: PlatformSummary[];
}

const EarningsByDSP = ({ earningsByDSP }: Props) => {
  return (
    <div className="border-b border-gray py-6">
      <h2 className="mb-10">Revenue By DSP</h2>
      <section className="flex flex-col items-start justify-between lg:flex-row lg:gap-20">
        <div className="w-[90%] lg:w-1/3 lg:p-2">
          {earningsByDSP.length > 0 && (
            <table className="mb-12 w-[60%] min-w-full divide-y divide-gray capitalize">
              <thead className="bg-black font-medium uppercase text-white lg:text-lg">
                <tr>
                  <th className="p-4 text-left capitalize">Store</th>
                  <th className="p-4 text-left capitalize">Download</th>
                  <th className="p-4 text-left capitalize">Streams</th>
                  <th className="p-4 text-left capitalize">Earnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray capitalize">
                {earningsByDSP.map(
                  (platform: PlatformSummary, index: number) => (
                    <tr key={index} className="text-xl">
                      <td className="whitespace-nowrap border border-gray px-4 py-4 font-medium">
                        <p>{platform.platform}</p>
                      </td>
                      <td className="whitespace-nowrap border border-gray px-4 py-4 font-medium">
                        <p>{platform.totalDownloads}</p>
                      </td>
                      <td className="whitespace-nowrap border border-gray px-4 py-4 font-medium">
                        <p>{platform.totalStreams}</p>
                      </td>
                      <td className="whitespace-nowrap border border-gray px-4 py-4 font-medium">
                        <p>{platform.totalEarnings}</p>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          )}
        </div>

        {earningsByDSP.length > 0 && (
          <PlatformDoughnutChart platformSummaries={earningsByDSP} />
        )}
      </section>
    </div>
  );
};

export default EarningsByDSP;
