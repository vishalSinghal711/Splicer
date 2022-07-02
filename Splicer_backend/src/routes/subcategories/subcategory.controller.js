//requiring db communicating methods from subcatergory.model.js
const path = require("path");
const {
  getAllSubCategories,
  getSpecificSubCategories,
} = require("./../../db/models/subcategory/subcategory.model");

//request response controller methods for subcategory
const subCategoriesControllerMethods = {
  //*getSubCategories route handler
  getSubCategories: function (request, response) {
    const promiseSlip = getAllSubCategories();
    promiseSlip
      .then((value) => {
        //data returned from db
        response.status(200).json({ message: value });
      })
      .catch((err) => {
        //error returned from db
        response.status(400).json({ message: err });
      });
  },

  //*getSpecificSubCategory route handler
  getSpecificSubCategory: function (request, response) {
    if (!Number(request.params.parent_id)) {
      response.status(400).json({ message: "Parameter must be a Number.." });
      return;
    }
    const promiseSlip = getSpecificSubCategories(request.params.parent_id);
    promiseSlip
      .then((value) => {
        //data returned from db for specific id = request.params.parent_id (that means all children of this id)
        if (value.length == 0) {
          let image = path.join(
            __dirname,
            "..",
            "..",
            "assets",
            "cloud-storage.png"
          );
          response.status(400).sendFile(image);
        } else {
          response.status(200).json({ message: value });
        }
      })
      .catch((err) => {
        //error returned from db
        response.status(400).json({ message: err });
      });
  },
};
module.exports = { subCategoriesControllerMethods };
