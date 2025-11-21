import { getGroupByProvince, getProvinceName } from "./provinces";

export const getOrderItemsList = (cartItems) => {
  const suggestItems = cartItems.filter((item => item.category !== 'OPTIONAL'));
  const groupedByProvince = getGroupByProvince(cartItems);

  const listItems = suggestItems.map(item => ({
    name: item.name,
    totalPrice: item.price * item.quantity
  }));
  listItems.push(...Object.keys(groupedByProvince).map(province => {
    const items = groupedByProvince[province];
    const provinceTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return {
      name: `Hộp quà mix ${getProvinceName(province)}`,
      totalPrice: provinceTotal
    };
  }));

  return listItems;
}

export const orderStatus = [
  {
    id: "PENDING",
    title: "Chờ xác nhận",
    style: "text-gray-6 bg-gray-3",
    nextStep: {
      title: "Xác nhận ngay",
      href: "/account/checkout",
      permission: ["user"]
    }
  },
  {
    id: "AUTHORIZED",
    title: "Chưa thanh toán",
    style: "text-yellow bg-yellow-light-4",
    nextStep: {
      title: "Thanh toán ngay",
      href: "/account/payment",
      permission: ["user"]
    }
  },
  {
    id: "PROCESSING",
    title: "Đang xử lý",
    style: "text-blue bg-blue-light-4",
    nextStep: {
      title: "Xác nhận vận chuyển",
      action: "/admin/orders/deliver",
      permission: ["admin"]
    }
  },
  {
    id: "DELIVERING",
    title: "Đang giao hàng",
    style: "text-teal-dark bg-teal",
    nextStep: {
      title: "Xác nhận thành công",
      action: "/order/complete",
      permission: ["admin", "user"]
    }
  },
  {
    id: "COMPLETED",
    title: "Hoàn thành",
    style: "text-green bg-green-light-6",
  },
  {
    id: "CANCELLED",
    title: "Đã huỷ",
    style: "text-red bg-red-light-6",
  }
];

export const getOrderStatusTitle = (status: string) => orderStatus.find(p => p.id === status)?.title;
export const getOrderStatusStyle = (status: string) => orderStatus.find(p => p.id === status)?.style;
export const getOrderStatusNextStep = (status: string, role: "user" | "admin") => orderStatus.find(p => p.id === status && p.nextStep?.permission?.some(e => e === role))?.nextStep;