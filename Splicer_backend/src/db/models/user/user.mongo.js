const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const { isEmail, isNumeric, isAfter, isBefore } = require('validator');
const { defaultUserImage } = require('../../../constant');

const userSchema = new Schema(
  {
    _id: Number,
    user_id: {
      type: Number,
      unique: true,
      required: [true, 'User Id is Mandatory'],
    },
    vendor_id: {
      type: Number,
      default: null,
      ref: 'Vendor',
    },
    first_name: {
      trim: true,
      type: String,
      required: true,
      minLength: [2, 'Minimum Length of First Name must be 2'],
      maxLength: [20, 'Maximum Length of First Name must be 20'],
    },
    last_name: {
      trim: true,
      type: String,
      required: true,
      minLength: [2, 'Minimum Length of Last Name must be 2'],
      maxLength: [20, 'Maximum Length of Last Name must be 20'],
    },
    gender: {
      required: [true, 'Gender Field is Mandatory'],
      uppercase: true,
      type: String,
      enum: {
        values: ['M', 'F', 'NA'],
        message: `{value} is not supported`,
      },
    },
    email_id: {
      type: String,
      required: [true, 'Email Field of User is Mandatory'],
      trim: true,
      lowercase: true,
      validate: [isEmail, 'Please Enter Valid Email Address'],
    },
    phn_no: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Must fill Phone No'],
      minLength: [10, 'Phone Number must be of Length 10'],
      maxLength: [10, 'Phone Number must be of Length 10'],
      validate: [isNumeric, 'Must contain Only Numbers'],
    },
    password: {
      required: [true, 'Must have Password'],
      type: String,
      minLength: [6, 'Minimum Length of Password must be 6'],
      maxLength: [14, 'Maximum Length of Password must be 14'],
    },
    profile_pic: {
      type: String,
      default: `${defaultUserImage}`,
    },
    dob: {
      type: Date,
      required: [true, 'User must have to Fill its Date of Birth'],
      validate: {
        validator: (date) => {
          date = date.toLocaleDateString('en-US');
          date = date.replaceAll('/', '-');
          return (
            isAfter(date.toString(), '12-31-1949') &&
            isBefore(date.toString(), '08-01-2022')
          );
        },
        message: 'User DOB must be after Dec-31-1949 and before current Date',
      },
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

//! hooks
userSchema.pre('validate', async function (next) {});
userSchema.post('validate', async function (next) {
  console.log('post-validate');
  // next();
});
userSchema.pre('save', async function (next) {
  console.log('pre-save');
  // if (this.isModified('password')) {
  //   bcrypt.hash(this.password, 10, function (err, hash) {
  //     // Store hash in your password DB.
  //     if (err) {
  //       throw err.message;
  //     } else {
  //       this.password = hash;
  //     }
  //   });
  // }
  // next();
});
userSchema.post('save', async function (next) {
  console.log('post-save');
  // next();
});
userSchema.pre('updateOne', async function (next) {});
userSchema.post('updateOne', async function (next) {});

//! methods
userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log('methods matchPassword');
  return this.password === enteredPassword;
};

//! statics
userSchema.statics.addUser = async function (user) {
  console.log('User Came = ', user);
  try {
    const userCreated = await this.create({
      _id: user.user_id,
      user_id: user.user_id,
      first_name: user.user_name.substr(0, user.user_name.indexOf(' ')),
      last_name: user.user_name.substr(user.user_name.indexOf(' ') + 1),
      gender: user.gender,
      email_id: user.email_id,
      phn_no: user.phn_no,
      profile_pic: user.profile_pic,
      dob: user.dob.toString(),
      password: user.password,
    });
    return userCreated;
  } catch (e) {
    console.log(e);
  }
};
userSchema.statics.updateUser = async function (vendorObject, id) {
  const vendorWithID = await this.findOne({ _id: id, user_id: id });

  //! Shallow Merging of updates and existing object
  const newVendor = { ...vendorWithID._doc, ...vendorObject };

  await this.updateOne({ _id: id }, newVendor, { runValidators: true });
};

//! virtuals
userSchema.virtual('fullName').get(function () {
  return this.first_name + ' ' + this.last_name;
});
userSchema.virtual('fullName').set(function (fullName) {
  this.first_name = fullName.substr(0, fullName.indexOf(' '));
  this.last_name = fullName.substr(fullName.indexOf(' ') + 1);
});

//exporting the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
