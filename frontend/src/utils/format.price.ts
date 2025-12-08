export const formatNumber = (value: number) => {
  if (!value && value !== 0) return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
export const formatPrice = (price: number | string): string => {
  return Number(price).toLocaleString("vi-VN"); 
};