"use client";

import VietnamMap from "@/components/Common/VietnamMap";
import { Product } from "@/types/product";
import { uploadImages } from "@/utils/uploadImage";
import dynamic from "next/dynamic";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

import "react-quill-new/dist/quill.snow.css";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (product: Product) => Promise<void>;
  onSave?: (product: Product) => Promise<void>;
  product?: Product | null;
}

const ProductModal = ({
  isOpen,
  onClose,
  onAdd,
  onSave,
  product,
}: ProductModalProps) => {
  const [formData, setFormData] = useState<Product>({
    name: "",
    category: "OPTIONAL",
    description: "",
    price: 0,
    province: "",
    images: [],
  });
  const [error, setError] = useState<string | null>(null);

  const [imageFiles, setImageFiles] = useState([] as File[]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const clearForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "OPTIONAL",
      price: 0,
      province: "",
      images: [],
    });

    setPreviewImages([]);
    setImageFiles([]);
  }

  useEffect(() => {
    if (!isOpen) return;

    if (product) {
      setFormData({
        id: product.id,
        name: product.name.trim(),
        description: product.description || "",
        category: product.category,
        price: product.price,
        province: product.province || "",
        images: product.images || [],
      });
      setPreviewImages(product.images || []);
    } else {
      clearForm();
    }
  }, [product, isOpen]);

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

    const newFiles = Array.from(files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setImageFiles((prev) => [...prev, ...newFiles]);
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!checkForm()) {
      return;
    }

    if (product) {
      if (onSave) {
        let updatedFormData = { ...formData };

        if (imageFiles.length > 0) {
          const imageUrls = await uploadImages(imageFiles);
          updatedFormData = {
            ...updatedFormData,
            images: [...updatedFormData.images, ...imageUrls],
          };
        }

        await onSave(updatedFormData);
      }
    } else {
      if (onAdd) {
        const imageUrls = await uploadImages(imageFiles);
        const newProduct: Product = {
          ...formData,
          images: imageUrls,
        };

        await onAdd(newProduct);
      }
    }
    onClose();
  };

  const handleClose = () => {
    // clearForm();
    onClose();
  }

  const checkForm = () => {
    if (!formData.name.trim()) {
      setError("Vui lòng nhập tên sản phẩm!");
      return false;
    }

    if (formData.price <= 0) {
      setError("Vui lòng nhập giá sản phẩm!");
      return false;
    }

    if (!formData.province) {
      setError("Vui lòng chọn tỉnh thành của sản phẩm!");
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
          {product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </h2>

        {/* ===== Form ===== */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-7 mb-1">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-3 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-7 mb-1">
              Danh mục
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  province: e.target.value === "OPTIONAL" ? "" : "bac"
                });
                handleChange(e);
              }}
              className="w-full border border-gray-3 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="OPTIONAL">Tùy Hương</option>
              <option value="SUGGEST">Tinh Tuyển</option>
              <option value="HIGHEND">Thượng Vị</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-7 mb-1">
              Mô tả sản phẩm
            </label>
            <ReactQuill
              key={product?.id || "new"}
              theme="snow"
              value={formData.description || ""}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
              className="bg-white rounded-lg border border-gray-3"
              placeholder="Nhập mô tả chi tiết sản phẩm..."
            />

          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-7 mb-1">
              Giá (VNĐ)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min={0}
              required
              className="w-full border border-gray-3 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-7 mb-1">
              Tỉnh thành
            </label>
            {formData.category === "OPTIONAL" ? (
              <VietnamMap
                value={formData.province}
                onProvinceClick={(pid) => setFormData({ ...formData, province: pid })}
              />
            ) : (
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full border border-gray-3 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="bac">Miền Bắc</option>
                <option value="trung">Miền Trung</option>
                <option value="nam">Miền Nam</option>
              </select>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-7 mb-2">
              Hình ảnh sản phẩm
            </label>

            <input
              type="file"
              multiple
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
            {previewImages.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {previewImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative group border rounded-lg overflow-hidden h-60"
                  >
                    <img
                      src={img}
                      alt={`Product ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-dark/50 text-white rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
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
              {product ? "Lưu thay đổi" : "Thêm sản phẩm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
