const mongoose = require("mongoose");

const mentorshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name!"],
  },
  price: {
    type: Number,
    required: [true, "Please provide the price!"],
  },
  image: {
    type: String,
    required: [true, "Please provide an image!"],
  }
});

const Mentorship = mongoose.model("Mentorship", mentorshipSchema);

module.exports = Mentorship;
