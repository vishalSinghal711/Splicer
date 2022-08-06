//!Why only Vendor.mongo.js (model) is not enough?
//* It is enough but let us say in future for any other requirements we have to chaange our database then if this abstraction layer was not there then changing of database and communicating methods with new database will affect the implementation of controllers also. so, this layer will manage the crud operations with db and keep communicating with controllers using functions

//!requiring model given by mongoose  made on Schema vendor.mongo.js
//!enables talking to DB
const VendorModel = require('./vendor.mongo');
const UserModel = require('../user/user.mongo');
const responses = require('../../../responses.strings');

const Vendor = function (vendor_id, alt_phn_no, alt_email, timing) {
  (this.vendor_id = vendor_id),
    (this.alt_phn_no = alt_phn_no),
    (this.alt_email = alt_email),
    (this.timing = timing);
};

Vendor.prototype.toVendor = async function (vendor) {
  const totalVendors = await VendorModel.findOne({}).sort('-vendor_id');
  let newVendorNo;
  if (totalVendors) {
    newVendorNo = totalVendors.vendor_id + 1;
  } else {
    newVendorNo = 1;
  }

  return new Vendor(
    newVendorNo,
    vendor['alt_phn_no'],
    vendor['alt_email'],
    vendor['timing'],
  );
};

// Add vendor
const addVendor = async function (user_id, vendor) {
  return new Promise(async function (resolve, reject) {
    try {
      //if user is already a vendor
      let user = await UserModel.findOne({
        _id: user_id,
      });
      if (!user) {
        reject(`${responses.USER_NOT_FOUND}`);
      }
      if (!user.status) {
        reject(`${responses.USER_BLOCKED}`);
      }

      if (user.vendor_id != null) {
        reject('Already a vendor');
      }
      const result = await VendorModel.addVendor(vendor);

      user.vendor_id = result.vendor_id;
      await user.save();
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

// Update a vendor
const updateVendor = async function (vendorObject, user_id) {
  console.log('update vendror', vendorObject, user_id);
  return new Promise(async (resolve, reject) => {
    try {
      let userWithID = await UserModel.findOne({
        _id: user_id,
      });
      if (!userWithID) {
        reject(`${responses.USER_NOT_FOUND}`);
      }
      if (!userWithID.status) {
        reject(`${responses.USER_BLOCKED}`);
      }
      const vendorWithID = await VendorModel.findOne({
        vendor_id: userWithID.vendor_id,
      });

      console.log('qlkdnlkwqneflkwef', vendorWithID);

      //! Shallow Merging of updates and existing object
      const newVendor = {...vendorWithID._doc, ...vendorObject};

      if (userWithID.vendor_id == null) {
        reject(`${responses.USER_MUST_BE_VENDOR_TO_UPDATE_PROFILE}`);
      } else {
        resolve(await VendorModel.updateVendor(newVendor, vendorWithID._id));
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { Vendor, addVendor, updateVendor };
