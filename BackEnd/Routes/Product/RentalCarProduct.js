const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {RentalCarProducts,getRentalCarByID} = require("../../controller/Product/RentalCarProduct.controller")

router.get("/",RentalCarProducts)
router.get("/rentalcar/:id",getRentalCarByID)
// router.post("")

module.exports=router