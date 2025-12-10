
import app from "./app";
import "dotenv/config";                                 
import path from "path";
import express from "express";
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.use("/upload", express.static(path.join(process.cwd(), "public", "upload")));
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}