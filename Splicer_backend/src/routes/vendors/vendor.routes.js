const { registerVendor, updateVendor } = require('./vendor.controller');

// User Route
// Whenever server get user related requests -> this route takes control

// requiring express package installed from npm
const express = require('express');
//every function in js in object and express function has more fields also in its object
//! extracting Router functionality from express
const router = express.Router({});

// Post request made by user to register for vendor with id
//if /register type request will be made this will take control
router.post('/vendor/register/:user_id', registerVendor);

//PATCH is a method of modifying resources where the client sends partial data that is to be updated without modifying the entire data.
router.patch('/vendor/profile/update/:user_id', updateVendor);

module.exports = router;