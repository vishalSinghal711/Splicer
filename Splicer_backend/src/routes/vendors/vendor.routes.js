const {
  registerVendor,
  updateVendor,
  getBusinessCount,
} = require('./vendor.controller');
const jwt = require('jsonwebtoken');
// User Route
// Whenever server get user related requests -> this route takes control

// requiring express package installed from npm
const express = require('express');
//every function in js in object and express function has more fields also in its object
//! extracting Router functionality from express
const router = express.Router({});

// Post request made by user to register for vendor with id
//if /register type request will be made this will take control
router.post('/vendor/register/', authenticateToken, registerVendor);

//GET request to get all the business count of particular user
router.get('/vendor/businesses', authenticateToken, getBusinessCount);

//PATCH is a method of modifying resources where the client sends partial data that is to be updated without modifying the entire data.
router.patch('/vendor/profile/update/', authenticateToken, updateVendor);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  //const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not Authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.params.user_id = decoded.id;
    next();
  } catch (er) {
    // console.log("err", er);
    //Incase of expired jwt or invalid token kill the token and clear the cookie
    res.clearCookie('token');
    return res.status(400).send(er.message);
  }
}

module.exports = router;
