const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    user_id: {
      unique: true,
      type: Number,
      required: true,
      default: 1,
    },
    user_name: {
      type: String,
      required: true,
      min: 1,
      max: 20,
    },
    gender: {
      required: true,
      type: String,
      max: 1,
      min: 1,
    },
    email_id: {
      type: String,
      required: true,
    },
    phn_no: {
      unique: true,
      type: String,
      required: true,
      min: 10,
      max: 10,
    },
    password: {
      required: true,
      type: String,
      min: 6,
    },
    profile_pic: {
      type: String,
    },
    dob: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "User",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
