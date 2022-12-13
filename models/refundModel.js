const mongoose = require("mongoose");
const validator = require("validator");

const refundSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Please provide an email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  name: {
    type: String,
    required: [true, "Please provide your name!"],
  },
  contactNumber: {
    type: String,
    required: [true, "Please provide a contact Number!"],
  },
  college: {
    type: String,
    required: [true, "Please provide your college!"],
  },
  branch: {
    type: String,
    required: [true, "Please enter your branch!"],
  },
  yearOfPassOut: {
    type: Date,
    required: [true, "Please enter your years of pass out!"],
  },
  purchaseDate: {
    type: Date,
    required: [true, "Please provide your purchase date!"],
  },
  screenShot: {
    type: String,
    required: [true, "Please upload your screenShot!"],
  },
});

const Refund = mongoose.model("Refund", refundSchema);

module.exports = Refund;
