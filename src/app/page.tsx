import { HydrateClient } from "@/trpc/server";
import Homepage from "./Homepage";
import exchangeRateAPI from "../libs/exchangeRateAPI";

export default async function Home() {
  const { getExchangeRate } = exchangeRateAPI();
  const nairaToDollarsRateToday = await getExchangeRate();
  return (
    <HydrateClient>
      <Homepage nairaToDollarsRateToday={nairaToDollarsRateToday} />
    </HydrateClient>
  );
}
