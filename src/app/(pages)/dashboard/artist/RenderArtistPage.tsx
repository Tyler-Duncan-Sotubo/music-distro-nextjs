"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import {
  SocialLinkCard,
  SocialCardContainer,
} from "./_components/SocialLinkCard";
import {
  ArtistDetailsCard,
  ArtistDetailsCardContainer,
} from "./_components/ArtistDetailsCard";
import Link from "next/link";
import ProfilePhoto from "@/components/common/ProfilePhoto";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/hooks/user";
import { Spinner } from "@/components/common/Spinner";

const RenderArtistPage = () => {
  const { data: session } = useSession();
  const loggedInUser = session?.user;

  const { data: user, isLoading } = useQuery({
    queryKey: ["UserInfo", loggedInUser?.id],
    queryFn: () => fetchUserInfo(loggedInUser!.id),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <div>Error loading user information</div>;
  }

  const { userInfo, userSocialUrls } = user;

  return (
    <>
      <h1 className="mt-20 px-20 text-center lg:mt-28 lg:text-justify">
        Artist
      </h1>
      <section className="mb-20 mt-8 px-3 py-8 lg:px-10">
        {/* artist Image */}
        <section className="mb-6 flex flex-col gap-20 lg:flex-row">
          {/* artist Image */}
          <ProfilePhoto />

          {/* ------>  artist details  ------>  */}
          <section className="lg:w-3/4">
            {/* artist name */}
            <h2 className="mb-6 text-2xl font-bold">{loggedInUser?.name}</h2>
            <ArtistDetailsCard title="Location">
              {userInfo?.country}
            </ArtistDetailsCard>
            <ArtistDetailsCardContainer>
              <ArtistDetailsCard title="Artist Name" width="w-full">
                {userInfo?.artistName}
              </ArtistDetailsCard>
              <ArtistDetailsCard title="Label" width="w-full">
                {userInfo?.label}
              </ArtistDetailsCard>
              <ArtistDetailsCard title="Phone Number" width="w-full">
                {userInfo?.phone}
              </ArtistDetailsCard>
            </ArtistDetailsCardContainer>
            <ArtistDetailsCard title="Bio">
              {userInfo?.artistBio}
            </ArtistDetailsCard>

            {/* ------> artist socials ------>  */}
            <section className="mt-10 border-t border-gray">
              {/* Spotify and Apple Music */}
              <SocialCardContainer>
                <SocialLinkCard
                  platform="spotify"
                  url={userSocialUrls?.spotify}
                  description="Spotify Artist Link"
                />
                <SocialLinkCard
                  platform="apple"
                  url={userSocialUrls?.apple}
                  description="Apple Music Artist Link"
                />
              </SocialCardContainer>
              {/* Instagram and Twitter */}
              <SocialCardContainer>
                <SocialLinkCard
                  platform="instagram"
                  url={userSocialUrls?.instagram}
                  description="Instagram Profile Link"
                />
                <SocialLinkCard
                  platform="youtube"
                  url={userSocialUrls?.youtube}
                  description="YouTube Channel Link"
                />
              </SocialCardContainer>

              {/* Facebook and TikTok */}
              <SocialCardContainer>
                <SocialLinkCard
                  platform="facebook"
                  url={userSocialUrls?.facebook}
                  description="Facebook Profile Link"
                />
                <SocialLinkCard
                  platform="tiktok"
                  url={userSocialUrls?.tiktok}
                  description="TikTok Profile Link"
                />
              </SocialCardContainer>

              {/* Soundcloud and Calendar */}
              <SocialCardContainer>
                <SocialLinkCard
                  platform="soundcloud"
                  url={userSocialUrls?.soundcloud}
                  description="Soundcloud Profile Link"
                />
                <SocialLinkCard
                  platform="twitter"
                  url={userSocialUrls?.twitter}
                  description="Twitter Profile Link"
                />
              </SocialCardContainer>
              <SocialCardContainer>
                <SocialLinkCard
                  platform="website"
                  url={userSocialUrls?.website}
                  description="Website Link"
                />
              </SocialCardContainer>
            </section>
          </section>
        </section>
        <section className="border-t border-gray py-4">
          <Link href="/dashboard/account">
            <Button>Edit Artist</Button>
          </Link>
        </section>
      </section>
    </>
  );
};

export default RenderArtistPage;
