"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useAPI } from "@/hooks/useAPI";
import { BlogItem } from "@/types/blogItem";
import BlogList from "@/components/Admin/Blog/BlogList";
import BlogModal from "@/components/Admin/Blog/BlogModal";

const ProductManagementPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);

  const { API } = useAPI();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await API.get("/admin/blogs", false, true);
    if (res.success) {
      setBlogs(res.data);
    }
  };

  const editBlog = (blog: BlogItem) => {
    setSelectedBlog(blog);
    setModalOpen(true);
  };

  const handleAddBlog = async (blog: BlogItem) => {
    const res = await API.post("/admin/blogs", blog, true, true);
    if (res.success) {
      await loadProducts();
    }
  };

  const handleSaveBlog = async (blog: BlogItem) => {
    const res = await API.put("/admin/blogs", blog, true, true);
    if (res.success) {
      await loadProducts();
    }
  };

  return (
    <div className="max-w-[1170px] w-full flex flex-col gap-10 mx-auto px-4 sm:px-8 xl:px-0 mt-36">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý bài viết</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-hover transition"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Bài viết mới
        </button>
      </div>

      {/* ===== Product Table ===== */}
      <BlogList blogs={blogs} onEdit={editBlog} />

      <BlogModal
        isOpen={modalOpen}
        blog={selectedBlog}
        onClose={() => {
          setModalOpen(false);
          setSelectedBlog(null);
        }}
        onAdd={handleAddBlog}
        onSave={handleSaveBlog}
      />
    </div>
  );
};

export default ProductManagementPage;
