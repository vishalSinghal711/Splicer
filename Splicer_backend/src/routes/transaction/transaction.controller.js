//category model methods
const {
  subscribePackageProcess,
  confirmSignature,
} = require('../../db/models/transaction/transactions.model');
const responses = require('../../responses.strings');

const transactionControllerMethods = {
  subscribePackage: function (request, response) {
    console.log('Controller');
    const userId = request.params.user_id;
    if (!Number(userId)) {
      response
        .status(400)
        .json({ message: `${responses.PARAMETER_NOT_NUMBER}` });
      return;
    }
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

  updateStatus: function (req, res) {

    // getting the details back from our font-end
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      transaction_id,
    } = req.body;

    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const promiseSlip = confirmSignature(
      razorpayPaymentId,
      razorpaySignature,
      transaction_id,
    );

    console.log('hvhkjvhvhjv', promiseSlip, typeof promiseSlip);

    promiseSlip
      .then((value) => {
        res.status(200).json({
          msg: value,
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
        });
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
  },
};
module.exports = transactionControllerMethods;
