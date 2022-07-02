//category model methods
const getAllCategories = require("../../db/models/category/category.model");

const categoryControllerMethods = {
  getCategories: function (request, response) {
    const promiseSlip = getAllCategories();

    promiseSlip
      .then((value) => {
        //data returned
        response.status(200).json({ message: value });
      })
      .catch((err) => {
        //some error occured and returned
        response.status(400).json({ message: err });
      });
  },
};
module.exports = categoryControllerMethods;
