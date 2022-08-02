//! The path module provides utilities for working with file and directory paths.
const path = require('path');

// reequiring model methods which talks to DB for User Operations
const {
  Business,
  addBusiness,
  updateBusiness,
} = require('../../db/models/Business/business.model');
const UserModel = require('../../db/models/user/user.mongo');
const VendorModel = require('../../db/models/vendor/vendor.mongo');

const vendorControllerMethods = {
  //*Register Functionality
  registerBusiness: async function (request, response) {
    if (!request.params.user_id) {
      response
        .status(400)
        .json({ message: 'must have user_id to register a business' });
      return;
    }
    //extracting which user has to update
    if (!Number(request.params.user_id)) {
      response.status(400).json({ message: 'Parameter must be a Number..' });
      return;
    }

    //if user is already a vendor
    let user = await UserModel.findOne({ _id: request.params.user_id });

    if (!user) {
      response.status(400).json({ message: 'No User Exist' });
      return;
    } else {
      if (user.vendor_id == null) {
        response
          .status(400)
          .json({ message: 'Must be Vendor Before adding business' });
        return;
      } else {
        let vendor = await VendorModel.findOne({ _id: user.vendor_id });
        if (vendor) {
          if (vendor.business_id) {
            response.status(400).json({ message: 'Already have a Business' });
            return;
          } else {
            // extracting request body where user details are posted
            //automatically converts json to obj using middleware json
            let businessObj = request.body;

            //converted that js object to user object
            const reqBusiness = await Business.prototype.toBusiness(
              businessObj,
            );

            //call addVendor
            try {
              const result = await addBusiness(reqBusiness);
              if (result) {
                //find user with user_id in params
                //update vendor_id in it

                vendor.business_id = result.business_id;
                await vendor.save();
                response.status(200).json({ message: result });
              }
            } catch (err) {
              response.status(400).json({ message: err.message });
            }
          }
        }
      }
    }
  },

  //*Update Functionality
  updateBusiness: async function (request, response) {
    if (!request.params.user_id) {
      response
        .status(400)
        .json({ message: 'must have user_id to register for a vendor' });
      return;
    }
    //extracting which user has to update
    if (!Number(request.params.user_id)) {
      response.status(400).json({ message: 'Parameter must be a Number..' });
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
};

module.exports = vendorControllerMethods;
