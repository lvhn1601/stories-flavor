import { BlogItem } from "@/types/blogItem";
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

interface BlogListProps {
  blogs: BlogItem[];
  onEdit: (blog: BlogItem) => void;
}

const BlogList = ({ blogs, onEdit }: BlogListProps) => {
  const handleDelete = (id?: number) => {
    if (!id) return;
    console.log("Deleting product:", id);
  };

  const columns = useMemo<ColumnDef<BlogItem>[]>(
    () => [
      { header: "#", accessorKey: "id" },
      {
        header: "Bài viết",
        cell: ({ row }) => (
          <div className="flex items-center gap-5">
            <Image
              src={row.original.image}
              alt={row.original.id.toString()}
              width={500}
              height={500}
              className="w-50 h-40 object-cover rounded-md border shadow-md"
            />

            <span className="flex flex-col gap-2">
              <p className="text-dark/50">{row.original.createdAt} | Bởi: {row.original.author?.name}</p>
              <h3 className="font-bold">{row.original.title}</h3>
            </span>
          </div>
        ),
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
    data: blogs,
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
                className="hover:bg-gray transition-colors"
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
        {blogs.length === 0 && (
          <div className="p-6 text-center text-gray-5 text-sm">
            Chưa có bài viết nào.
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

export default BlogList;
