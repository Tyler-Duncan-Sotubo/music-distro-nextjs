type smartLinkType = {
  title: string;
  artist: string;
  image: string;
  url: string;
};

export const fetchSmartLinks = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/smartlink`,
    {
      next: {
        revalidate: 0,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch revenue");
  }

  const smartLinks = (await response.json()) as smartLinkType[];

  return smartLinks;
};
