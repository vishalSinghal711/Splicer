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

module.exports = { processPackageCreation };
