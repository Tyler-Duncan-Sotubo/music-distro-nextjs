import { HydrateClient } from "@/trpc/server";
import Homepage from "./Homepage";
import { api } from "@/trpc/server";

export default async function Home() {
  const smartLinks = await api.smartLinks.getAllSmartLinks();

  return (
    <HydrateClient>
      <Homepage smartLinks={smartLinks} />
    </HydrateClient>
  );
}
