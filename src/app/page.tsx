import { HydrateClient } from "@/trpc/server";
import Homepage from "./Homepage";

export default async function Home() {
  return (
    <HydrateClient>
      <Homepage />
    </HydrateClient>
  );
}
