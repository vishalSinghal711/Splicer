const PackageModel = require('./package.mongo');

const processPackageCreation = function (package) {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await PackageModel.createPackage(package));
    } catch (err) {
      reject(err);
    }
  });
};

const getAllPackages = function () {
  return new Promise(async (resolve, reject) => {
    try {
      const packages = await PackageModel.find({}).sort({ price : 'asc'});
      resolve(packages);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { processPackageCreation, getAllPackages };
