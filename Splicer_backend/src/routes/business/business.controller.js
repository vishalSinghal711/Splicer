//! The path module provides utilities for working with file and directory paths.
const path = require('path');
const responses = require('../../responses.strings');

// reequiring model methods which talks to DB for User Operations
const {
  Business,
  addBusiness,
  updateBusiness,
} = require('../../db/models/Business/business.model');

const vendorControllerMethods = {
  //*Register Functionality
  registerBusiness: async function (request, response) {
    //extracting which user has to update
    if (!Number(request.params.user_id)) {
      response
        .status(400)
        .json({ message: `${responses.PARAMETER_NOT_NUMBER}` });
      return;
    }

    // extracting request body where user details are posted
    //automatically converts json to obj using middleware json
    let businessObj = request.body;
    //converted that js object to user object
    const reqBusiness = await Business.prototype.toBusiness(businessObj);

    //call addVendor
    try {
      console.log('user_id', request.params.user_id);
      const result = await addBusiness(reqBusiness, request.params.user_id);
      if (result) {
        response.status(200).json({ message: result });
      }
    } catch (err) {
      response.status(400).json({ message: err });
    }
  },

  //*Update Functionality
  updateBusiness: async function (request, response) {
    console.log(
      request.params.user_id,
      request.params.business_id,
      request.body,
    );
    //extracting which user has to update
    if (!Number(request.params.user_id)) {
      response
        .status(400)
        .json({ message: `${responses.PARAMETER_NOT_NUMBER}` });
      return;
    }
    if (!Number(request.params.business_id)) {
      response
        .status(400)
        .json({ message: `${responses.PARAMETER_NOT_NUMBER}` });
      return;
    }

    // extracting request body where user details are posted
    //automatically converts json to obj using middleware json
    let businessObj = request.body;

    const promiseSlip = updateBusiness(
      businessObj,
      request.params.user_id,
      request.params.business_id,
    );

    promiseSlip
      .then((value) => {
        response.status(200).json({ message: value });
      })
      .catch((err) => {
        response.status(400).json({ message: err });
      });
  },
};

module.exports = vendorControllerMethods;
