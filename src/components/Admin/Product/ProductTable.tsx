import { Product } from "@/types/product";
import { getProvinceName } from "@/utils/provinces";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useMemo } from "react";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

const ProductTable = ({ products, onEdit }: ProductTableProps) => {
  const handleDelete = (id?: number) => {
    if (!id) return;
    console.log("Deleting product:", id);
  };

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      { header: "#", accessorKey: "id" },
      {
        header: "Ảnh",
        cell: ({ row }) => {
          const image = row.original.images?.[0];
          return image ? (
            <Image
              src={image}
              alt={row.original.name}
              width={500}
              height={500}
              className="w-30 h-30 object-cover rounded-md border"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-2 rounded-md flex items-center justify-center text-xs text-gray-5">
              No Img
            </div>
          );
        },
      },
      { header: "Tên sản phẩm", accessorKey: "name" },
      {
        header: "Danh mục",
        accessorKey: "category",
        cell: (info) => {
          const category = info.getValue() as Product["category"];
          const label =
            category === "OPTIONAL"
              ? "Tùy chọn"
              : category === "SUGGEST"
                ? "Gợi ý"
                : "Cao cấp";
          return <span className="capitalize">{label}</span>;
        },
      },
      {
        header: "Giá",
        accessorKey: "price",
        cell: (info) => `${info.getValue()} đ`,
      },
      {
        header: "Tỉnh Thành",
        accessorKey: "province",
        cell: (info) => {
          const value = info.getValue() as string;
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium`}
            >
              {getProvinceName(value)}
            </span>
          );
        },
      },
      {
        header: "Hành động",
        cell: ({ row }) => (
          <div className="flex justify-end gap-3">
            <button
              className="text-primary hover:text-primary-hover transition"
              onClick={() => {
                if (onEdit)
                  onEdit(row.original);
              }}
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="text-red hover:text-red-dark  transition"
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
    <>
      {/* ===== Table ===== */}
      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-gray text-gray-7 text-sm uppercase tracking-wide">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="py-3 px-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 px-4 text-sm text-gray-7">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="p-6 text-center text-gray-5 text-sm">
            Không có sản phẩm nào.
          </div>
        )}
      </div>

      {/* ===== Pagination Controls ===== */}
      <div className="flex justify-end items-center gap-4 mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="flex items-center gap-1 px-3 py-2 text-sm bg-gray text-gray-7 rounded-md disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm text-gray-6">
          Trang {table.getState().pagination.pageIndex + 1} /{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="flex items-center gap-1 px-3 py-2 text-sm bg-gray text-gray-7 rounded-md disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};

export default ProductTable;
