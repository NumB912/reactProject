const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'app_travel',
    user: 'postgres',
    password: '123',
  });

app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

app.get("/api/services", async (req, res) => {
    const result = await pool.query("SELECT * FROM services");
    res.json(result.rows);
})


app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
})