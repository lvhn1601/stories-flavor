"use client";

import { useAPI } from "@/hooks/useAPI";
import { BlogItem } from "@/types/blogItem";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BlogDetailsPage = () => {
  const [blog, setBlog] = useState<BlogItem>();

  const { id } = useParams();

  const { API } = useAPI();

  useEffect(() => {
    loadBlog();
  }, []);

  const loadBlog = async () => {
    const res = await API.get(`/blog/${id}`, false, true);
    if (res.success) {
      setBlog(res.data);
    }
  };

  if (!blog) return <div className="text-center py-20">Đang tải...</div>;

  return (
    <main>
      <section className="overflow-hidden pt-10">
        <div className="max-w-[750px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="rounded-[10px] overflow-hidden mb-7.5">
            <Image
              className="rounded-[10px] aspect-video object-cover shadow-lg"
              src={blog.image}
              alt="details"
              width={750}
              height={477}
            />
          </div>

          <div>
            <span className="flex items-center gap-3 mb-4">
              {blog.createdAt}
            </span>

            <h2 className="font-medium text-dark text-xl lg:text-2xl xl:text-custom-4xl mb-4">
              {blog.title}
            </h2>

            <div
              className="mt-5 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content || "" }}
            />

            <div className="flex flex-wrap items-center justify-between gap-10 mt-10">
              <div className="flex flex-wrap items-center gap-5">
                <p>Tác giả :</p>

                <div className={`flex items-center gap-2 text-custom-sm font-medium`}>
                  <Image
                    src={blog.author.image ?? "/images/users/user-01.jpg"}
                    alt={blog.author.name ?? "User avatar"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  {blog.author.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogDetailsPage;
