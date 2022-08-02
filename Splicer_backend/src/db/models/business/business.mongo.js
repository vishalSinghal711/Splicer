const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail, isNumeric, isAfter, isBefore } = require('validator');

const businessSchema = new Schema(
  {
    _id: Number,
    business_id: {
      type: Number,
      unique: true,
      required: [true, 'Business Id is Mandatory'],
    },

    business_name: {
      trim: true,
      type: String,
      required: true,
      minLength: [6, 'Minimum Length of Business Name must be 2'],
      maxLength: [40, 'Maximum Length of Business Name must be 40'],
    },
    business_category: {
      trim: true,
      type: String,
      required: true,
      minLength: [6, 'Minimum Length of Business Name must be 2'],
      maxLength: [40, 'Maximum Length of Business Name must be 40'],
    },
    business_address: {
      type: String,
      unique: true,
      required: [true, 'Must Pass Business Address'],
    },
    business_address_latitude: {
      type: Number,
      required: [true, 'Must pass Latitude of Location'],
    },
    business_address_longitude: {
      type: Number,
      required: [true, 'Must pass Longitude of Location'],
    },

    business_image: {
      type: Array,
      required: [true, 'Must Provide some Images of Business Products'],
    },
    business_location_image: {
      type: Array,
      required: [true, 'Must Provide some Images of Business Location'],
    },
    business_age: {
      type: Number,
      required: [true, 'Must Provide age of Business'],
    },
    reviews: {
      type: Array,
      deafult: null,
    },
    rating: {
      type: Number,
      deafult: null,
    },
    status: {
      type: Boolean,
      default: false,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

//! hooks
businessSchema.pre('validate', async function (next) {});
businessSchema.post('validate', async function (next) {});
businessSchema.pre('save', async function (next) {});
businessSchema.post('save', async function (next) {});
businessSchema.pre('updateOne', async function (next) {});
businessSchema.post('updateOne', async function (next) {});

//! methods
businessSchema.methods.matchPassword = async function (enteredPassword) {};

//! statics
businessSchema.statics.addVendor = async function (vendor) {
  console.log('Business Came = ', business);
  try {
    const vendrorCreated = await this.create({
      _id: vendor.vendor_id,
      vendor_id: vendor.vendor_id,
      personalDetails: user.user_name.substr(0, user.user_name.indexOf(' ')),
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
businessSchema.statics.updateUser = async function (userDetails, id) {
  const user = await this.findOne({ _id: id, user_id: id });
  const newUser = { ...user._doc, ...userDetails };
  user.is_vendor = newUser['is_vendor'];
  const ans = await user.save();
  if (ans) {
    await this.updateOne({ _id: id }, newUser, { runValidators: true });
  }
};

//! virtuals
businessSchema.virtual('fullName').get(function () {
  return this.first_name + ' ' + this.last_name;
});
businessSchema.virtual('fullName').set(function (fullName) {
  this.first_name = fullName.substr(0, fullName.indexOf(' '));
  this.last_name = fullName.substr(fullName.indexOf(' ') + 1);
});

//exporting the User model
const BusinessModel = mongoose.model('Business', businessSchema);
module.exports = BusinessModel;
