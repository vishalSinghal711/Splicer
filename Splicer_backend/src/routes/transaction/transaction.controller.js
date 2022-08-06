//category model methods
const {
  subscribePackageProcess,
} = require('../../db/models/transaction/transactions.model');

const transactionControllerMethods = {
  subscribePackage: function (request, response) {
    const userId = request.params.user_id;
    const body = request.body; //{package_id : id}
    const packageId = body.package_id;

    const promiseSlip = subscribePackageProcess(userId, packageId);

    promiseSlip
      .then((value) => {
        //data returned
        //will return order_id and then front-end should redirect it to razorpay with same o_id
        response.status(200).json({ message: value });
      })
      .catch((err) => {
        //some error occured and returned
        response.status(400).json({ message: err });
      });
  },

  updateStatus: function (request, response) {},
};
module.exports = transactionControllerMethods;
