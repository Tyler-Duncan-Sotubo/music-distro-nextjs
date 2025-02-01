type User = {
  name: string;
  email: string;
  image: string;
};
import { type Social, type UserInformation } from "@prisma/client";

// Type for the combined user and social details
export type UserWithSocialDetails = {
  userInfo: UserInformation;
  userSocialUrls: Social;
};

export const fetchProfilePhoto = async (user_id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile-photo/${user_id}`,
  );

  if (!response.ok) {
    throw new Error("Failed to User Profile Photo");
  }

  const photo = (await response.json()) as User;

  return photo;
};

export const fetchUserInfo = async (user_id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-info/${user_id}`,
    {
      next: {
        revalidate: 0,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to User Profile Photo");
  }

  const userInfo = (await response.json()) as UserWithSocialDetails;

  return userInfo;
};
