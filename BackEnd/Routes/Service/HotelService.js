const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {HotelServices,HotelService} = require("../../controller/Service/HotelService.controller")

router.get("/",HotelServices)
router.get("/Service/:id",HotelService)
// router.post("")

module.exports=router