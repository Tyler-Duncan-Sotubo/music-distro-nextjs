/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);

export const StreamsGraph = ({ data }: any) => {
  let spotifyData = [];
  if (data?.spotify) {
    spotifyData = Object.keys(data?.spotify)
      .filter((day) => day !== "total")
      .map((day) => data.spotify[day]);
  }

  let appleData = [];
  if (data?.apple) {
    appleData = Object.keys(data?.apple)
      .filter((day) => day !== "total")
      .map((day) => data.apple[day]);
  }

  let amazonData = [];
  if (data?.amazon) {
    amazonData = Object.keys(data?.amazon)
      .filter((day) => day !== "total")
      .map((day) => data?.amazon[day]);
  }

  let youtubeData = [];
  if (data?.youtube) {
    youtubeData = Object.keys(data?.youtube)
      .filter((day) => day !== "total")
      .map((day) => data.youtube[day]);
  }

  let tiktokData = [];
  if (data?.tiktok) {
    tiktokData = Object.keys(data?.tiktok)
      .filter((day) => day !== "total")
      .map((day) => data.tiktok[day]);
  }

  let facebookData = [];
  if (data?.facebook) {
    facebookData = Object.keys(data?.facebook)
      .filter((day) => day !== "total")
      .map((day) => data.facebook[day]);
  }

  const EarningsData = {
    // Months
    labels: ["Sat", "Sun", "Mon", "Tues", "Wed", "Thur", "Fri"],
    datasets: [
      {
        label: "Spotify",
        data: spotifyData,
        backgroundColor: "green",
        borderColor: "green",
        tension: 0.3,
        borderWidth: 3,
      },
      {
        label: "Apple Music",
        data: appleData,
        backgroundColor: "black",
        borderColor: "black",
        tension: 0.3,
        borderWidth: 3,
      },
      {
        label: "Youtube",
        data: youtubeData,
        backgroundColor: "red",
        borderColor: "red",
        tension: 0.3,
        borderWidth: 3,
      },
      {
        label: "TikTok",
        data: tiktokData,
        backgroundColor: "orange",
        borderColor: "orange",
        tension: 0.3,
        borderWidth: 3,
      },
      {
        label: "Amazon",
        data: amazonData,
        backgroundColor: "purple",
        borderColor: "purple",
        tension: 0.3,
        borderWidth: 3,
      },
      {
        label: "Facebook",
        data: facebookData,
        backgroundColor: "yellow",
        borderColor: "yellow",
        tension: 0.3,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <>
      <Line options={options} data={EarningsData} />
    </>
  );
};
