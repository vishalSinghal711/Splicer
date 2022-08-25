const mongoose = require('mongoose');
const { Schema } = mongoose;

//only admin feature

const packageSchema = new Schema({
  _id: Number,
  name: {
    type: String,
    required: [true, 'Package name must be provided'],
  },
  price: {
    type: Number,
    required: [true, 'Price required'],
    validate: {
      validator: function (value) {
        return /^[0-9]+$/.test(value);
      },
      message: 'Price must Contain only Numbers',
    },
  },
  allowed_enrolls: {
    type: Number,
    required: [true, 'Must have to provide number of enrollments'],
  },
  //days
  validity: {
    type: Number,
    required: [true, 'Must have to provide number of days of activation'],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

packageSchema.statics.createPackage = async function ({
  name,
  price,
  allowed_enrolls,
  validity,
}) {
  const lastUser = await this.find({}).sort('-_id').limit(1);
  if (lastUser.length > 0) {
    try {
      await this.create({
        _id: lastUser[0]._id + 1,
        name: name,
        price: parseInt(price),
        allowed_enrolls: parseInt(allowed_enrolls),
        validity: parseInt(validity),
      });
      return {
        name,
        price,
        allowed_enrolls,
        validity,
      };
    } catch (err) {
      throw err;
    }
  } else {
    try {
      await this.create({
        _id: 1,
        name: name,
        price: parseInt(price),
        allowed_enrolls: parseInt(allowed_enrolls),
        validity: parseInt(validity),
      });
      return {
        name,
        price,
        allowed_enrolls,
        validity,
      };
    } catch (err) {
      throw err;
    }
  }
};

const PackageModel = mongoose.model('Package', packageSchema);
module.exports = PackageModel;
