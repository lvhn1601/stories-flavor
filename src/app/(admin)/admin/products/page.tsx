"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ProductModal from "@/components/Admin/Product/ProductModal";
import { useAPI } from "@/hooks/useAPI";
import { Product } from "@/types/product";
import ProductTable from "@/components/Admin/Product/ProductTable";

const ProductManagementPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { API } = useAPI();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await API.get("/admin/products", false, true);
    if (res.success) {
      setProducts(res.data);
    }
  }

  const editProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  }
  
  const handleAddProduct = async (product: Product) => {
    const res = await API.post("/admin/products", product, true, true);
    if (res.success) {
      await loadProducts();
    }
  };

  const handleSaveProduct = async (product: Product) => {
    const res = await API.put("/admin/products", product, true, true);

    if (res.success) {
      await loadProducts();
    }
  }

  return (
    <div className="max-w-[1170px] w-full flex flex-col gap-10 mx-auto px-4 sm:px-8 xl:px-0 mt-36">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý sản phẩm</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-hover transition"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Thêm sản phẩm
        </button>
      </div>

      <ProductTable products={products} onEdit={editProduct} />

      <ProductModal isOpen={modalOpen} product={selectedProduct} onClose={() => {setModalOpen(false); setSelectedProduct(null);}} onAdd={handleAddProduct} onSave={handleSaveProduct} />
    </div>
  );
};

export default ProductManagementPage;
