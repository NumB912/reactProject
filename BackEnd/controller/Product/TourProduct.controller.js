const pool = require("../../config/config");
 const GetTourProducts = async (req, res) => {
  try {
    const query = `SELECT 
    "TOUR"."TourID",
    "TOUR"."LocationID",
    "TOUR"."DurationID",
    "DURATION"."Value",
    "TOUR"."TypeTourID",
    "TYPETOUR"."TypeTour",
    array_agg("TIME"."Time" ORDER BY "TIME"."TimeID") AS TimeSlots
FROM "TOUR"
JOIN "DURATION" ON "DURATION"."DurationID" = "TOUR"."DurationID"
JOIN "TYPETOUR" ON "TYPETOUR"."TypeTourID" = "TOUR"."TypeTourID"
JOIN "TIME_TOUR" ON "TIME_TOUR"."TourID" = "TOUR"."TourID"
JOIN "TIME" ON "TIME"."TimeID" = "TIME_TOUR"."TimeID"
GROUP BY 
    "TOUR"."TourID",
    "TOUR"."LocationID",
    "TOUR"."DurationID",
    "DURATION"."DurationID",
    "TOUR"."TypeTourID",
    "TYPETOUR"."TypeTour";
`;
    const result = await pool.query(query);
    if (result.rowCount == 0) {
      res.status(404).json({ message: "Không tìm thấy Tour nào cả" });
      return;
    }

    res.status(202).json({ TourProducts: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi không thể lấy dữ liệu của xe thuê" });
  }
};
 const getTourProductsByID = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT 
    "TOUR"."TourID",
    "TOUR"."LocationID",
    "TOUR"."DurationID",
    "DURATION"."Value",
    "TOUR"."TypeTourID",
    "TYPETOUR"."TypeTour",
    array_agg("TIME"."Time" ORDER BY "TIME"."TimeID") AS TimeSlots
FROM "TOUR"
JOIN "DURATION" ON "DURATION"."DurationID" = "TOUR"."DurationID"
JOIN "TYPETOUR" ON "TYPETOUR"."TypeTourID" = "TOUR"."TypeTourID"
JOIN "TIME_TOUR" ON "TIME_TOUR"."TourID" = "TOUR"."TourID"
JOIN "TIME" ON "TIME"."TimeID" = "TIME_TOUR"."TimeID"
WHERE "TOUR"."TourID" = '$1'
GROUP BY 
    "TOUR"."TourID",
    "TOUR"."LocationID",
    "TOUR"."DurationID",
    "DURATION"."DurationID",
    "TOUR"."TypeTourID",
    "TYPETOUR"."TypeTour"
    `;

    const result = await pool.query(query, [id]);
    console.log(result)
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Không tìm thấy Tour thuê" });
    }

    res.status(200).json({ TourProduct: result.rows[0] });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu Tour thuê" });
  }
};


module.exports = {getTourProductsByID,GetTourProducts};
