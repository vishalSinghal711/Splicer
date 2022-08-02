//!Why only Business.mongo.js (model) is not enough?
//* It is enough but let us say in future for any other requirements we have to chaange our database then if this abstraction layer was not there then changing of database and communicating methods with new database will affect the implementation of controllers also. so, this layer will manage the crud operations with db and keep communicating with controllers using functions

//!requiring model given by mongoose  made on Schema Business.mongo.js
//!enables talking to DB
const BusinessModel = require('./business.mongo');
const UserModel = require('../user/user.mongo');
const VendorModel = require('../vendor/vendor.mongo');

const Business = function (
  business_id,
  business_name,
  business_category,
  business_address,
  business_product_image,
  business_address_image,
  business_address_latitude,
  business_address_longitude,
  business_age,
) {
  (this.business_id = business_id),
    (this.business_name = business_name),
    (this.business_category = business_category),
    (this.business_address = business_address),
    (this.business_product_image = business_product_image),
    (this.business_address_image = business_address_image),
    (this.business_address_latitude = business_address_latitude),
    (this.business_address_longitude = business_address_longitude),
    (this.business_age = business_age);
};
Business.prototype.toBusiness = async function (business) {
  const totalBusinesss = await BusinessModel.findOne({}).sort('-business_id');
  let newBusinessNo;
  if (totalBusinesss) {
    newBusinessNo = totalBusinesss.business_id + 1;
  } else {
    newBusinessNo = 1;
  }

  return new Business(
    newBusinessNo,
    business['name'],
    business['category'],
    business['address'],
    business['product_image'],
    business['address_image'],
    business['address_latitude'],
    business['address_longitude'],
    business['age'],
  );
};

// Add Business
const addBusiness = function (business) {
  return new Promise(async function (resolve, reject) {
    try {
      resolve(await BusinessModel.addBusiness(business));
    } catch (err) {
      reject(err);
    }
  });
};

// Update a Business
const updateBusiness = async function (BusinessObject, user_id) {
  const userWithId = await UserModel.findOne({ _id: user_id });

  return new Promise(async (resolve, reject) => {
    try {
      if (userWithId) {
        const vendorWithId = await VendorModel.findOne({
          _id: userWithId.vendor_id,
        });
        if (vendorWithId) {
          const businessWithID = await BusinessModel.findOne({
            Business_id: vendorWithId.business_id,
          });
          if (businessWithID) {
            //! Shallow Merging of updates and existing object
            const newBusiness = { ...businessWithID._doc, ...BusinessObject };
            resolve(
              await BusinessModel.updateBusiness(
                newBusiness,
                businessWithID._id,
              ),
            );
          } else {
            reject('No Business Exist');
          }
        } else {
          reject('No Vendor Exist');
        }
      } else {
        reject('No User Exist');
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { Business, addBusiness, updateBusiness, BusinessModel };
