const { Schema } = require('mongoose');

//only admin feature

const packageSchema = new Schema({
  _id: Number,
  name: {
    type: String,
    required: [true, 'Package name must be provided'],
  },
  price: {
    type: String,
    required: [true, 'user_id required'],
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

const PackageModel = mongoose.model('Package', packageSchema);
module.exports = PackageModel;
