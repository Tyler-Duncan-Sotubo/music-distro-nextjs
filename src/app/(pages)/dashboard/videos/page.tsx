import RenderVideoReleasePage from "./RenderVideoReleasePage";
import { useFetch } from "@/hooks/fetch";

const page = async () => {
  const { fetchUserSubscription } = useFetch();
  const userSubscription = await fetchUserSubscription();
  return <RenderVideoReleasePage userSubscription={userSubscription} />;
};

export default page;
