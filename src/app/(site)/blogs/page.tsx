"use client";

import BlogListItem from "@/components/Blog/BlogListItem";
import { useAPI } from "@/hooks/useAPI";
import { BlogItem } from "@/types/blogItem";
import React, { useEffect, useState } from "react";

const BlogPage = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(4); // blogs per page

  const { API } = useAPI();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    const res = await API.get("/blog", false, true);
    if (res.success) {
      setBlogs(res.data);
    }
  };

  // calculate total pages
  const totalPages = Math.ceil(blogs.length / limit);

  // get blogs for current page
  const paginatedBlogs = blogs.slice((page - 1) * limit, page * limit);

  return (
    <main>
      <section className="overflow-hidden">
        <div className="w-full flex flex-col gap-4 justify-center items-center py-10">
          <h1 className="font-bold text-2xl xl:text-heading-4 text-dark text-center">
            Blog
          </h1>
        </div>

        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col gap-5">
            {paginatedBlogs.map((blog, key) => (
              <BlogListItem blog={blog} key={key} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <div className="bg-white shadow-1 rounded-md p-2">
                <ul className="flex items-center gap-1">
                  {/* Prev */}
                  <li>
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="flex items-center justify-center w-8 h-9 rounded-[3px] disabled:text-gray-4"
                    >
                      ‹
                    </button>
                  </li>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))
                    .map((p) => (
                      <li key={p}>
                        <button
                          onClick={() => setPage(p)}
                          className={`flex py-1.5 px-3.5 rounded-[3px] ${
                            page === p
                              ? "bg-primary text-white"
                              : "hover:bg-primary hover:text-white"
                          }`}
                        >
                          {p}
                        </button>
                      </li>
                    ))}

                  {/* Next */}
                  <li>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="flex items-center justify-center w-8 h-9 rounded-[3px] disabled:text-gray-4"
                    >
                      ›
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
