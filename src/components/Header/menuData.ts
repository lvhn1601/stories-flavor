import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Trang chủ",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Giới thiệu",
    newTab: false,
    path: "/introduce",
  },
  {
    id: 3,
    title: "Sản phẩm",
    newTab: false,
    path: "/contact",
  },
  {
    id: 7,
    title: "blogs",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 71,
        title: "Tuỳ hương (hộp tự chọn)",
        newTab: false,
        path: "/blogs/blog-grid-with-sidebar",
      },
      {
        id: 72,
        title: "Tinh tuyển (hộp gợi ý)",
        newTab: false,
        path: "/blogs/blog-grid",
      },
      {
        id: 73,
        title: "Thượng vị (hộp cao cấp)",
        newTab: false,
        path: "/blogs/blog-details-with-sidebar",
      },
      // {
      //   id: 74,
      //   title: "Blog details",
      //   newTab: false,
      //   path: "/blogs/blog-details",
      // },
    ],
  },
];
