export type CartType = {
  id: string;
  product: string;
  productId: string;
  description: string;
  price: number;
  quantity?: number;
  user_id: string;
  status: string;
};

export const fetchCartItems = async (user_id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/${user_id}`,
    {
      next: {
        revalidate: 0,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to User Profile Photo");
  }

  const cartItems = (await response.json()) as CartType[];

  return cartItems;
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
};
