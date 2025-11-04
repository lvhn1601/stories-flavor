import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogItem } from "@/types/blogItem";

const BlogListItem = ({ blog }: { blog: BlogItem }) => {
  return (
    <Link
      href={`/blogs/${blog.id}`}
      className="flex flex-col md:flex-row xl:flex-row items-center gap-5 border-t border-gray-5 z-1 overflow-hidden px-14 bg-white py-5 group"
    >
      <Image
        src={blog.image}
        alt={blog.id.toString()}
        width={274}
        height={350}
        className="w-full md:w-70 xl:w-70"
      />
      <div className="flex flex-col w-full min-h-[120px]">
        <p className="text-dark/50 text-sm">{blog.createdAt}</p>

        <h2 className="font-bold text-heading-6 text-dark line-clamp-1">
          {blog.title}
        </h2>

        {/* <span className="flex items-center gap-2 font-medium text-lg text-primary">
          {item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ
        </span> */}

        <div
          className="mt-5 prose prose-sm max-w-none text-gray-700 overflow-hidden line-clamp-3"
          dangerouslySetInnerHTML={{ __html: blog.content || "" }}
        />
      </div>
    </Link>
  );
};

export default BlogListItem;
