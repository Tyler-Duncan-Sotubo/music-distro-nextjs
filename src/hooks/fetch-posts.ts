interface Post {
  id: string;
  title: string;
  HtmlContent: string;
  subtitle: string;
  image: string;
  createdAt: string; // ISO date string format
  updatedAt: string; // ISO date string format
  publishedAt: string; // ISO date string format
}

export const fetchPosts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`,
    {
      next: {
        revalidate: 0,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch revenue");
  }

  const posts = (await response.json()) as Post[];

  return posts;
};

export const fetchPost = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/post/${id}`,
    {
      next: {
        revalidate: 0,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch revenue");
  }

  const post = (await response.json()) as Post;

  return post;
};
