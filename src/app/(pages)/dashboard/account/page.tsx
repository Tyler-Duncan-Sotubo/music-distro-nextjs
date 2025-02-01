import RenderUserAccount from "./RenderUserAccount";
import { type Metadata } from "next";
import { getServerAuthSession } from "@/server/auth";
import { fetchUserInfo } from "@/hooks/user";

export const metadata: Metadata = {
  title: "My Account | We Plug Music - Dashboard",
  description:
    "My account page where I can view my account information and update my account details.",
};

const page = async () => {
  const session = await getServerAuthSession();
  const user = await fetchUserInfo(session!.user.id);
  const { userInfo, userSocialUrls } = user;

  return (
    <RenderUserAccount userInfo={userInfo} userSocialUrls={userSocialUrls} />
  );
};

export default page;
