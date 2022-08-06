const { Schema, default: mongoose } = require('mongoose');
const transactions_Schema = new Schema({
  _id: Number,
  transaction_id: {
    type: Number,
    unique: [true, 'transaction_id must be unique'],
    required: [true, 'transaction_id required'],
  },
  user_id: {
    type: Number,
    unique: [true, 'user_id must be unique'],
    required: [true, 'user_id required'],
  },
  amount: {
    //paise
    type: String,
    required: [true, 'user_id required'],
    validate: {
      validator: function (value) {
        return /^[0-9]+$/.test(value);
      },
      message: 'Amount must Contain only Numbers',
    },
  },
  order_id: {
    type: String,
    unique: [true],
    default: null,
  },
  status: {
    type: Boolean,
    default: false,
  },
  payment_id: {
    type: String,
    unique: [true],
    default: null,
  },
});

//! hooks

//! Statics
transactions_Schema.statics.createTransaction = async function (
  userId,
  { amt },
) {
  try {
    const prevCount = await this.findOne({}).sort('_id');
    try {
      const transaction = await this.create({
        _id: prevCount + 1,
        transaction_id: prevCount + 1,
        amount: amt,
        user_id: userId,
      });
      return transaction;
    } catch (err) {
      throw err;
    }
  } catch (err) {
    throw err;
  }
};

const TransactionModel = mongoose.model('Transaction', transactions_Schema);
module.exports = TransactionModel;
