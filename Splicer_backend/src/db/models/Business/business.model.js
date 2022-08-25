//!Why only Business.mongo.js (model) is not enough?
//* It is enough but let us say in future for any other requirements we have to chaange our database then if this abstraction layer was not there then changing of database and communicating methods with new database will affect the implementation of controllers also. so, this layer will manage the crud operations with db and keep communicating with controllers using functions

//!requiring model given by mongoose  made on Schema Business.mongo.js
//!enables talking to DB
const BusinessModel = require('./business.mongo');
const UserModel = require('../user/user.mongo');
const VendorModel = require('../vendor/vendor.mongo');
const responses = require('../../../responses.strings');

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
    business['product_images'],
    business['address_images'],
    business['address_latitude'],
    business['address_longitude'],
    business['age'],
  );
};

// Add Business
const addBusiness = function (business, user_id) {
  return new Promise(async function (resolve, reject) {
    try {
      //if user is already a vendor
      let user = await UserModel.findOne({ _id: user_id });

      if (!user) {
        reject(`${responses.USER_NOT_FOUND}`);
        return;
      } else {
        if (!user.status) {
          reject(`${responses.USER_BLOCKED}`);
          return;
        }
        if (user.vendor_id == null) {
          reject(`${responses.USER_MUST_BE_VENDOR_TO_ADD_BUSINESS}`);
          return;
        } else {
          let vendor = await VendorModel.findOne({ _id: user.vendor_id });
          if (vendor) {
            //do function work
            try {
              let result = await BusinessModel.addBusiness(business);
              vendor.business_ids.push(result.business_id);
              try {
                const resultSave = await vendor.save();
                resolve(resultSave);
              } catch (err) {
                reject(err);
              }
            } catch (err) {
              reject(err);
            }
            //find user with user_id in params
            //update vendor_id in it
          }
        }
      }
    } catch (err) {
      reject(err);
    }
  });
};

// Update a Business
const updateBusiness = async function (businessObject, user_id, businessId) {
  return new Promise(async (resolve, reject) => {
    try {
      const userWithId = await UserModel.findOne({ _id: user_id });
      if (!userWithId) {
        reject(`${responses.USER_NOT_FOUND}`);
        return;
      }
      if (!userWithId.status) {
        reject(`${responses.USER_BLOCKED}`);
        return;
      }
      if (!userWithId.vendor_id) {
        reject(`${responses.USER_MUST_BE_VENDOR_TO_UPDATE_BUSINESS}`);
        return;
      }
      const vendorWithId = await VendorModel.findOne({
        _id: userWithId.vendor_id,
      });
      if (vendorWithId) {
        const businesses = vendorWithId.business_ids;
        if (!businesses) {
          reject(
            `${responses.USER_MUST_HAVE_ATLEAST_ONE_BUSINESS_TO_UPDATE_BUSINESS}`,
          );
          return;
        }
        if (businesses.includes(businessId)) {
          try {
            const old = await BusinessModel.findOne({ _id: businessId });
            const newBusiness = { ...old._doc, ...businessObject };
            await BusinessModel.updateBusiness(newBusiness, businessId);
          } catch (err) {
            reject(err);
          }
        } else {
          reject(`${responses.BUSINESS_NOT_BELONGS_TO_VENDOR}`);
          return;
        }
      } else {
        reject(`${responses.USER_MUST_BE_VENDOR_TO_UPDATE_BUSINESS}`);
        return;
      }

      if (vendorWithId) {
        const businessWithID = await BusinessModel.findOne({
          Business_id: vendorWithId.business_id,
        });
        if (businessWithID) {
          //! Shallow Merging of updates and existing object
          const newBusiness = { ...businessWithID._doc, ...businessObject };
          resolve(
            await BusinessModel.updateBusiness(newBusiness, businessWithID._id),
          );
        } else {
          reject('No Business Exist');
          return;
        }
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { Business, addBusiness, updateBusiness, BusinessModel };
