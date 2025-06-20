const pool = require("../../config/config");
 const RentalCarProducts = async (req, res) => {
  try {
    const query = `SELECT 
  RC."RentalCarID",
  P."ProductID",
  P."Description",
  S."ServiceID",
  S."Discription",
  S."ServiceName",
  P."NameProduct",
  P."Price",
  A."AutoMakerName" AS "AutoMaker",
  CT."TypeNameCar" AS "CarType",
  ARRAY_AGG(CS."CarSpecificationName") AS "Specifications",
  ARRAY_AGG("IMAGE"."URL") AS "Images"
FROM public."RENTAL_CAR" RC
JOIN public."PRODUCT" P 
  ON P."ProductID" = RC."ProductID"
JOIN public."SERVICE" S 
  ON S."ServiceID" = P."ServiceID"
JOIN public."AUTOMAKER" A 
  ON A."AutoMakerID" = RC."AutoMakerID"
JOIN public."CARTYPE" CT 
  ON CT."CarTypeID" = RC."CarTypeID"
JOIN public."CARSPECIFICATION_RENTALCAR" CSR 
  ON CSR."RentalCarID" = RC."RentalCarID"
JOIN public."CARSPECIFICATION" CS 
  ON CS."CarSpecificationID" = CSR."SpecificationID"
JOIN public."SERVICE" ON "SERVICE"."ServiceID" = P."ServiceID"
JOIN public."IMAGE_ASSOCIATION" ON "IMAGE_ASSOCIATION"."ImageAssociationID" = S."ImageAssociationID"
JOIN "IMAGE" ON "IMAGE_ASSOCIATION"."ImageAssociationID" = "IMAGE"."ImageAssociationID"
GROUP BY RC."RentalCarID", P."ProductID", S."ServiceID", P."NameProduct", P."Price", A."AutoMakerName", CT."TypeNameCar";
`;
    const result = await pool.query(query);
    console.log(result.rows)
    if (result.rowCount == 0) {
      res.status(404).json({ message: "Không tìm thấy xe nào cả" });
      return;
    }

    res.status(202).json({ RentalCars: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi không thể lấy dữ liệu của xe thuê" });
  }
};
 const getRentalCarByID = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT 
  RC."RentalCarID",
  P."NameProduct",
  P."Price",
  A."AutoMakerName" AS "AutoMaker",
  CT."TypeNameCar" AS "CarType",
  ARRAY_AGG(CS."CarSpecificationName") AS "Specifications"
FROM public."RENTAL_CAR" RC
JOIN public."CARSPECIFICATION_RENTALCAR" CSR 
  ON CSR."RentalCarID" = RC."RentalCarID"
JOIN public."CARSPECIFICATION" CS 
  ON CS."CarSpecificationID" = CSR."SpecificationID"
JOIN public."PRODUCT" P 
  ON P."ProductID" = RC."ProductID"
JOIN public."AUTOMAKER" A 
  ON A."AutoMakerID" = RC."AutoMakerID"
JOIN public."CARTYPE" CT 
  ON CT."CarTypeID" = RC."CarTypeID"
WHERE RC."RentalCarID" = $1
GROUP BY RC."RentalCarID", P."NameProduct", P."Price", A."AutoMakerName", CT."TypeNameCar"
    `;

    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Không tìm thấy xe thuê" });
    }

    res.status(200).json({ RentalCar: result.rows[0] });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu xe thuê" });
  }
};


module.exports = {RentalCarProducts,getRentalCarByID};
