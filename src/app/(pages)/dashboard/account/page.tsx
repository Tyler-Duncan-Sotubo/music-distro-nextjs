import RenderUserAccount from "./RenderUserAccount";
import { type Metadata } from "next";
import { api } from "@/trpc/server";

export const metadata: Metadata = {
  title: "My Account | We Plug Music - Dashboard",
  description:
    "My account page where I can view my account information and update my account details.",
};

const page = async () => {
  const userInfo = await api.user.getUserInfo();
  const userSocialUrls = await api.user.getUserSocial();
  return (
    <RenderUserAccount userInfo={userInfo} userSocialUrls={userSocialUrls} />
  );
};

export default page;
