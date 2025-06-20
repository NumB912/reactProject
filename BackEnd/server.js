require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.json());
app.use(cors());

// Các route
const userRoute = require("./Routes/user");
const authsRoute = require("./Routes/Auths");
const tourServiceRoute = require("./Routes/Service/TourService")
const RentalCarService = require("./Routes/Service/RentalCarService")
const RentalCarProduct = require("./Routes/Product/RentalCarProduct")
const HotelProduct = require("./Routes/Product/HotelProduct")
const TourProduct = require("./Routes/Product/TourProduct")

app.use("/api/users", userRoute);
app.use("/api/auths", authsRoute);
app.use("/api/tourServices",tourServiceRoute)
app.use("/api/RentalCarServices",RentalCarService)
app.use("/api/HotelServices",RentalCarService)
app.use("/api/rentalCarProduct",RentalCarProduct)
app.use("/api/HotelProduct",HotelProduct)
app.use("/api/TourProduct",TourProduct)
// app.use("/api/")

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
