"use client";

import { FaArrowLeft } from "react-icons/fa";
import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import parse from "html-react-parser";
import RenderBanner from "./RenderBanner";
import Link from "next/link";
import { api } from "@/trpc/react";
import { Spinner } from "@/components/common/Spinner";

const SinglePost = () => {
  const { id } = useParams();
  const getPost = api.post.getPost.useQuery({ postId: id as string });
  const post = getPost.data;

  if (getPost.isLoading) return <Spinner />;

  return (
    <>
      <section className="mx-auto my-10 w-[90%] md:my-32 md:w-[85%]">
        <div className="my-10">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-primaryHover"
          >
            <FaArrowLeft />
            All Post
          </Link>
        </div>
        {post ? (
          <section className="gap-10 md:flex">
            <article className="md:w-[75%]">
              <div className="relative h-[500px] w-full">
                <Image
                  src={post.image}
                  alt="blog image"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">
                {post.title}
              </h2>
              <p className="mt-4 text-primaryHover">
                {post.publishedAt.toLocaleString()}
              </p>
              <p className="mt-4 text-2xl italic">{post.subtitle}</p>
              <div className="blog mt-8">{parse(post.HtmlContent)}</div>
            </article>
            <aside className="md:w-[30%]">
              <RenderBanner />
            </aside>
          </section>
        ) : null}
      </section>
    </>
  );
};

export default SinglePost;
