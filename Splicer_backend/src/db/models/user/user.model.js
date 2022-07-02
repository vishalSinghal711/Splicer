//!Why only user.mongo.js (model) is not enough?
//* It is enough but let us say in future for any other requirements we have to chaange our database then if this abstraction layer was not there then changing of database and communicating methods with new database will affect the implementation of controllers also. so, this layer will manage the crud operations with db and keep communicating with controllers using functions

//!requiring model given by mongoose  made on Schema user.mongo.js
//!enables talking to DB
const UserModel = require("./user.mongo");

const User = function (
  name,
  gender,
  email,
  phnNo,
  password,
  pic,
  dob,
  role,
  userId
) {
  this.user_name = name;
  this.gender = gender;
  this.email_id = email;
  this.phn_no = phnNo;
  this.password = password;
  this.profile_pic = pic;
  this.dob = dob;
  this.role = role;
  this.user_id = userId;
};
User.prototype.toUser = async function (user) {
  const totalUsers = await UserModel.findOne({}).sort("-user_id");
  const newUserNo = totalUsers.user_id + 1;
  return new User(
    user["name"],
    user["gender"],
    user["email_id"],
    user["phn_no"],
    user["password"],
    user["profile_pic"],
    user["dob"] != "" ? new Date(user["dob"]) : "",
    user["role"],
    newUserNo
  );
};

User.prototype.validateUser = function () {
  var results = "";
  if (!this.user_name) {
    results += `User Name Needed\n`;
  }
  if (!this.gender) {
    console.log(this.gender);
    results += "Gender Needed\n";
  }
  if (!this.email_id) {
    results += "Email Needed\n";
  }
  if (!this.phn_no) {
    console.log(this.phn_no);
    results += "Phone No Needed\n";
  }
  if (!this.password) {
    results += "Password Needed\n";
  }
  if (!this.dob) {
    results += "Dob Needed\n";
  }
  if (!this.role) {
    results += "Role Needed\n";
  }

  if (results.length == 0) {
    return { status: true, results: "All Set" };
  } else {
    return { status: false, results: `${results}` };
  }
};

// Doing work using Promises
const addUser = function (user) {
  return new Promise(async function (resolve, reject) {
    //trying upsert(update + insert) function which will update the user if any or make new user if not found but dont make duplicate the existing data
    try {
      //this func says that update object where phnNo is user.phn with user object we passed and if no object is found with that phnNo then create the object
      const userObj = await UserModel.findOneAndUpdate(
        { phn_no: user.phnNo },
        user,
        {
          new: true,
          upsert: true,
          _id: 0,
          __v: 0,
        }
      );
      resolve({ res: userObj });
    } catch (err) {
      reject({ res: `${err}` });
    }
  });
};

const checkUser = function (reqUser) {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await UserModel.findOne(
          { phn_no: reqUser["phn_no"] },
          { _id: 0, __v: 0 }
        )
      );
    } catch (err) {
      reject(err);
    }
  });
};

const updateUserModel = async function (userObject, id) {
  const userWithID = await UserModel.findOne({ user_id: id });

  console.log(typeof userWithID._doc);
  console.log(typeof userObject);

  //! Shallow Merging of updates and existing object
  const newUser = { ...userWithID._doc, ...userObject };

  return new Promise(async (resolve, reject) => {
    try {
      resolve(await UserModel.updateOne({ user_id: Number(id) }, newUser));
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { User, addUser, checkUser, updateUserModel };
