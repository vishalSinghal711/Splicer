//!Why only user.mongo.js (model) is not enough?
//* It is enough but let us say in future for any other requirements we have to chaange our database then if this abstraction layer was not there then changing of database and communicating methods with new database will affect the implementation of controllers also. so, this layer will manage the crud operations with db and keep communicating with controllers using functions

//!requiring model given by mongoose  made on Schema user.mongo.js
//!enables talking to DB
const UserModel = require('./user.mongo');
const responses = require('../../../responses.strings');

const User = function (name, gender, email, phnNo, password, pic, dob, userId) {
  this.user_name = name;
  this.gender = gender;
  this.email_id = email;
  this.phn_no = phnNo;
  this.password = password;
  this.profile_pic = pic;
  this.dob = dob;
  this.user_id = userId;
};
User.prototype.toUser = async function (user) {
  const totalUsers = await UserModel.findOne({}).sort('-user_id');
  let newUserNo;
  if (totalUsers) {
    newUserNo = totalUsers.user_id + 1;
  } else {
    newUserNo = 1;
  }

  return new User(
    user['name'],
    user['gender'],
    user['email_id'],
    user['phn_no'],
    user['password'],
    user['profile_pic'],
    user['dob'] != '' ? new Date(user['dob']) : '',
    newUserNo,
  );
};

// Add user
const addUser = function (user) {
  return new Promise(async function (resolve, reject) {
    try {
      const userGot = await UserModel.addUser(user);
      const jwtToken = await userGot.generateAuthToken();
      resolve(jwtToken);
    } catch (err) {
      reject(err);
    }
  });
};

// checkUser Login
const checkUser = function (reqUser) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await UserModel.findOne(
        { phn_no: reqUser['phn_no'] },
        { _id: 0, __v: 0 },
      );
      if (!user) {
        reject(`${responses.USER_NOT_FOUND}`);
        return;
      }
      if (!user.status) {
        reject(`${responses.USER_BLOCKED}`);
        return;
      }
      const bool = await user.matchPassword(reqUser['password']);
      if (bool) {
        try {
          const jwtToken = await user.generateAuthToken();
          resolve(jwtToken);
          return;
        } catch (err) {
          reject(err);
          return;
        }
      } else {
        reject(`${responses.INCORRECT_PASSWORD}`);
        return;
      }
    } catch (err) {
      reject(err);
    }
  });
};

// Update a user
const updateUserModel = async function (userObject, id) {
  return new Promise(async (resolve, reject) => {
    try {
      const userWithID = await UserModel.findOne({ _id: id });
      if (!userWithID) {
        reject(`${responses.USER_NOT_FOUND}`);
        return;
      }
      if (!userWithID.status) {
        reject(`${responses.USER_BLOCKED}`);
        return;
      }
      //! Shallow Merging of updates and existing object
      const newUser = { ...userWithID._doc, ...userObject };
      const user = await UserModel.updateUser(newUser, id);
      if (user) {
        const userWithID = await UserModel.findOne({ _id: id });
        resolve(await userWithID.generateAuthToken());
        return;
      } else {
        reject(user);
        return;
      }
    } catch (err) {
      reject(err);
      return;
    }
  });
};

module.exports = { User, addUser, checkUser, updateUserModel };
