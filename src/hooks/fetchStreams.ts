interface StreamData {
  id: string;
  name: string;
  streams: number;
}
export const fetchStreamsByAudioId = async (userId: string | undefined) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-streams/${userId}?timeRange=7days`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch streams by audio ID");
  }

  const streamData = (await response.json()) as Record<
    string,
    { date: string; total: number }[]
  >;

  return streamData;
};

export const fetchByAudioStreams = async (userId: string | undefined) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/streams/audio-streams/${userId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch audio streams");
  }

  const streamData = (await response.json()) as Record<
    string,
    { title: string; totalStreams: number; cover: string }
  >;

  return streamData;
};

export const fetchAllStreamsCountry = async (userId: string | undefined) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/streams/country/${userId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch all streams by country");
  }

  const streamData = (await response.json()) as StreamData[] | undefined;
  return streamData;
};
