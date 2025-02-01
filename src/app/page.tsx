import { HydrateClient } from "@/trpc/server";
import Homepage from "./Homepage";
import { fetchSmartLinks } from "@/hooks/fetch-smartlinks";

export default async function Home() {
  const smartLinks = await fetchSmartLinks();

  return (
    <HydrateClient>
      <Homepage smartLinks={smartLinks} />
    </HydrateClient>
  );
}
