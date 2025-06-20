const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {RentalCarService,RentalCarServices} = require("../../controller/Service/RentalCarService.controller")

router.get("/",RentalCarServices)
router.get("/Service/:id",RentalCarService)
// router.post("")

module.exports=router