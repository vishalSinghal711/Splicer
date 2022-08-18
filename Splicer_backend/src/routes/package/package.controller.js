const { NOT_AUTHORISED } = require('../../responses.strings');
const {
  processPackageCreation,
} = require('../../db/models/package/package.model');
const packageControllerMethods = {
  createPackage: function (request, response) {
    const adminKey = request.params.adminKey;
    if (process.env.ADMIN_KEY != adminKey) {
      response.status(400).json({ message: NOT_AUTHORISED });
    }

        const package = request.body;
    const promiseSlip = processPackageCreation(package);
    promiseSlip
      .then((res) => {
        response.status(200).json({ message: res });
      })
      .catch((err) => {
        response.status(400).json({ message: err.message });
      });
  },
};
module.exports = packageControllerMethods;
