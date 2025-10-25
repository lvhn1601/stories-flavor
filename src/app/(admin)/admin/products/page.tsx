"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import ProductModal from "@/components/Admin/Product/ProductModal";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

const ProductManagementPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: 120, stock: 35, status: "Active" },
    { id: 2, name: "Leather Wallet", category: "Accessories", price: 45, stock: 58, status: "Active" },
    { id: 3, name: "Running Shoes", category: "Footwear", price: 89, stock: 22, status: "Out of Stock" },
    { id: 4, name: "Bluetooth Speaker", category: "Electronics", price: 79, stock: 40, status: "Active" },
    { id: 5, name: "Smart Watch", category: "Electronics", price: 199, stock: 14, status: "Active" },
    { id: 6, name: "Backpack", category: "Accessories", price: 60, stock: 50, status: "Active" },
    { id: 7, name: "Sunglasses", category: "Accessories", price: 25, stock: 70, status: "Out of Stock" },
    { id: 8, name: "Gaming Mouse", category: "Electronics", price: 49, stock: 18, status: "Active" },
  ]);

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      { header: "#", accessorKey: "id" },
      { header: "Name", accessorKey: "name" },
      { header: "Category", accessorKey: "category" },
      { header: "Price", accessorKey: "price", cell: (info) => `$${info.getValue()}` },
      { header: "Stock", accessorKey: "stock" },
      {
        header: "Status",
        accessorKey: "status",
        cell: (info) => {
          const value = info.getValue() as string;
          const active = value === "Active";
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
            >
              {value}
            </span>
          );
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-end gap-3">
            <button className="text-blue-600 hover:text-blue-800 transition">
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="text-red-600 hover:text-red-800 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <div className="max-w-[1170px] w-full flex flex-col gap-10 mx-auto px-4 sm:px-8 xl:px-0 mt-36">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Product Management</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-hover transition"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* ===== Table ===== */}
      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="py-3 px-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 px-4 text-sm text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="p-6 text-center text-gray-500 text-sm">
            No products found.
          </div>
        )}
      </div>

      {/* ===== Pagination Controls ===== */}
      <div className="flex justify-end items-center gap-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>
        <span className="text-sm text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md disabled:opacity-50"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <ProductModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={() => {}} />
    </div>
  );
};

export default ProductManagementPage;
