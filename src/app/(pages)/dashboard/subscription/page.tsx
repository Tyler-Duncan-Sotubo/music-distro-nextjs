import RenderSubscriptionPage from "./RenderSubscriptionPage";
import { api } from "@/trpc/server";

const page = async () => {
  const userSubscription = await api.subscriptions.getSubscription();

  // return
  return <RenderSubscriptionPage userSubscription={userSubscription} />;
};

export default page;
