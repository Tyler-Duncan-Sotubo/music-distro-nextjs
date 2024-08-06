import RenderSubscriptionPage from "./RenderSubscriptionPage";
import exchangeRateAPI from "@/libs/exchangeRateAPI";
import { api } from "@/trpc/server";

const page = async () => {
  // fetch exchange rate
  const { getExchangeRate } = exchangeRateAPI();
  const nairaToDollarsRateToday = await getExchangeRate();

  const userSubscription = await api.subscriptions.getSubscription();

  // return
  return (
    <RenderSubscriptionPage
      userSubscription={userSubscription}
      nairaToDollarsRateToday={nairaToDollarsRateToday}
    />
  );
};

export default page;
