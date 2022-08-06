const { Schema } = require('mongoose');
const reviewSchema = new Schema({
  _id: Number,

  //who post the review
  user_id: {
    type: Number,
    unique: true,
    required: [true, 'User Id is Mandatory'],
  },
  //on which vendor review gets posted
  vendor_id: {
    type: Number,
    unique: true,
    required: [true, 'vendor_id is Mandatory'],
  },

  //how much stars given
  rating: {
    type: Number,
    default: 0.0,
  },

  //write something about experience
  comment: {
    type: String,
    default: '',
  },

  //this review get liked by - x and x will be added in Array
  liked_by: {
    type: Array,
    default: null,
    ref: 'User',
  },
  //this review get disliked by - x and x will be added in Array
  disliked_by: {
    type: Array,
    default: null,
    ref: 'User',
  },
});

const ReviewModel = mongoose.model('Review', reviewSchema);

module.exports = ReviewModel;
