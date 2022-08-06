//! The path module provides utilities for working with file and directory paths.
const path = require('path');
const responses = require('../../responses.strings');

// reequiring model methods which talks to DB for User Operations
const {
  User,
  addUser,
  checkUser,
  updateUserModel,
} = require('../../db/models/user/user.model');

const userControllerMethods = {
  //*Register Functionality
  register: async function (request, response) {
    // extracting request body where user details are posted
    //automatically converts json to obj using middleware json
    let userObject = request.body;

    //converted that js object to user object
    const reqUser = await User.prototype.toUser(userObject);

    const promiseToAdd = addUser(reqUser);
    promiseToAdd
      .then((res) => {
        response.status(201).json({ message: res });
        // response.status(201).send(res);
      })
      .catch((res) => {
        response.status(400).json({ message: res.message });
      });
  },

  //*Login Functionality
  login: async function (request, response) {
    // extracting request body where user details are posted
    let userObjectJS = request.body;

    if (!userObjectJS['phn_no'] || !userObjectJS['password']) {
      response
        .status(400)
        .json({ message: `${responses.USERNAME_PASSWORD_MANDATORY}` });
      return;
    }

    const promiseToLogin = checkUser(userObjectJS);

    promiseToLogin
      .then(async function (userDetails) {
        response.status(200).json({ message: userDetails });
      })
      .catch((err) => response.status(401).json({ msg: err }));
  },

  //*Update Functionality
  updateUser: async function (request, response) {
    //extracting which user has to update
    if (!Number(request.params.user_id)) {
      response
        .status(400)
        .json({ message: `${responses.PARAMETER_NOT_NUMBER}` });
      return;
    }

    // extracting request body where user details are posted
    //automatically converts json to obj using middleware json
    let userObject = request.body;

    const promiseSlip = updateUserModel(userObject, request.params.user_id);

    promiseSlip
      .then((value) => {
        response.status(200).json({ message: value });
      })
      .catch((err) => {
        response.status(400).json({ message: err });
      });
  },
};

module.exports = userControllerMethods;
