const { subscribePackage , updateStatus } = require('./transaction.controller');

// requiring express package installed from npm
const express = require('express');
//every function in js in object and express function has more fields also in its object
//! extracting Router functionality from express
const router = express.Router({});

// Post request made by user to subsrbibe for a package to become vendor
//if /transaction/:user_id type request will be made this will take control
router.post('/transaction/subscribe/:user_id', subscribePackage);

router.post('/transaction/update_status/:user_id', updateStatus);

module.exports = router;
