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