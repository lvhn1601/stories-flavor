"use client";

import { useEffect, useState } from "react";
import { useAPI } from "@/hooks/useAPI";
import OrderTable from "@/components/Admin/Order/OrderTable";
import OrderModal from "@/components/Orders/OrderModal";

const OrderManagementPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const { API } = useAPI();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const res = await API.get("/admin/orders", false, true);
    if (res.success) {
      setOrders(res.data);
    }
  };

  const toggleModal = (status: boolean) => {
    setShowDetails(status);
  };

  // const editProduct = (product) => {
  //   setSelectedProduct(product);
  //   setModalOpen(true);
  // };

  // const handleAddProduct = async (product) => {
  //   const res = await API.post("/admin/products", product, true, true);
  //   if (res.success) {
  //     await loadProducts();
  //   }
  // };

  // const handleSaveProduct = async (product) => {
  //   const res = await API.put("/admin/products", product, true, true);
  //   if (res.success) {
  //     await loadProducts();
  //   }
  // };

  return (
    <div className="max-w-[1170px] w-full flex flex-col gap-10 mx-auto px-4 sm:px-8 xl:px-0 mt-36">
      {/* ===== Header ===== */}
      <h1 className="text-2xl font-semibold">Quản lý đơn hàng</h1>

      {/* ===== Product Table ===== */}
      <OrderTable orders={orders} onEdit={(order) => { }} onDetail={(order) => {
        setSelectedOrder(order);
        toggleModal(true);
      }} />

      <OrderModal
        showDetails={showDetails}
        showEdit={false}
        toggleModal={toggleModal}
        order={selectedOrder}
        role={"admin"}
      />
    </div>
  );
};

export default OrderManagementPage;
