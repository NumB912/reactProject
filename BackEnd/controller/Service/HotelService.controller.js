const pool = require("../../config/config");
const {CreateService,GetService,GetServices} = require("../Service/Service")

const HotelServices = async (req, res) => {
  try {
    const dataTourServices = await GetServices("ST03");
    if (dataTourServices && dataTourServices.length > 0) {
      return res.status(200).json(dataTourServices);
    } else {
      return res.status(404).json({ message: "Không tìm thấy dữ liệu tour service" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi không thể lấy dữ liệu của tourService" });
  }
};


const HotelService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Thiếu ServiceID" });
    }

    const dataTourService = await GetService(id);

    if (dataTourService) {
      return res.status(200).json(dataTourService);
    } else {
      return res.status(404).json({ message: "Không tìm thấy dữ liệu tour service" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi không thể lấy dữ liệu của tourService" });
  }
};


module.exports = {
  HotelService,
  HotelServices,
};
