const mongoose = require("mongoose");
const validator = require("validator");

const contactInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Please provide an email!"],
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
  query: {
    type: String,
    required: [true, "Please tell us about your query!"],
  },
});

const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);

module.exports = ContactInfo;
