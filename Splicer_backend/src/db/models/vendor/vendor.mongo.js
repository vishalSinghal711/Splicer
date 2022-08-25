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

    //fk - one vendor can have multiple business
    business_ids: {
      type: Array,
      default: null,
      ref: 'Business',
    },

    //business phn No
    alt_phn_no: {
      type: String,
      trim: true,
      minLength: [10, 'Phone Number must be of Length 10'],
      maxLength: [10, 'Phone Number must be of Length 10'],
      validate: [isNumeric, 'Must contain Only Numbers'],
    },

    //business Email
    alt_email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [isEmail, 'Please Enter Valid Email Address'],
    },

    //otp check of business phn
    alt_phn_no_status: {
      type: Boolean,
      default: false,
    },

    //otp check email
    alt_email_status: {
      type: Boolean,
      default: false,
    },

    //reviews for this particular reviews
    vendor_reviews: {
      type: Array, // of type Review model
      ref: 'Review',
      default: null,
    },

    vendor_about: {
      type: String,
      default: '',
    },
    timing: {
      type: String,
      required: [true, 'must have to provide the timings of vendor'],
    },
    subscription_attempt: {
      type: Array,
      ref: 'SubsciptionAttempt',
      default: null,
    },
    transactions: {
      type: Array,
      ref: 'Transaction',
      default: null,
    },
    package_expiry: {
      type: Date,
      default: null,
    },
    activated_package: {
      type: Number,
      ref: 'Package',
      default: null,
    },
    status: {
      type: Boolean,
      default: false,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },

    //timing about
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
  try {
    //this is becoz maybe user dont enter alt emial, phn etc

    let obj = {
      _id: vendor.vendor_id,
      vendor_id: vendor.vendor_id,
    };

    if (vendor.alt_email) {
      obj['alt_email'] = vendor.alt_email;
    }
    if (vendor.alt_phn_no) {
      obj['alt_phn_no'] = vendor.alt_phn_no;
    }
    if (vendor.vendor_about) {
      obj['vendor_about'] = vendor.vendor_about;
    }
    if (vendor.timing) {
      obj['timing'] = vendor.timing;
    }
    const vendorCreated = await this.create(obj);
    return vendorCreated;
  } catch (e) {
    throw e;
  }
};
vendorSchema.statics.updateVendor = async function (vendorDetails, vendorId) {
  try {
    const ans = await this.updateOne({ _id: vendorId }, vendorDetails, {
      runValidators: true,
    });
    return vendorDetails;
  } catch (err) {
    return err;
  }
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
