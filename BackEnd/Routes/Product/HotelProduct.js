const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {RoomProducts,getRoomProductByID} = require("../../controller/Product/RoomProduct.controller")

router.get("/",RoomProducts)
router.get("/Room/:id",getRoomProductByID)
// router.post("")

module.exports=router