const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessSchema = new Schema(
  {
    //pk
    _id: Number,
    business_id: {
      type: Number,
      unique: true,
      required: [true, 'Business Id is Mandatory'],
    },
    business_name: {
      type: String,
      required: [true, 'Business Name is Mandatory'],
      default: null,
    },
    business_category: {
      //will save subcategory id
      type: Number,
      required: [true, 'Business Category is Mandatory'],
    },
    business_address: {
      unique: true,
      type: String,
      required: [true, 'Business Adress is Mandatory'],
    },
    business_product_image: {
      type: Array,
      required: [true, 'Business Product Image is Mandatory'],
      validate: {
        validator: (value) => {
          if (value.length <= 0) {
            return false;
          }
          return true;
        },
        message: 'Business Product Images should be more than 0',
      },
    },
    business_address_image: {
      type: Array,
      required: [true, 'Business Address Image is Mandatory'],
      validate: {
        validator: (value) => {
          if (value.length <= 0) {
            return false;
          }
          return true;
        },
        message: 'Business Address Images should be more than 0',
      },
    },
    business_address_longitude: {
      type: Number,
      required: [true, 'Must Provide Business Longitude'],
    },
    business_address_latitude: {
      type: Number,
      required: [true, 'Must Provide Business Latitude'],
    },
    business_age: {
      type: Number,
      required: [true, 'Must Provide Business Age'],
    },
    business_reviews: {
      type: Array,
      default: null,
      ref: 'Review',
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

//! hooks
businessSchema.pre('validate', async function (next) {
  //TODO validate subcaegory is valid or not
});
businessSchema.post('validate', async function (next) {
  console.log('post-validate');
  // next();
});
businessSchema.pre('save', async function (next) {
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
businessSchema.post('save', async function (next) {
  console.log('post-save');
  // next();
});
businessSchema.pre('updateOne', async function (next) {});
businessSchema.post('updateOne', async function (next) {});

//! methods

//! statics
businessSchema.statics.addBusiness = async function (business) {
  try {
    const businessCreated = await this.create({
      _id: business.business_id,
      business_id: business.business_id,
      business_name: business.business_name,
      business_category: business.business_category,
      business_address: business.business_address,
      business_product_image: business.business_product_image,
      business_address_image: business.business_address_image,
      business_address_latitude: business.business_address_latitude,
      business_address_longitude: business.business_address_longitude,
      business_age: business.business_age,
    });
    return businessCreated;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
businessSchema.statics.updateBusiness = async function (newbusiness, id) {
  try {
    const result = await this.updateOne({ _id: id }, newbusiness, {
      runValidators: true,
    });
    return newbusiness;
  } catch (err) {
    throw err;
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
