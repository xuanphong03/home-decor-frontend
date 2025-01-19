export const provinceService = {
  async getAll() {
    try {
      const response = await fetch(
        "https://provinces.open-api.vn/api/?depth=2"
      );
      if (!response.ok)
        throw new Error("Không thể tải danh sách tỉnh/thành phố");
      return response.json();
    } catch (error) {
      return false;
    }
  },
};
