const mongoose = require("mongoose");
const validator = require("validator");

const customerSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Please provide an email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  mentorshipName: {
    type: String,
    required: [true, "Please provide a mentorship name!"],
  },
  stripeToken: {
    type: String,
    required: [true, "Please provide a valid stripe token!"],
  },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
