const express = require("express");
const router = express.Router();
const multer = require("multer");

const mentorshipController = require("../controllers/mentorshipController");

router
  .route("/")
  .get(mentorshipController.getAllMentorships)
  .post(mentorshipController.resizePhoto,
    multer(mentorshipController.multerConfig).single("image"),mentorshipController.createMentorship);

module.exports = router;
