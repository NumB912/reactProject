const pool = require("../../config/config");
const RoomProducts = async (req, res) => {
  try {
    const query = `SELECT 
    H."HotelID",
    R."RoomID",
    R."Area",
    R."IsVailability",
    R."Quantity",
    R."MaxGuest",
    T."TypeNameRoom",
    P."NameProduct",
    P."Price",
    ARRAY_AGG(DISTINCT A."AmenityName") AS "Amenities"
FROM "HOTEL" H
JOIN "ROOM" R ON R."HotelID" = H."HotelID"
JOIN "AMENITY_HOTEL" AH ON AH."HotelID" = H."HotelID"
JOIN "AMENITY" A ON A."AmenityID" = AH."AmenityID"
JOIN "PRODUCT" P ON P."ProductID" = R."RoomID"
JOIN "TYPE_ROOM" T ON T."TypeRoomID" = R."TypeRoomID"
GROUP BY 
    H."HotelID",
    R."RoomID",
    R."Area",
    R."IsVailability",
    R."Quantity",
    R."MaxGuest",
    T."TypeNameRoom",
    P."NameProduct",
    P."Price";

`;
    const result = await pool.query(query);
    if (result.rowCount == 0) {
      res.status(404).json({ message: "Không tìm thấy xe nào cả" });
      return;
    }

    res.status(202).json({ HotelProducts: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi không thể lấy dữ liệu của xe thuê" });
  }
};
const getRoomProductByID = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
SELECT 
    H."HotelID",
    R."RoomID",
    R."Area",
    R."IsVailability",
    R."Quantity",
    R."MaxGuest",
    T."TypeNameRoom",
    P."NameProduct",
    P."Price",
    ARRAY_AGG(DISTINCT A."AmenityName") AS "Amenities"
FROM "HOTEL" H
JOIN "ROOM" R ON R."HotelID" = H."HotelID"
JOIN "AMENITY_HOTEL" AH ON AH."HotelID" = H."HotelID"
JOIN "AMENITY" A ON A."AmenityID" = AH."AmenityID"
JOIN "PRODUCT" P ON P."ProductID" = R."RoomID"
JOIN "TYPE_ROOM" T ON T."TypeRoomID" = R."TypeRoomID"
WHERE R."RoomID"=$1
GROUP BY 
    H."HotelID",
    R."RoomID",
    R."Area",
    R."IsVailability",
    R."Quantity",
    R."MaxGuest",
    T."TypeNameRoom",
    P."NameProduct",
    P."Price";

    `;

    const result = await pool.query(query, [id]);
    console.log(result);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Không tìm thấy xe thuê" });
    }

    res.status(200).json({ HotelProduct: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu xe thuê" });
  }
};

module.exports = { RoomProducts, getRoomProductByID };
