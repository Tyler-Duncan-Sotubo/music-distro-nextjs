import React from "react";
import { api } from "@/trpc/server";
import RenderArtistPage from "./RenderArtistPage";

const page = async () => {
  const userInfo = await api.user.getUserInfo();
  const userSocialUrls = await api.user.getUserSocial();
  return (
    <div>
      <RenderArtistPage userInfo={userInfo} userSocialUrls={userSocialUrls} />
    </div>
  );
};

export default page;
