"use client";

import VietnamMap from "@/components/Common/VietnamMap";
import { BlogItem } from "@/types/blogItem";
import { Product } from "@/types/product";
import { uploadImages } from "@/utils/uploadImage";
import dynamic from "next/dynamic";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

import "react-quill-new/dist/quill.snow.css";

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (blog: BlogItem) => Promise<void>;
  onSave?: (blog: BlogItem) => Promise<void>;
  blog?: BlogItem | null;
}

const BlogModal = ({
  isOpen,
  onClose,
  onAdd,
  onSave,
  blog,
}: BlogModalProps) => {
  const [formData, setFormData] = useState<BlogItem>({
    title: "",
    content: "",
    image: "",
  });
  const [error, setError] = useState<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  const clearForm = () => {
    setFormData({
      title: "",
      content: "",
      image: "",
    });

    setPreviewImage("");
    setImageFile(null);
  }

  useEffect(() => {
    if (!isOpen) return;

    if (blog) {
      setFormData({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        image: blog.image,
      });
      setPreviewImage(blog.image);
    } else {
      clearForm();
    }
  }, [blog, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFile = files[0];
    const newPreview = URL.createObjectURL(newFile);

    setImageFile(newFile);
    setPreviewImage(newPreview);
  };

  const handleRemoveImage = () => {
    setPreviewImage("");
    setImageFile(null);
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!checkForm()) {
      return;
    }

    if (blog) {
      if (onSave) {
        let updatedFormData = { ...formData };

        if (imageFile != null) {
          const imageUrls = await uploadImages([imageFile]);
          updatedFormData = {
            ...updatedFormData,
            image: imageUrls[0],
          };
        }

        await onSave(updatedFormData);
      }
    } else {
      if (onAdd) {
        const imageUrls = await uploadImages([imageFile]);
        const newBlog: BlogItem = {
          ...formData,
          image: imageUrls[0],
        };

        await onAdd(newBlog);
      }
    }
    onClose();
  };

  const handleClose = () => {
    // clearForm();
    onClose();
  }

  const checkForm = () => {
    if (!formData.title.trim()) {
      setError("Vui lòng nhập tên bài viết!");
      return false;
    }

    if (!formData.content.trim()) {
      setError("Vui lòng viết nội dung!");
      return false;
    }

    if (!previewImage) {
      setError("Vui lòng thêm ảnh cho bài viết!");
      return false;
    }

    setError(null);
    return true;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-dark/70 flex items-center justify-center z-[999]">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        {/* ===== Close Button ===== */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-4 hover:text-gray-6"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* ===== Title ===== */}
        <h2 className="text-xl font-semibold mb-6">
          {blog ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </h2>

        {/* ===== Form ===== */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-7 mb-1">
              Tiêu đề bài viết
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-3 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-7 mb-1">
              Mô tả sản phẩm
            </label>
            <ReactQuill
              key={blog?.id || "new"}
              theme="snow"
              value={formData.content || ""}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, content: value }))
              }
              className="bg-white rounded-lg border border-gray-3"
              placeholder="Nội dung bài viết..."
            />

          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-7 mb-2">
              Hình ảnh cho bài viết
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-6
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-gray-1 file:text-gray-7
                hover:file:bg-gray-2"
            />

            {/* Preview */}
            {previewImage && (
              <div className="mt-3">
                <div className="relative group border rounded-lg overflow-hidden h-auto">
                  <img
                    src={previewImage}
                    alt={`preview image`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage()}
                    className="absolute top-1 right-1 bg-dark/50 text-white rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-dark">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-lg border border-gray-3 hover:bg-gray-1"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover"
            >
              {blog ? "Lưu thay đổi" : "Thêm sản phẩm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;
