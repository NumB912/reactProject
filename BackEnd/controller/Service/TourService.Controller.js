const pool = require("../../config/config");
const {GetServices,GetService} = require("../Service/Service")

const TourServices = async (req, res) => {
  try {
    const dataTourServices = await GetServices("ST01");
    if (dataTourServices && dataTourServices.length > 0) {
      return res.status(200).json({TourServices:dataTourServices});
    } else {
      return res.status(404).json({ message: "Không tìm thấy dữ liệu tour service" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi không thể lấy dữ liệu của tourService" });
  }
};


const TourService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Thiếu ServiceID" });
    }

    const dataTourService = await GetService(id);

    if (dataTourService.rows[0]) {
      return res.status(200).json(dataTourService.rows[0]);
    } else {
      return res.status(404).json({ message: "Không tìm thấy dữ liệu tour service" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi không thể lấy dữ liệu của tourService" });
  }
};


module.exports = {
  TourService,
  TourServices,
};
