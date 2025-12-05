// src/server.ts
import express from "express";
import type { Request, Response } from "express";
import routeUser from "@/route/user.route";
import routeAuthentication from "@/route/authentication.route";
import routeService from "@/route/service.route";
import routerManagementService from "@/route/managementService.route";
import routerManagementServiceItem from "@/route/managementServiceItem.route";
import routerAmin from "./route/admin/admin.route";
import routerLocation from "@/route/location.route";
import routerAmenitiesService from "@/route/amenity_service.route";
import routerHotelType from "@/route/hotel_type.route";
import path from "path";
// Chỉ import 1 lần là đủ
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://yourdomain.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/upload", express.static(path.join("public", "upload")));
app.use("/api/user", routeUser);
app.use("/api/authentication", routeAuthentication);
app.use("/api/service", routeService);
app.use("/api/service-management", routerManagementService);
app.use("/api/service-item-management", routerManagementServiceItem);
app.use("/api/admin", routerAmin);
app.use("/api/location", routerLocation);
app.use("/api/amenity-service", routerAmenitiesService);
app.use("/api/hotel-type", routerHotelType);
app.get("/api/test-cookie", (req, res) => {
  res.json({ cookies: req.cookies });
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
  console.log(`Frontend: http://localhost:5174`);
});
