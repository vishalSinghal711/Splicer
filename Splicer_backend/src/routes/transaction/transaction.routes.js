const { subscribePackage, updateStatus } = require('./transaction.controller');
const jwt = require('jsonwebtoken');
// requiring express package installed from npm
const express = require('express');
//every function in js in object and express function has more fields also in its object
//! extracting Router functionality from express
const router = express.Router({});

// Post request made by user to subsrbibe for a package to become vendor
//if /transaction/:user_id type request will be made this will take control
router.post('/transaction/subscribe/', authenticateToken, subscribePackage);

router.post('/transaction/update_status/', authenticateToken, updateStatus);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];


  //const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not Authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.params.user_id = decoded.id;
    console.log('zzzzzzzzzzzzzz', decoded);
    next();
  } catch (er) {
    // console.log("err", er);
    //Incase of expired jwt or invalid token kill the token and clear the cookie
    res.clearCookie('token');
    return res.status(400).send(er.message);
  }
}

module.exports = router;
