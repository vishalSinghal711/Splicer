const UserModel = require('../user/user.mongo');
const VendorModel = require('../vendor/vendor.mongo');
const PackageModel = require('../package/package.mongo');
const TransactionModel = require('../transaction/transactions.mongo');
const {
  USER_BLOCKED,
  USER_NOT_FOUND,
  USER_NOT_VENDOR,
  NO_BUSINESS_EXIST,
  WRONG_PACKAGE_ID,
  PACKAGE_BLOCKED,
} = require('../../../responses.strings');

const subscribePackageProcess = function (userId, packageId) {
  //find user with userid having status true
  //find vendor with this user_id
  //check business exist -> if exist -> then processPayment else send response to register business
  //if all set then add a transaction into the current vendor transactions

  return Promise(async function (resolve, reject) {
    try {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        reject(USER_NOT_FOUND);
      }
      if (!user.status) {
        reject(USER_BLOCKED);
      }
      if (!user.vendor_id) {
        reject(USER_NOT_VENDOR);
      }
      const vendor = await VendorModel.findOne({ _id: user.vendor_id });
      if (!vendor.business_ids) {
        reject(NO_BUSINESS_EXIST);
      }

      const package = await PackageModel.findOne({ _id: packageId });
      if (!package) {
        reject(WRONG_PACKAGE_ID);
      }
      if (!package.status) {
        reject(PACKAGE_BLOCKED);
      }

      try {
        const result = TransactionModel.createTransaction(user_id, package);
        // on successfully creating a record in db we have to get order_id
      } catch (err) {
        reject(err);
      }

      //this case is that currently user package is expired or not previosly tried
      //this means package_expiry = null by cron jobs
      //this means activated_package = null by cron jobs
    } catch (err) {
      reject(err);
    }
  });
};
