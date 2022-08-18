const mongoose = require('mongoose');
const { Schema } = mongoose;

//this will be created once user select a package but not initiate payment

const subscription_attempt = new Schema({
  _id: Number,
  attempt_id: {
    type: Number,
    unique: true,
    required: [true, 'attempt_id is required'],
  },
  pack_type: {
    type: Array,
    ref: 'Package',
    required: [true, 'Pack Type must be mentioned'],
  },
  attempt_time: {
    type: Date,
    required: [true, 'Time of attempt must be mentioned'],
  },
});

const SubsciptionAttemptModel = mongoose.model(
  'SubsciptionAttempt',
  subscription_attempt,
);

module.exports = SubsciptionAttemptModel;
