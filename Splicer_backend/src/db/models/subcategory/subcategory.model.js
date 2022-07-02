const subCategoryModel = require("./subcategory.mongo");


//TODO will paginate these all sub-categories in the end 
const getAllSubCategories = function () {
  return new Promise(async function (resolve, reject) {
    try {
      resolve(
        await subCategoryModel.find({}, { _id: 0, __v: 0 }).sort('id')
      );
    } catch (err) {
      reject(err);
    }
  });
};

//user has clicked some parent icon and want specific parent all subcategories
const getSpecificSubCategories = function (pid) {
  return new Promise(async function (resolve, reject) {
    try {
      resolve(
        await subCategoryModel
          .find({ parent_id: pid }, { _id: 0, __v: 0 })
          .sort("id")
      );
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { getAllSubCategories, getSpecificSubCategories };
