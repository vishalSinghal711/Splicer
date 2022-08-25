//! The path module provides utilities for working with file and directory paths.
const path = require('path');

// reequiring model methods which talks to DB for User Operations
const {
  Vendor,
  addVendor,
  updateVendor,
  getBusinesses,
} = require('../../db/models/vendor/vendor.model');
const responses = require('../../responses.strings');

const vendorControllerMethods = {
  //*Register Functionality
  registerVendor: async function (request, response) {
    //extracting which user has to update
    if (!Number(request.params.user_id)) {
      response
        .status(400)
        .json({ message: `${responses.PARAMETER_NOT_NUMBER}` });
      return;
    }

    // extracting request body where user details are posted
    //automatically converts json to obj using middleware json
    let vendorObj = request.body;

    //converted that js object to user object
    const reqVendor = await Vendor.prototype.toVendor(vendorObj);

    //call addVendor
    try {
      const result = await addVendor(request.params.user_id, reqVendor);
      if (result) {
        response.status(200).json({ message: result });
      }
    } catch (err) {
      response.status(400).json({ message: err });
    }
  },

  //*Update Functionality
  updateVendor: async function (request, response) {
    //extracting which user has to update
    if (!Number(request.params.user_id)) {
      response
        .status(400)
        .json({ message: `${responses.PARAMETER_NOT_NUMBER}` });
      return;
    }

    // extracting request body where user details are posted
    //automatically converts json to obj using middleware json
    let vendorObj = request.body;

    const promiseSlip = updateVendor(vendorObj, request.params.user_id);

    promiseSlip
      .then((value) => {
        response.status(200).json({ message: value });
      })
      .catch((err) => {
        response.status(400).json({ message: err });
      });
  },

  getBusinessCount: async function (req, res) {
    var userId = req.params.user_id;
    if (!Number(userId)) {
      res.status(400).json({ message: `${responses.PARAMETER_NOT_NUMBER}` });
      return;
    } else {
      const promiseSlip = getBusinesses(userId);
      promiseSlip
        .then((count) => {
          res.status(200).json({ message: count });
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        });
    }
  },
};

module.exports = vendorControllerMethods;
