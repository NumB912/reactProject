const BASE_URL = "http://localhost:3001/api/services";

export const getDataService = async (idService = "") => {
  try {
    const url = idService ? `${BASE_URL}/${idService}` : `${BASE_URL}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("Lỗi kết nối server");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Lỗi khi fetch dữ liệu dịch vụ:", error);
    return idService ? null : [];
  }
};
