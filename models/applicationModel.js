const mongoose = require("mongoose");
const validator = require("validator");

const applicationSchema = new mongoose.Schema({
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
  openingTitle: {
    type: String,
    required: [true, "Please upload an opening title!"],
  },
  resume: {
    type: String,
    required: [true, "Please upload your resume!"],
  },
  status: {
    type: String,
    enum: {
      values: ["Pending", "Approved", "Rejected"],
      message: "status is either Pending or Approved or Rejected!",
    },
    default: "Pending",
  },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
