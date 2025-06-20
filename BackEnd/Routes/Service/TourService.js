const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {TourService,TourServices} = require("../../controller/Service/TourService.Controller")

router.get("/",TourServices)
router.get("/Service/:id",TourService)
// router.post("")

module.exports=router