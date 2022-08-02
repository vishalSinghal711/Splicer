const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail, isNumeric, isAfter, isBefore } = require('validator');

const vendorSchema = new Schema(
  {
    //pk
    _id: Number,
    vendor_id: {
      type: Number,
      unique: true,
      required: [true, 'Vendor Id is Mandatory'],
    },
    //fk
    business_id: {
      type: Number,
      default: null,
      ref : 'Business'
    },
    alt_phn_no: {
      type: String,
      unique: true,
      trim: true,
      minLength: [10, 'Phone Number must be of Length 10'],
      maxLength: [10, 'Phone Number must be of Length 10'],
      validate: [isNumeric, 'Must contain Only Numbers'],
    },
    alt_email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [isEmail, 'Please Enter Valid Email Address'],
    },
    alt_phn_no_status: {
      type: Boolean,
      default: false,
    },
    alt_email_status: {
      type: Boolean,
      default: false,
    },
    vendor_reviews: {
      type: Array,
      default: null,
    },
    vendor_rating: {
      type: Number,
      default: 0.0,
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
vendorSchema.pre('validate', async function (next) {
  console.log('pre- valid');
});
vendorSchema.post('validate', async function (next) {
  console.log('post-validate');
  // next();
});
vendorSchema.pre('save', async function (next) {
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
vendorSchema.post('save', async function (next) {
  console.log('post-save');
  // next();
});
vendorSchema.pre('updateOne', async function (next) {});
vendorSchema.post('updateOne', async function (next) {});

//! methods
vendorSchema.methods.matchPassword = async function (enteredPassword) {
  console.log('methods matchPassword');
  return this.password === enteredPassword;
};

//! statics
vendorSchema.statics.addVendor = async function (vendor) {
  console.log('Vendor Came = ', vendor);
  try {
    const vendorCreated = await this.create({
      _id: vendor.vendor_id,
      vendor_id: vendor.vendor_id,
      alt_email_id: vendor.alt_email_id,
      alt_phn_no: vendor.alt_phn_no,
    });
    return vendorCreated;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
vendorSchema.statics.updateUser = async function (vendorDetails, id) {
  const vendor = await this.findOne({ _id: id, user_id: id });
  const newVendor = { ...vendor._doc, ...vendorDetails };
  await this.updateOne({ _id: id }, newVendor, { runValidators: true });
};

//! virtuals
vendorSchema.virtual('fullName').get(function () {
  return this.first_name + ' ' + this.last_name;
});
vendorSchema.virtual('fullName').set(function (fullName) {
  this.first_name = fullName.substr(0, fullName.indexOf(' '));
  this.last_name = fullName.substr(fullName.indexOf(' ') + 1);
});

//exporting the User model
const VendorModel = mongoose.model('Vendor', vendorSchema);
module.exports = VendorModel;
