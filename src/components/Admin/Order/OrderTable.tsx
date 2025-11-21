"use client";
import { getOrderStatusStyle, getOrderStatusTitle } from "@/utils/order";
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

interface OrderTableProps {
  orders: any[];
  onDetail: (order: any) => void;
  onEdit: (order: any) => void;
}

const OrderTable = ({ orders, onEdit, onDetail }: OrderTableProps) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "Mã đơn",
        cell: ({ row }) => (
          <p className="text-custom-sm text-red">
            #{row.original.id.toString().padStart(6, "0")}
          </p>
        )
      },
      { header: "Ngày tạo", accessorKey: "createdAt" },
      {
        header: "Khách hàng",
        cell: ({ row }) => (
          <div className="flex gap-2 items-center">
            <Image
              src={row.original.user.image || "/images/default-avatar.jpg"}
              alt={row.original.user.id}
              width={36}
              height={36}
              className="rounded-full aspect-square w-full max-w-[36px] object-cover"
            />
            <p className="text-dark">{row.original.user.name}</p>
          </div>
        ),
      },
      {
        header: "Trạng thái",
        cell: ({ row }) => (
          <span className={`inline-block text-custom-sm  py-0.5 px-2.5 rounded-[30px] capitalize ${getOrderStatusStyle(row.original.status)}`}>
            {getOrderStatusTitle(row.original.status)}
          </span>
        ),
      },
      {
        header: "Giá",
        accessorKey: "total",
        cell: (info) => `${info.getValue().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ`,
      },
    ],
    []
  );

  const table = useReactTable({
    data: orders,
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
                className="border-t cursor-pointer hover:bg-gray transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("click: ", row.original)
                  onDetail(row.original);
                }}
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
        {orders.length === 0 && (
          <div className="p-6 text-center text-gray-5 text-sm">
            Chưa có đơn hàng nào.
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

export default OrderTable;
