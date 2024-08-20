import { HydrateClient } from "@/trpc/server";
import Homepage from "./Homepage";
import exchangeRateAPI from "../libs/exchangeRateAPI";
import { api } from "@/trpc/server";

export default async function Home() {
  const { getExchangeRate } = exchangeRateAPI();
  const nairaToDollarsRateToday = await getExchangeRate();

  const smartLinks = await api.smartLinks.getAllSmartLinks();

  return (
    <HydrateClient>
      <Homepage
        nairaToDollarsRateToday={nairaToDollarsRateToday}
        smartLinks={smartLinks}
      />
    </HydrateClient>
  );
}
