const categoryModel = require("./category.mongo");

const getAllCategories = function () {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await categoryModel.find({}, { _id: 0, __v: 0 }).sort("id"));
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = getAllCategories;
