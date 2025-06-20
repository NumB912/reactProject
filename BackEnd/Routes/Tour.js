const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../config/config")



router.get("/getTours",async (req,res)=>{
    
    const dataTours = await pool.query("") 

})

module.exports = router;
