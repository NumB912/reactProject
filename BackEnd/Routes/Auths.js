const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const pool = require("../config/config")

const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const KEY = process.env.KEY
const KEY_REFRESH = process.env.KEY_REFRESH
const users = [];

async function findUserByGoogleId(googleId) {
  try {
    const result = await pool.query(`SELECT * FROM public."CLIENT" WHERE "GoogleID"= $1`, [googleId]);

    return result.rows[0];
  } catch (error) {
    console.error('Lỗi truy vấn findUserByGoogleId:', error);
    return null;
  }
}

const { v4: uuidv4 } = require('uuid');

async function createUser({ googleId, email, name }) {
  const result = await pool.query(
    `INSERT INTO public."CLIENT" (
      "ClientID", "FirstName", "LastName", "UserName",
      "Status", "TypeAccountID", "GoogleID"
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7
    ) RETURNING *`,
    [
      uuidv4(),               
      name,                   
      "",                    
      email,                
      "OK",                    
      "TA001",                    
      googleId      
    ]
  );
  return result.rows[0];
}

router.post('/loginGoogle', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (payload.iss !== 'https://accounts.google.com' && payload.iss !== 'accounts.google.com') {
      return res.status(401).json({ message: 'Invalid issuer' });
    }

    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name;

    let user = await findUserByGoogleId(googleId);
    console.log(!user)
    if (!user) {
      user = await createUser({ googleId, email, name });
    }

    const appToken = jwt.sign(
      { userId: user.id, email: user.email },
       KEY,
      { expiresIn: '7d' }
    );

  const refreshToken = jwt.sign(
    { userId: user.id },
    KEY_REFRESH,
    { expiresIn: "7d" }
  );


    res.json({ token: appToken, user,refreshToken });
  } catch (error) {
    console.error('Google login error:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});


module.exports = router;
