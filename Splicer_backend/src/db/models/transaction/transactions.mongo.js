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
  },
  status: {
    type: Boolean,
    default: false,
  },
  payment_id: {
    type: String,
    default: null,
  },
  currency: {
    type: String,
    default: 'INR',
  },
});
//! hooks

//! methods
transactions_Schema.methods.createOrder = async function () {
  try {
    const Razorpay = require('razorpay');
    var instance = new Razorpay({
      key_id: `${process.env.RAZORPAY_KEY}`,
      key_secret: `${process.env.RAZORPAY_SECRET}`,
    });

    var options = {
      amount: this.amount, // amount in the smallest currency unit(paise in INR)
      currency: this.currency,
      receipt: `user_${this.user_id}_transaction_${this._id}`,
    };
    try {
      const orderId = await instance.orders.create(options);
      try {
        this.order_id = orderId.id;
        await this.save();
      } catch (err) {
        throw err;
      }

      return orderId;
    } catch (err) {
      throw err; // error
    }
  } catch (err) {
    throw err;
  }
};
transactions_Schema.methods.matchSignature = async function (
  payment_id,
  signature,
) {
  try {
    var crypto = require('crypto');
    var expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(`${this.order_id}|${payment_id}`)
      .digest('hex');

    if (expectedSignature == signature) {
      this.status = true;
      await this.save();
      return 'Payment is Successfull';
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
};

//! Statics
transactions_Schema.statics.createTransaction = async function (
  userId,
  { price },
) {
  try {
    let prevCount = await this.find({});
    prevCount = prevCount.length;

    const amountPaise = parseInt(price) * 100;
    console.log('amt', amountPaise, 'prevCount', prevCount);

    try {
      const transaction = await this.create({
        _id: prevCount + 1,
        transaction_id: prevCount + 1,
        amount: amountPaise,
        user_id: parseInt(userId),
      });
      return transaction;
    } catch (err) {
      console.log(err);
      throw err;
    }
  } catch (err) {
    throw err;
  }
};

const TransactionModel = mongoose.model('Transaction', transactions_Schema);
module.exports = TransactionModel;
