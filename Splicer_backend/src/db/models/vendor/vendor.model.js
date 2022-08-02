//!Why only Vendor.mongo.js (model) is not enough?
//* It is enough but let us say in future for any other requirements we have to chaange our database then if this abstraction layer was not there then changing of database and communicating methods with new database will affect the implementation of controllers also. so, this layer will manage the crud operations with db and keep communicating with controllers using functions

//!requiring model given by mongoose  made on Schema vendor.mongo.js
//!enables talking to DB
const VendorModel = require('./vendor.mongo');
const UserModel = require('../user/user.mongo');

const Vendor = function (vendor_id, alt_phn_no, alt_email) {
  (this.vendor_id = vendor_id),
    (this.alt_phn_no = alt_phn_no),
    (this.alt_email = alt_email);
};

Vendor.prototype.toVendor = async function (vendor) {
  const totalVendors = await VendorModel.findOne({}).sort('-vendor_id');
  let newVendorNo;
  if (totalVendors) {
    newVendorNo = totalVendors.vendor_id + 1;
  } else {
    newVendorNo = 1;
  }

  return new Vendor(newVendorNo, vendor['alt_phn_no'], vendor['alt_email']);
};

// Add vendor
const addVendor = function (vendor) {
  return new Promise(async function (resolve, reject) {
    try {
      resolve(await VendorModel.addVendor(vendor));
    } catch (err) {
      reject(err);
    }
  });
};

// Update a vendor
const updateVendor = async function (vendorObject, user_id) {
  const userWithID = await UserModel.findOne({ _id: user_id });

  const vendorWithID = await VendorModel.findOne({
    vendor_id: userWithID.vendor_id,
  });

  //! Shallow Merging of updates and existing object
  const newVendor = { ...vendorObject._doc, ...vendorWithID };

  return new Promise(async (resolve, reject) => {
    try {
      if (userWithID.vendor_id == null) {
        console.log('insideeeeeeeee');
        reject('User must be a Vendor');
      } else {
        resolve(await VendorModel.updateVendor(newVendor, id));
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { Vendor, addVendor, updateVendor };
