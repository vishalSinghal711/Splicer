//! The path module provides utilities for working with file and directory paths.
const path = require("path");

// reequiring model methods which talks to DB for User Operations
const {
  User,
  addUser,
  checkUser,
  updateUserModel,
} = require("../../db/models/user/user.model");

const userControllerMethods = {
  //*Register Functionality
  register: async function (request, response) {
    // extracting request body where user details are posted
    //automatically converts json to obj using middleware json
    let userObject = request.body;

    //converted that js object to user object
    const reqUser = await User.prototype.toUser(userObject);

    //doing some validations about mandatory fields before actually putting to mongo
    const { status, results } = reqUser.validateUser();

    //if validated
    if (status) {
      //get promise to addUser , returned by user.model.js -> addUser
      const promiseToAdd = addUser(reqUser);
      promiseToAdd
        .then(({ res }) => {
          //! WAY TO SEND FILES from server TO CLIENT using path
          // let image = path.join(
          //   __dirname,
          //   "..",
          //   "..",
          //   "assets",
          //   "customer.png"
          // );

          // response.status(201).json({ message: "Registered Successfully" });
          response.status(201).send(res);
        })
        .catch(({ res }) => {
          response.status(400).json({ message: `${res}` });
        });
    } else {
      response.status(400).json({ message: `${results}` });
    }
  },

  //*Login Functionality
  login: async function (request, response) {
    // extracting request body where user details are posted
    let userObjectJS = request.body;

    if (!userObjectJS["phn_no"] || !userObjectJS["password"]) {
      response.status(400).json({ message: "Both Fields are mandatory.." });
      return;
    }

    const promiseToLogin = checkUser(userObjectJS);

    promiseToLogin
      .then(function (userDetails) {
        if (!userDetails) {
          response
            .status(201)
            .json({ message: "User not found, Please Register yourself.." });
        } else if (userObjectJS["password"] === userDetails["password"]) {
          response.status(200).json({ message: userDetails });
        } else {
          response.status(201).json({ message: "Password is Incorrect.." });
        }
      })
      .catch((err) => response.status(401).json({ msg: err }));
  },

  //*Update Functionality
  updateUser: async function (request, response) {
  
    //extracting which user has to update
    if (!Number(request.params.user_id)) {
      response.status(400).json({ message: "Parameter must be a Number.." });
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
